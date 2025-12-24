import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

// Free Christmas music from a public domain source
const CHRISTMAS_MUSIC_URL = 'https://www.bensound.com/bensound-music/bensound-jinglebells.mp3';

export const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Create audio element
        audioRef.current = new Audio(CHRISTMAS_MUSIC_URL);
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
        setShowPrompt(false);
    };

    return (
        <>
            {/* Initial Prompt */}
            {showPrompt && (
                <div
                    onClick={toggleMusic}
                    style={{
                        position: 'fixed',
                        bottom: 90,
                        right: 20,
                        background: 'rgba(196, 30, 58, 0.9)',
                        backdropFilter: 'blur(10px)',
                        padding: '10px 16px',
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'white',
                        cursor: 'pointer',
                        zIndex: 99,
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        animation: 'pulse 2s infinite',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8
                    }}
                >
                    🎵 Activar música navideña
                </div>
            )}

            {/* Floating Music Button */}
            <button
                onClick={toggleMusic}
                style={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: isPlaying
                        ? 'linear-gradient(135deg, #165b33 0%, #0d3d22 100%)'
                        : 'linear-gradient(135deg, #c41e3a 0%, #8b1538 100%)',
                    border: '2px solid rgba(255, 215, 0, 0.3)',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    zIndex: 100,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    transition: 'all 0.3s ease'
                }}
                title={isPlaying ? 'Pausar música' : 'Reproducir música'}
            >
                {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>

            <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>
        </>
    );
};
