import { motion } from 'framer-motion';
import ThreeScene from '../components/ThreeScene';
import './Hero.css';

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
    return (
        <section id="hero" className="hero">
            {/* Gradient background */}
            <div className="hero__gradient" />
            <div className="hero__gradient hero__gradient--2" />
            <div className="hero__gradient hero__gradient--3" />

            {/* Three.js canvas */}
            <div className="hero__canvas">
                <ThreeScene />
            </div>

            {/* Content */}
            <div className="hero__content container">
                <motion.div
                    className="hero__text"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.p className="hero__eyebrow" variants={itemVariants}>
                        3D Artist and Digital Creator
                    </motion.p>

                    <motion.h1 className="hero__title" variants={itemVariants}>
                        Sculpting Worlds
                        <br />
                        <span className="gradient-text">From the Imagination</span>
                    </motion.h1>

                    <motion.p className="hero__description" variants={itemVariants}>
                        I am a 3D sculptor and generalist digital artist with a deep passion for character
                        design, worldbuilding, and the kind of art that feels like it belongs somewhere real.
                        My work spans sculpting, illustration, environment art, and fan creation, all driven
                        by the same obsession with craft and detail.
                    </motion.p>

                    <motion.div className="hero__actions" variants={itemVariants}>
                        <a href="#work" className="btn btn-primary">
                            View My Work
                        </a>
                        <a href="#about" className="btn btn-ghost">
                            About Me
                        </a>
                    </motion.div>

                    <motion.div className="hero__stats" variants={itemVariants}>
                        <div className="hero__stat">
                            <span className="hero__stat-value gradient-text">3D</span>
                            <span className="hero__stat-label">Sculpting</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-value gradient-text">2D</span>
                            <span className="hero__stat-label">Illustration</span>
                        </div>
                        <div className="hero__stat-divider" />
                        <div className="hero__stat">
                            <span className="hero__stat-value gradient-text">ENV</span>
                            <span className="hero__stat-label">Environment Art</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="hero__scroll"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
            >
                <div className="hero__scroll-line" />
                <span>Scroll</span>
            </motion.div>
        </section>
    );
}
