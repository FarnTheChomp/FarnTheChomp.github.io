import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Lightbox.css';

export default function Lightbox({ project, onClose }) {
    const [activeImage, setActiveImage] = useState(0);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') setActiveImage((i) => (i + 1) % project.images.length);
            if (e.key === 'ArrowLeft') setActiveImage((i) => (i - 1 + project.images.length) % project.images.length);
        };
        window.addEventListener('keydown', handleKey);
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [onClose, project.images.length]);

    return (
        <AnimatePresence>
            <motion.div
                className="lightbox"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <motion.div
                    className="lightbox__panel"
                    initial={{ scale: 0.92, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.92, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close */}
                    <button className="lightbox__close" onClick={onClose}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Main media */}
                    <div className="lightbox__media">
                        {showVideo && project.video ? (
                            <video
                                src={project.video}
                                autoPlay
                                loop
                                controls
                                className="lightbox__video"
                            />
                        ) : (
                            <motion.img
                                key={activeImage}
                                src={project.images[activeImage]}
                                alt={project.title}
                                className="lightbox__image"
                                initial={{ opacity: 0, scale: 1.02 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.35 }}
                            />
                        )}

                        {/* Nav arrows */}
                        {project.images.length > 1 && !showVideo && (
                            <>
                                <button
                                    className="lightbox__arrow lightbox__arrow--left"
                                    onClick={() => setActiveImage((i) => (i - 1 + project.images.length) % project.images.length)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="15 18 9 12 15 6" />
                                    </svg>
                                </button>
                                <button
                                    className="lightbox__arrow lightbox__arrow--right"
                                    onClick={() => setActiveImage((i) => (i + 1) % project.images.length)}
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </button>
                            </>
                        )}
                    </div>

                    {/* Info */}
                    <div className="lightbox__info">
                        <div className="lightbox__meta">
                            <div className="lightbox__tags">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="lightbox__tag">{tag}</span>
                                ))}
                            </div>
                            <span className="lightbox__year">{project.year}</span>
                        </div>

                        <h2 className="lightbox__title">{project.title}</h2>
                        <p className="lightbox__desc">{project.description}</p>

                        {project.software && (
                            <p className="lightbox__software">
                                <span>Software</span> {project.software}
                            </p>
                        )}

                        {/* Thumbnails */}
                        {project.images.length > 1 && (
                            <div className="lightbox__thumbs">
                                {project.images.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`lightbox__thumb ${i === activeImage && !showVideo ? 'lightbox__thumb--active' : ''}`}
                                        onClick={() => { setActiveImage(i); setShowVideo(false); }}
                                    >
                                        <img src={img} alt="" />
                                    </button>
                                ))}
                                {project.video && (
                                    <button
                                        className={`lightbox__thumb lightbox__thumb--video ${showVideo ? 'lightbox__thumb--active' : ''}`}
                                        onClick={() => setShowVideo(true)}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <polygon points="5 3 19 12 5 21 5 3" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
