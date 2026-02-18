import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
    const ref = useRef();
    const count = 2000;

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.elapsedTime * 0.02;
            ref.current.rotation.y = state.clock.elapsedTime * 0.03;
        }
    });

    return (
        <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
            <PointMaterial
                transparent
                color="#7c3aed"
                size={0.04}
                sizeAttenuation
                depthWrite={false}
                opacity={0.6}
            />
        </Points>
    );
}

function MothWings() {
    const groupRef = useRef();
    const time = useRef(0);

    const wingGeometry = useMemo(() => {
        const shape = new THREE.Shape();
        // Left wing
        shape.moveTo(0, 0);
        shape.bezierCurveTo(-0.5, 0.8, -2.5, 1.2, -2.8, 0.3);
        shape.bezierCurveTo(-3.2, -0.5, -2.0, -1.5, -0.8, -1.0);
        shape.bezierCurveTo(-0.3, -0.8, 0, -0.3, 0, 0);
        return new THREE.ShapeGeometry(shape);
    }, []);

    const wingGeometryRight = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.bezierCurveTo(0.5, 0.8, 2.5, 1.2, 2.8, 0.3);
        shape.bezierCurveTo(3.2, -0.5, 2.0, -1.5, 0.8, -1.0);
        shape.bezierCurveTo(0.3, -0.8, 0, -0.3, 0, 0);
        return new THREE.ShapeGeometry(shape);
    }, []);

    const lowerWingLeft = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.1);
        shape.bezierCurveTo(-0.3, -0.5, -1.8, -0.8, -2.0, -1.8);
        shape.bezierCurveTo(-2.2, -2.5, -1.0, -2.8, -0.4, -2.2);
        shape.bezierCurveTo(-0.1, -1.8, 0, -1.0, 0, -0.1);
        return new THREE.ShapeGeometry(shape);
    }, []);

    const lowerWingRight = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.1);
        shape.bezierCurveTo(0.3, -0.5, 1.8, -0.8, 2.0, -1.8);
        shape.bezierCurveTo(2.2, -2.5, 1.0, -2.8, 0.4, -2.2);
        shape.bezierCurveTo(0.1, -1.8, 0, -1.0, 0, -0.1);
        return new THREE.ShapeGeometry(shape);
    }, []);

    useFrame((state) => {
        time.current = state.clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y = Math.sin(time.current * 0.4) * 0.15;
            groupRef.current.position.y = Math.sin(time.current * 0.6) * 0.15;
            // Flap wings
            const flapAngle = Math.sin(time.current * 1.5) * 0.12;
            groupRef.current.children.forEach((child, i) => {
                if (i === 0) child.rotation.y = -flapAngle;
                if (i === 1) child.rotation.y = flapAngle;
                if (i === 2) child.rotation.y = -flapAngle * 0.7;
                if (i === 3) child.rotation.y = flapAngle * 0.7;
            });
        }
    });

    const wingMat = (
        <meshBasicMaterial
            color="#7c3aed"
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
        />
    );

    const wingMatGlow = (
        <meshBasicMaterial
            color="#c026d3"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
        />
    );

    return (
        <group ref={groupRef}>
            <mesh geometry={wingGeometry}>{wingMat}</mesh>
            <mesh geometry={wingGeometryRight}>{wingMat}</mesh>
            <mesh geometry={lowerWingLeft}>{wingMatGlow}</mesh>
            <mesh geometry={lowerWingRight}>{wingMatGlow}</mesh>
            {/* Body */}
            <mesh position={[0, -0.5, 0]}>
                <capsuleGeometry args={[0.08, 1.2, 4, 8]} />
                <meshBasicMaterial color="#9d4edd" transparent opacity={0.7} />
            </mesh>
            {/* Antennae */}
            <mesh position={[-0.08, 0.55, 0]} rotation={[0, 0, -0.4]}>
                <cylinderGeometry args={[0.01, 0.005, 0.8, 4]} />
                <meshBasicMaterial color="#c026d3" transparent opacity={0.5} />
            </mesh>
            <mesh position={[0.08, 0.55, 0]} rotation={[0, 0, 0.4]}>
                <cylinderGeometry args={[0.01, 0.005, 0.8, 4]} />
                <meshBasicMaterial color="#c026d3" transparent opacity={0.5} />
            </mesh>
        </group>
    );
}

export default function ThreeScene() {
    return (
        <Canvas
            camera={{ position: [0, 0, 6], fov: 60 }}
            style={{ position: 'absolute', inset: 0 }}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[5, 5, 5]} intensity={1} color="#7c3aed" />
            <pointLight position={[-5, -5, 5]} intensity={0.5} color="#c026d3" />
            <ParticleField />
            <MothWings />
        </Canvas>
    );
}
