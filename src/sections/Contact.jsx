import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Contact.css';

export default function Contact() {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section id="contact" className="section contact">
            <div className="container">
                <motion.div
                    ref={ref}
                    className="contact__inner"
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Moth decoration */}
                    <div className="contact__moth">
                        <svg viewBox="0 0 300 200" className="contact__moth-svg">
                            <defs>
                                <radialGradient id="cMothGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#c026d3" stopOpacity="0" />
                                </radialGradient>
                            </defs>
                            <path d="M150,100 C120,50 30,20 10,70 C-5,110 50,155 100,130 C125,118 150,105 150,100Z"
                                fill="url(#cMothGrad)" />
                            <path d="M150,100 C180,50 270,20 290,70 C305,110 250,155 200,130 C175,118 150,105 150,100Z"
                                fill="url(#cMothGrad)" />
                            <path d="M150,100 C130,130 50,145 40,180 C32,205 80,215 115,190 C135,175 150,145 150,100Z"
                                fill="url(#cMothGrad)" opacity="0.6" />
                            <path d="M150,100 C170,130 250,145 260,180 C268,205 220,215 185,190 C165,175 150,145 150,100Z"
                                fill="url(#cMothGrad)" opacity="0.6" />
                            <ellipse cx="150" cy="100" rx="6" ry="35" fill="#9d4edd" opacity="0.7" />
                            <path d="M146,68 Q130,40 118,28" stroke="#c026d3" strokeWidth="2" fill="none" opacity="0.5" />
                            <path d="M154,68 Q170,40 182,28" stroke="#c026d3" strokeWidth="2" fill="none" opacity="0.5" />
                        </svg>
                    </div>

                    <div className="contact__content">
                        <p className="section-label">Contact</p>
                        <h2 className="section-title">
                            Let's Build
                            <br />
                            <span className="gradient-text">Something Together</span>
                        </h2>
                        <div className="divider" />
                        <p className="contact__text">
                            I am actively looking to collaborate on ambitious projects in games, animation,
                            and digital art. If you are working on something that needs a dedicated 3D artist
                            and generalist with a strong visual identity, I would love to hear from you.
                        </p>

                        <div className="contact__links">
                            <a
                                href="https://github.com/FarnTheChomp"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact__link glass-card"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                </svg>
                                <span>GitHub</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact__link-arrow">
                                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                                </svg>
                            </a>

                            <a
                                href="mailto:contact@farnthechomp.art"
                                className="contact__link glass-card"
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                    <polyline points="22,6 12,13 2,6" />
                                </svg>
                                <span>Email</span>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="contact__link-arrow">
                                    <line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Footer */}
            <div className="contact__footer">
                <div className="container">
                    <p className="contact__footer-text">
                        FarnTheChomp. 3D Artist and Digital Creator.
                    </p>
                    <p className="contact__footer-copy">
                        Built with React and Three.js
                    </p>
                </div>
            </div>
        </section>
    );
}
