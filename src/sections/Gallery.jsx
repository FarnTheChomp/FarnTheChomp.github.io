import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { sculpts, generalist } from '../data/portfolio';
import Lightbox from '../components/Lightbox';
import './Gallery.css';

const tabs = [
    { id: 'sculpts', label: '3D Sculpts', count: sculpts.length },
    { id: 'generalist', label: 'Generalist', count: generalist.length },
];

function ProjectCard({ project, onClick, index }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-80px' });

    return (
        <motion.article
            ref={ref}
            className="project-card glass-card"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => onClick(project)}
        >
            <div className="project-card__image-wrap">
                <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="project-card__image"
                    loading="lazy"
                />
                <div className="project-card__overlay">
                    <span className="project-card__view">View Project</span>
                    {project.video && (
                        <span className="project-card__video-badge">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Video
                        </span>
                    )}
                    {project.isGallery && (
                        <span className="project-card__gallery-badge">
                            {project.images.length} images
                        </span>
                    )}
                </div>
                {project.featured && (
                    <div className="project-card__featured">Featured</div>
                )}
            </div>

            <div className="project-card__body">
                <div className="project-card__tags">
                    {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="project-card__tag">{tag}</span>
                    ))}
                </div>
                <h3 className="project-card__title">{project.title}</h3>
                <p className="project-card__desc">
                    {project.description.slice(0, 120)}...
                </p>
                <div className="project-card__footer">
                    <span className="project-card__year">{project.year}</span>
                    {project.software && (
                        <span className="project-card__software">{project.software}</span>
                    )}
                </div>
            </div>
        </motion.article>
    );
}

export default function Gallery() {
    const [activeTab, setActiveTab] = useState('sculpts');
    const [selectedProject, setSelectedProject] = useState(null);
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true });

    const projects = activeTab === 'sculpts' ? sculpts : generalist;

    return (
        <section id="work" className="section gallery">
            <div className="container">
                {/* Header */}
                <motion.div
                    ref={headerRef}
                    className="gallery__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={headerInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                >
                    <p className="section-label">Portfolio</p>
                    <h2 className="section-title">
                        Selected <span className="gradient-text">Work</span>
                    </h2>
                    <div className="divider" />
                    <p className="section-subtitle">
                        A collection of 3D sculpts, illustrations, and environment art spanning character
                        design, fan creation, and digital painting. Each piece is a step further into the
                        worlds I want to build.
                    </p>
                </motion.div>

                {/* Tabs */}
                <div className="gallery__tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`gallery__tab ${activeTab === tab.id ? 'gallery__tab--active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                            <span className="gallery__tab-count">{tab.count}</span>
                            {activeTab === tab.id && (
                                <motion.div className="gallery__tab-indicator" layoutId="tab-indicator" />
                            )}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        className={`gallery__grid gallery__grid--${activeTab}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {projects.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={i}
                                onClick={setSelectedProject}
                            />
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {selectedProject && (
                    <Lightbox
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
