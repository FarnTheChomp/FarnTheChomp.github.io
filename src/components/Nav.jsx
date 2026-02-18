import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Nav.css';

const navItems = [
    { label: 'Work', href: '#work' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Nav() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="nav__inner">
                <a href="#hero" className="nav__logo">
                    <span className="nav__logo-mark">F</span>
                    <span className="nav__logo-text">FarnTheChomp</span>
                </a>

                <ul className="nav__links">
                    {navItems.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className="nav__link">
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>

                <a
                    href="https://github.com/FarnTheChomp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost nav__cta"
                >
                    GitHub
                </a>

                <button
                    className={`nav__burger ${menuOpen ? 'nav__burger--open' : ''}`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span /><span /><span />
                </button>
            </div>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="nav__mobile"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="nav__mobile-link"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
