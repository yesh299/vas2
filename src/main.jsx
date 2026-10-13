import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useState } from 'react'
import './styles.css'

function App() {
  const [vasKey, setVasKey] = useState('')

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="/" aria-label="Vas home">
          VAS<span className="wordmark__dot">.</span>
        </a>
        <button className="menu-button" type="button" aria-label="Open menu">
          <span />
          <span />
        </button>
      </header>

      <section className="first-section" aria-label="Vas opening visual">
        <img
          className="first-section__image"
          src="/assets/first-section-fabric.png"
          alt="Layered VAS fabrics"
        />
      </section>

      <section className="hero hero--layers" id="home">
        <div className="hero__glow" />
        <div className="hero__grain" />
        <div className="hero__content">
          <div className="copy">
            <img
              className="script-logo"
              src="/assets/font%20VAS%20transparent.png"
              alt="Vas"
            />
            <h1>Carry your space</h1>
            <p>
              Object of presence, created to accompany the spaces we
              <br className="desktop-break" />
              inhabit and the journeys between them.
            </p>
            <form
              className="enter-link"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="text"
                aria-label="Enter your Vas key"
                placeholder="Enter your vas - key"
                autoComplete="off"
                value={vasKey}
                onChange={(event) => setVasKey(event.target.value)}
              />
              <button
                className="enter-link__arrow"
                type="submit"
                aria-label="Submit Vas key"
                disabled={!vasKey.trim()}
              >
                →
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="site-footer__brand">
          <span className="site-footer__wordmark">VAS</span>
          <span className="site-footer__tagline">Carry your space</span>
        </div>
        <div className="site-footer__meta">
          <p>VAS is developed with <strong>Mudra Essentials Pvt. Ltd.</strong></p>
          <p>© 2026 VAS. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
