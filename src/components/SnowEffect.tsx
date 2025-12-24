import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SnowEffect = () => {
    const [snowflakes, setSnowflakes] = useState<number[]>([]);

    useEffect(() => {
        setSnowflakes(Array.from({ length: 40 }).map((_, i) => i));
    }, []);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 50,
            overflow: 'hidden'
        }}>
            {snowflakes.map((i) => (
                <Snowflake key={i} />
            ))}
        </div>
    );
};

const Snowflake = () => {
    const randomDelay = Math.random() * 5;
    const randomDuration = 8 + Math.random() * 12;
    const randomXStart = Math.random() * 100;
    const randomXDrift = (Math.random() - 0.5) * 30;
    const size = 2 + Math.random() * 4;
    const opacity = 0.4 + Math.random() * 0.4;

    return (
        <motion.div
            initial={{
                y: -20,
                x: `${randomXStart}vw`,
                opacity: 0
            }}
            animate={{
                y: '110vh',
                x: `${randomXStart + randomXDrift}vw`,
                opacity: [0, opacity, opacity, 0]
            }}
            transition={{
                duration: randomDuration,
                repeat: Infinity,
                delay: randomDelay,
                ease: "linear"
            }}
            style={{
                position: 'absolute',
                width: size,
                height: size,
                borderRadius: '50%',
                background: 'white',
                boxShadow: `0 0 ${size * 2}px rgba(255,255,255,0.5)`
            }}
        />
    );
};

export default SnowEffect;
