import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './About.css';

const skills = [
    { label: 'ZBrush', level: 90, color: '#7c3aed' },
    { label: 'Photoshop', level: 80, color: '#c026d3' },
    { label: 'Character Design', level: 85, color: '#06b6d4' },
    { label: 'Environment Art', level: 70, color: '#f59e0b' },
    { label: 'Worldbuilding', level: 88, color: '#e11d48' },
    { label: 'Digital Painting', level: 78, color: '#7c3aed' },
];

function SkillBar({ skill, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    return (
        <div ref={ref} className="skill-bar">
            <div className="skill-bar__header">
                <span className="skill-bar__label">{skill.label}</span>
                <span className="skill-bar__value">{skill.level}%</span>
            </div>
            <div className="skill-bar__track">
                <motion.div
                    className="skill-bar__fill"
                    style={{ background: skill.color }}
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.2, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                />
            </div>
        </div>
    );
}

export default function About() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="about" className="section about">
            <div className="container">
                <div className="about__grid">
                    {/* Left: Text */}
                    <motion.div
                        ref={ref}
                        className="about__text"
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="section-label">About</p>
                        <h2 className="section-title">
                            The Artist
                            <br />
                            <span className="gradient-text">Behind the Work</span>
                        </h2>
                        <div className="divider" />

                        <p className="about__paragraph">
                            I am a self-driven 3D artist with a deep and genuine love for sculpting. For me,
                            digital sculpting is not just a skill, it is the primary language through which I
                            think about characters, creatures, and the worlds they inhabit. Every surface,
                            every silhouette, every crease in a garment is a decision that tells a story.
                        </p>

                        <p className="about__paragraph">
                            My work draws from a wide range of influences, from the industrial grotesquerie of
                            Oddworld to the atmospheric dread of modern horror, from the painterly silence of
                            Rain World to the epic scope of high fantasy. I am a generalist at heart, someone
                            who moves between 3D, illustration, environment art, and concept work, because I
                            believe that understanding multiple disciplines makes each one stronger.
                        </p>

                        <p className="about__paragraph">
                            What drives me is the ambition to work on projects that matter, games, animations,
                            films, and worlds that leave a mark. I want to create things that feel unmistakably
                            mine while serving something larger than any single piece. I am building toward that
                            with every sculpt, every painting, and every world I put on the page.
                        </p>

                        <div className="about__interests">
                            {['3D Sculpting', 'Digital Art', 'Animation', 'Worldbuilding', 'Games', 'Fan Creation'].map((interest) => (
                                <span key={interest} className="about__interest">{interest}</span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Skills + Moth decoration */}
                    <motion.div
                        className="about__skills"
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="about__moth-decoration">
                            <svg viewBox="0 0 200 200" className="about__moth-svg">
                                <defs>
                                    <radialGradient id="mothGrad" cx="50%" cy="50%" r="50%">
                                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
                                        <stop offset="100%" stopColor="#c026d3" stopOpacity="0" />
                                    </radialGradient>
                                </defs>
                                {/* Wings */}
                                <path d="M100,100 C80,60 20,40 10,80 C0,110 40,140 80,120 C90,115 100,105 100,100Z"
                                    fill="url(#mothGrad)" opacity="0.7" />
                                <path d="M100,100 C120,60 180,40 190,80 C200,110 160,140 120,120 C110,115 100,105 100,100Z"
                                    fill="url(#mothGrad)" opacity="0.7" />
                                <path d="M100,100 C85,120 30,130 25,160 C20,185 60,195 85,175 C95,165 100,140 100,100Z"
                                    fill="url(#mothGrad)" opacity="0.5" />
                                <path d="M100,100 C115,120 170,130 175,160 C180,185 140,195 115,175 C105,165 100,140 100,100Z"
                                    fill="url(#mothGrad)" opacity="0.5" />
                                {/* Body */}
                                <ellipse cx="100" cy="100" rx="5" ry="30" fill="#9d4edd" opacity="0.8" />
                                {/* Antennae */}
                                <path d="M97,72 Q85,50 78,40" stroke="#c026d3" strokeWidth="1.5" fill="none" opacity="0.6" />
                                <path d="M103,72 Q115,50 122,40" stroke="#c026d3" strokeWidth="1.5" fill="none" opacity="0.6" />
                            </svg>
                        </div>

                        <div className="about__skills-list">
                            <h3 className="about__skills-title">Core Skills</h3>
                            {skills.map((skill, i) => (
                                <SkillBar key={skill.label} skill={skill} index={i} />
                            ))}
                        </div>

                        <div className="about__card glass-card">
                            <p className="about__card-quote">
                                "I want to create stuff that will stand out and feel like me."
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
