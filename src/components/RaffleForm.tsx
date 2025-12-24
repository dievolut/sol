import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, Smartphone, Mail, Instagram, ArrowRight, Share2, Gift, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

// ========================================
// GOOGLE FORMS CONFIGURATION
// ========================================
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScyMjNR0gxD0MzoEuutw1pYBAHLooL2nEhS86k6ttINzsHxhA/formResponse';
const PHONE_ENTRY_ID = 'entry.1613241403';  // Campo Telefono
const EMAIL_ENTRY_ID = 'entry.97750440';    // Campo Mail
const REFERRER_ENTRY_ID = 'entry.1129989351'; // Campo Código de referido
// ========================================

interface Participant {
    id: string;
    phone: string;
    email?: string;
    referral_id: string;
    points: number;
}

export const RaffleForm = () => {
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [participant, setParticipant] = useState<Participant | null>(null);
    const [missionStates, setMissionStates] = useState({ instagram: false });
    const [referredBy, setReferredBy] = useState<string | null>(null);

    // Capturar código de referido de la URL
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const ref = urlParams.get('ref');
        if (ref) {
            setReferredBy(ref);
            console.log('Referido por:', ref);
        }
    }, []);

    const validatePhone = (num: string) => /^[0-9+() -]{8,}$/.test(num);

    const fireConfetti = () => {
        const colors = ['#c41e3a', '#ffd700', '#165b33', '#ffffff'];
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors });
        setTimeout(() => {
            confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 }, colors });
            confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 }, colors });
        }, 250);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPhoneError('');

        if (!validatePhone(phone)) {
            setPhoneError('Ingresá un número válido');
            return;
        }

        setStatus('loading');

        try {
            // Submit to Google Forms
            const formData = new FormData();
            formData.append(PHONE_ENTRY_ID, phone);
            formData.append(EMAIL_ENTRY_ID, email || 'No proporcionado');
            // Enviar código de quien lo refirió (si existe)
            if (referredBy) {
                formData.append(REFERRER_ENTRY_ID, referredBy);
            }

            fetch(GOOGLE_FORM_ACTION_URL, {
                method: 'POST',
                mode: 'no-cors',
                body: formData
            }).catch(() => { });

            // Generate referral ID and show success
            const referralId = 'XMAS-' + Math.floor(1000 + Math.random() * 9000);

            setParticipant({
                id: 'gform',
                phone,
                email,
                referral_id: referralId,
                points: 50
            });
            setStatus('success');
            fireConfetti();

        } catch (err) {
            console.error(err);
            setParticipant({
                id: 'gform',
                phone,
                email,
                referral_id: 'XMAS-' + Math.floor(1000 + Math.random() * 9000),
                points: 50
            });
            setStatus('success');
            fireConfetti();
        }
    };

    const handleInstagramFollow = () => {
        window.open('https://www.instagram.com/sol_remeras/', '_blank');
        if (!missionStates.instagram) {
            setMissionStates(prev => ({ ...prev, instagram: true }));
            if (participant) {
                setParticipant({ ...participant, points: participant.points + 50 });
                confetti({ particleCount: 30, spread: 60, origin: { y: 0.7 } });
            }
        }
    };

    // SUCCESS STATE
    if (status === 'success' && participant) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ width: '100%' }}
            >
                <div className="glass-card ribbon-accent" style={{ padding: 28 }}>
                    <div style={{ textAlign: 'center', marginBottom: 24, marginTop: 8 }}>
                        <div style={{
                            width: 64, height: 64, margin: '0 auto 16px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, #165b33 0%, #0d3d22 100%)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 8px 25px rgba(22, 91, 51, 0.4)'
                        }}>
                            <Trophy size={28} color="#ffd700" />
                        </div>
                        <h2 className="display-title" style={{ fontSize: '1.8rem', marginBottom: 8 }}>
                            ¡Estás Participando!
                        </h2>
                        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14 }}>
                            Ya tenés chances para ganar
                        </p>
                    </div>

                    <div className="stats-grid" style={{ marginBottom: 24 }}>
                        <div className="stat-card">
                            <div className="stat-value">{participant.points}</div>
                            <div className="stat-label">Puntos</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-value" style={{ fontSize: 18, color: 'white' }}>
                                {participant.referral_id}
                            </div>
                            <div className="stat-label">Tu Código</div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 20 }}>
                        <p style={{
                            fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                            textTransform: 'uppercase', letterSpacing: 1, marginBottom: 12,
                            display: 'flex', alignItems: 'center', gap: 6
                        }}>
                            <Sparkles size={14} color="#ffd700" /> Sumá más chances
                        </p>

                        <button
                            onClick={handleInstagramFollow}
                            className="mission-card"
                            style={{
                                width: '100%', marginBottom: 12, cursor: 'pointer',
                                border: missionStates.instagram ? '1px solid rgba(37, 211, 102, 0.3)' : undefined,
                                background: missionStates.instagram ? 'rgba(37, 211, 102, 0.1)' : undefined
                            }}
                        >
                            <div className={`mission-icon ${missionStates.instagram ? '' : 'instagram'}`}
                                style={missionStates.instagram ? { background: '#25D366' } : undefined}>
                                {missionStates.instagram ? <Check size={22} color="white" /> : <Instagram size={22} color="white" />}
                            </div>
                            <div className="mission-info">
                                <div className="mission-title">
                                    {missionStates.instagram ? '¡Completado!' : 'Seguinos en Instagram'}
                                </div>
                                <div className="mission-points">+50 puntos</div>
                            </div>
                            {!missionStates.instagram && <ArrowRight size={18} color="rgba(255,255,255,0.3)" />}
                        </button>

                        <a
                            href={`https://wa.me/?text=🎄 ¡Participá del sorteo navideño! Registrate gratis: ${window.location.origin}?ref=${participant.referral_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="whatsapp-btn"
                        >
                            <Share2 size={20} />
                            <span>Compartir y ganar +100</span>
                        </a>
                    </div>

                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 16 }}>
                        Por cada amigo que se registre con tu código, sumás 100 puntos extra.
                    </p>
                </div>
            </motion.div>
        );
    }

    // FORM STATE
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ width: '100%' }}
        >
            <div className="glass-card" style={{ padding: 28 }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <div style={{
                        width: 56, height: 56, margin: '0 auto 16px', borderRadius: 16,
                        background: 'rgba(255, 215, 0, 0.1)', border: '1px solid rgba(255, 215, 0, 0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Gift size={26} color="#ffd700" />
                    </div>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: 'white', marginBottom: 8 }}>
                        Registrate y Participá
                    </h2>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)' }}>
                        Solo necesitamos tu celular
                    </p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="form-group">
                        <label className="form-label">Celular *</label>
                        <div className="input-wrapper">
                            <Smartphone size={20} className="input-icon" />
                            <input
                                type="tel"
                                inputMode="tel"
                                required
                                placeholder="11 1234 5678"
                                className="form-input"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        {phoneError && (
                            <p style={{ color: '#ff6b6b', fontSize: 12, marginTop: 8, marginLeft: 4 }}>
                                {phoneError}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                        <label className="form-label">Email (opcional)</label>
                        <div className="input-wrapper">
                            <Mail size={20} className="input-icon" />
                            <input
                                type="email"
                                inputMode="email"
                                placeholder="tu@email.com"
                                className="form-input"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={status === 'loading'} className="cta-primary" style={{ marginTop: 8 }}>
                        {status === 'loading' ? (
                            <span style={{
                                width: 20, height: 20, border: '3px solid rgba(0,0,0,0.2)',
                                borderTopColor: '#2a1800', borderRadius: '50%', animation: 'spin 0.8s linear infinite'
                            }} />
                        ) : (
                            <><Sparkles size={18} /><span>Quiero Participar</span></>
                        )}
                    </button>
                </form>

                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: 20, lineHeight: 1.5 }}>
                    🔒 Tus datos están seguros. Solo te contactaremos si ganás.
                </p>
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </motion.div>
    );
};
