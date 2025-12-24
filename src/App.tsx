import { Hero } from './components/Hero';
import { RaffleForm } from './components/RaffleForm';
import SnowEffect from './components/SnowEffect';
import { MusicPlayer } from './components/MusicPlayer';

function App() {
  return (
    <div className="app-container">
      {/* Snow Effect */}
      <div style={{ opacity: 0.4 }}>
        <SnowEffect />
      </div>

      {/* Music Player */}
      <MusicPlayer />

      <div className="main-content">
        <Hero />
        <RaffleForm />
      </div>

      <footer className="app-footer">
        <p style={{ marginBottom: 4 }}>© 2025 Tu Tienda de Regalos</p>
        <p>Hecho con ❤️ para estas fiestas</p>
      </footer>
    </div>
  );
}

export default App;
