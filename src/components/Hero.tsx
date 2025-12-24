import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import SnowEffect from './SnowEffect';

export const Hero = () => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <section className="hero-section" style={{
                padding: '40px 0 24px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative'
            }}>

                {/* Floating Ornaments */}
                <span className="ornament ornament-1">🎄</span>
                <span className="ornament ornament-2">⭐</span>
                <span className="ornament ornament-3">🎁</span>

                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ marginBottom: 24 }}
                >
                    <span className="festive-badge">Navidad 2025</span>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="float-animation"
                    style={{ marginBottom: 24 }}
                >
                    <div style={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #c41e3a 0%, #8b1538 100%)',
                        padding: 4,
                        boxShadow: '0 20px 40px rgba(196, 30, 58, 0.4), 0 0 60px rgba(255, 215, 0, 0.2)',
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            border: '3px solid rgba(255, 215, 0, 0.3)'
                        }}>
                            <img
                                src="/santa.jpg"
                                alt="Papá Noel"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="display-title"
                >
                    ¡Felices Fiestas!
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="subtitle"
                    style={{ marginBottom: 28 }}
                >
                    Escaneaste un producto especial. Registrate y participá por increíbles premios navideños.
                </motion.p>

                {/* Video Button */}
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    onClick={() => setShowModal(true)}
                    className="cta-secondary glow-animation"
                    style={{ maxWidth: 280 }}
                >
                    <div style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #c41e3a 0%, #8b1538 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                    }}>
                        <Play size={18} fill="white" color="white" />
                    </div>
                    <span>Ver Saludo de Papá Noel</span>
                </motion.button>
            </section>

            {/* Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowModal(false)}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            zIndex: 100,
                            background: 'rgba(0,0,0,0.95)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 20
                        }}
                    >
                        <SnowEffect />

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={e => e.stopPropagation()}
                            style={{
                                width: '100%',
                                maxWidth: 560,
                                aspectRatio: '16/9',
                                background: '#000',
                                borderRadius: 20,
                                overflow: 'hidden',
                                position: 'relative',
                                border: '2px solid rgba(255, 215, 0, 0.3)',
                                boxShadow: '0 0 80px rgba(255, 215, 0, 0.25)'
                            }}
                        >
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    position: 'absolute',
                                    top: 12,
                                    right: 12,
                                    zIndex: 10,
                                    width: 36,
                                    height: 36,
                                    borderRadius: '50%',
                                    background: 'rgba(0,0,0,0.7)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer'
                                }}
                            >
                                <X size={18} />
                            </button>

                            <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/xdKtbVzLpsA?autoplay=1&rel=0"
                                title="Saludo de Papá Noel"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ display: 'block' }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
