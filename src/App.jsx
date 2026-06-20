import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [backendStatus, setBackendStatus] = useState('Cargando...')
  const [backendMessage, setBackendMessage] = useState('')

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(`${apiUrl}/health`)
      .then((response) => response.json())
      .then((data) => {
        setBackendStatus(data.status)
        setBackendMessage('Frontend conectado correctamente con el backend')
      })
      .catch((error) => {
        console.error('Error conectando con backend:', error)
        setBackendStatus('ERROR')
        setBackendMessage('No se pudo conectar con el backend')
      })
  }, [apiUrl])

  return (
    <main className="container">
      <section className="card">
        <h1>Innovatech Chile</h1>
        <p>Evaluación DevOps - Frontend + Backend</p>

        <div className="status-box">
          <h2>Estado del Backend</h2>
          <p className={backendStatus === 'OK' ? 'ok' : 'error'}>
            {backendStatus}
          </p>
          <p>{backendMessage}</p>
        </div>

        <div className="info">
          <p><strong>Frontend:</strong> React + Vite</p>
          <p><strong>Backend:</strong> Spring Boot</p>
          <p><strong>API URL:</strong> {apiUrl}</p>
        </div>
      </section>
    </main>
  )
}

export default App