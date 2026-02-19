import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function StarField() {
    const ref = useRef();
    const count = 3000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.elapsedTime * 0.01;
            ref.current.rotation.x = state.clock.elapsedTime * 0.005;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#ffffff"
                size={0.08}
                sizeAttenuation
                depthWrite={false}
                opacity={1}
            />
        </Points>
    );
}

function ColoredStars() {
    const ref = useRef();
    const count = 500;

    const { positions, colors } = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const col = new Float32Array(count * 3);
        const palette = [
            [0.48, 0.23, 0.93], // violet
            [0.75, 0.15, 0.83], // fuchsia
            [0.02, 0.71, 0.83], // cyan
            [0.96, 0.62, 0.04], // amber
            [0.88, 0.11, 0.28], // rose
        ];
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 30;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
            const c = palette[Math.floor(Math.random() * palette.length)];
            col[i * 3] = c[0];
            col[i * 3 + 1] = c[1];
            col[i * 3 + 2] = c[2];
        }
        return { positions: pos, colors: col };
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = -state.clock.elapsedTime * 0.008;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                vertexColors
                size={0.12}
                sizeAttenuation
                depthWrite={false}
                opacity={1}
            />
        </Points>
    );
}

// Shooting star as a line that animates across the screen
function ShootingStar({ delay, startX, startY, angle }) {
    const ref = useRef();
    const trailRef = useRef();
    const progress = useRef(-delay);
    const duration = 1.8;
    const length = 4;

    const direction = useMemo(() => {
        const rad = (angle * Math.PI) / 180;
        return new THREE.Vector3(Math.cos(rad), Math.sin(rad), 0);
    }, [angle]);

    const start = useMemo(() => new THREE.Vector3(startX, startY, 0), [startX, startY]);

    useFrame((state, delta) => {
        progress.current += delta;
        const cycle = ((progress.current % (duration + delay)) + duration + delay) % (duration + delay);
        const t = cycle / duration;

        if (ref.current && t >= 0 && t <= 1) {
            const head = start.clone().addScaledVector(direction, t * 20);
            const tail = head.clone().addScaledVector(direction, -length * Math.min(t, 0.3) / 0.3);

            const positions = ref.current.geometry.attributes.position.array;
            positions[0] = tail.x; positions[1] = tail.y; positions[2] = tail.z;
            positions[3] = head.x; positions[4] = head.y; positions[5] = head.z;
            ref.current.geometry.attributes.position.needsUpdate = true;

            const opacity = t < 0.1 ? t / 0.1 : t > 0.8 ? (1 - t) / 0.2 : 1;
            ref.current.material.opacity = opacity * 0.9;
            ref.current.visible = true;
        } else if (ref.current) {
            ref.current.visible = false;
        }
    });

    const lineGeo = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
        return geo;
    }, []);

    return (
        <line ref={ref} geometry={lineGeo}>
            <lineBasicMaterial color="#c8b8ff" transparent opacity={0} linewidth={1} />
        </line>
    );
}

const shootingStars = [
    { delay: 0, startX: -12, startY: 6, angle: -28 },
    { delay: 2.5, startX: -8, startY: 8, angle: -32 },
    { delay: 5, startX: -14, startY: 4, angle: -25 },
    { delay: 1.2, startX: -6, startY: 7, angle: -30 },
    { delay: 3.8, startX: -10, startY: 5, angle: -35 },
    { delay: 7, startX: -13, startY: 9, angle: -22 },
];

export default function ThreeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 65 }}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
            gl={{ antialias: true, alpha: true }}
        >
            <StarField />
            <ColoredStars />
            {shootingStars.map((s, i) => (
                <ShootingStar key={i} {...s} />
            ))}
        </Canvas>
    );
}
