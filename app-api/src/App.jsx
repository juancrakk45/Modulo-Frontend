import { useState, useEffect } from 'react';
import './App.css';

// URL base para buscar canciones (entity=song) con un límite de 16 resultados
const BASE_API_URL = 'https://itunes.apple.com/search?entity=song&limit=24&term='; 
// Término de búsqueda por defecto
const DEFAULT_TERM = 'pop'; 

function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  
  const [searchTerm, setSearchTerm] = useState(DEFAULT_TERM); 
  const [query, setQuery] = useState(DEFAULT_TERM); 


  // --- EFECTO: Se ejecuta al cambiar 'query' ---
  useEffect(() => {
    if (!query) {
        setSongs([]);
        return;
    }

    const fetchSongs = async () => {
      setLoading(true); 
      setError(null);

      const finalApiUrl = `${BASE_API_URL}${encodeURIComponent(query)}`;

      try {
        const response = await fetch(finalApiUrl);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}. Fallo al cargar la música.`);
        }

        const data = await response.json();
        setSongs(data.results); 
        
      } catch (err) {
        console.error("Error al cargar canciones:", err); 
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };
    
    fetchSongs();
    
  }, [query]); 


  // --- Función para manejar el evento de búsqueda ---
  const handleSearch = (e) => {
    e.preventDefault(); 
    
    const newTerm = searchTerm.trim();
    if (newTerm && newTerm !== query) {
        setQuery(newTerm); 
    } else if (newTerm === '') {
        setQuery('');
    }
  };


  // --- Renderizado de la Aplicación ---
  return (
    // NOTA: El centrado principal se gestiona en CSS mediante el <body>
    <div className="app-container"> 
      <h1>Buscador de Música (iTunes API) 🎶</h1>
      
      {/* FORMULARIO DE BÚSQUEDA (Centrado por CSS) */}
      <form onSubmit={handleSearch}> 
        <input 
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} 
          placeholder="Escribe el artista o canción..."
          style={{ 
            padding: '10px', 
            width: '300px', 
            marginRight: '10px', 
            fontSize: '1em',
            background: 'white', 
            color: 'black'       
          }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: '10px 20px', fontSize: '1em', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      
      <hr style={{ borderColor: '#444', width: '80%', margin: '20px auto' }}/>

      {/* RESULTADOS */}
      {loading && <h2>Cargando resultados...</h2>}
      {error && <h2 style={{ color: 'red' }}>Error: {error}</h2>}
      
      {!loading && !error && songs.length === 0 && query && (
          <h2>No se encontraron resultados para "{query}". Intenta otra búsqueda.</h2>
      )}

      {!loading && !error && songs.length > 0 && (
          <>
            <h2>Resultados para "{query}" ({songs.length} canciones)</h2>
            <div className="song-grid" style={{ 
                // Definición del layout de la cuadrícula
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                gap: '20px', 
                padding: '20px',
            }}>
              
              {songs.map((song) => (
                <div 
                  key={song.trackId} 
                  className="song-card" 
                  style={{ 
                    border: '1px solid #444', 
                    padding: '0', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 8px rgba(0,0,0,0.5)', 
                    background: '#333', 
                    color: 'white',
                    overflow: 'hidden', 
                    position: 'relative', 
                    cursor: 'pointer' 
                  }}
                >
                  
                  {/* PORTADA DE LA CANCIÓN */}
                  <img 
                    src={song.artworkUrl100.replace('100x100bb', '300x300bb')} 
                    alt={song.trackName} 
                    style={{ 
                        width: '100%', 
                        height: '280px',
                        objectFit: 'cover',
                        display: 'block' 
                    }}
                  />
                  
                  {/* INFORMACIÓN VISIBLE SIEMPRE */}
                   <div style={{ padding: '10px 15px' }}>
                    <h3 style={{ fontSize: '1.2em', margin: '0' }}>{song.trackName}</h3>
                    <p style={{ margin: '5px 0 0', fontSize: '0.9em', color: '#aaa' }}>{song.artistName}</p>
                  </div>
                  
                  {/* INFORMACIÓN EXTRA EN OVERLAY (Se muestra con hover de CSS) */}
                  <div className="hover-info"> 
                    <h3 style={{ fontSize: '1.2em', margin: '0 0 10px' }}>{song.trackName}</h3>
                    <hr style={{ width: '50%', borderColor: 'rgba(255, 255, 255, 0.5)' }}/>
                    <p>🎧 **Género:** {song.primaryGenreName}</p>
                    <p>💿 **Álbum:** {song.collectionName}</p>
                    <p>📅 **Lanzamiento:** {new Date(song.releaseDate).getFullYear()}</p>
                  </div>
                </div>
              ))}
            </div>
          </>
      )}
    </div>
  );
}

export default App;