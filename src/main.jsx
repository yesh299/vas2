import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useRef, useState } from 'react'
import './styles.css'

const vertexShader = `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uPhase;
  uniform float uAmplitude;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 transformed = position;
    // Let one broad wave travel across the whole fabric stack, with a
    // gentler cross-wave so all four layers move together like cloth.
    float waveA = sin(position.x * 2.6 - position.y * 1.15 + uTime * uSpeed + uPhase);
    float waveB = sin(position.x * 4.1 + position.y * 1.8 + uTime * uSpeed * 0.68 + uPhase * 1.7);
    float fold = waveA * 0.16 + waveB * 0.045;
    transformed.z += fold * uAmplitude;
    transformed.x += sin(position.y * 2.1 + uTime * uSpeed + uPhase) * 0.11;
    transformed.y += sin(position.x * 1.4 - uTime * uSpeed * 0.8 + uPhase) * 0.07;
    vWave = fold;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vec4 fabric = texture2D(uTexture, vUv);
    float light = 1.0 + vWave * 1.8;
    gl_FragColor = vec4(fabric.rgb * light, fabric.a);
  }
`

function FabricLayer() {
  const mesh = useRef(null)
  const material = useRef(null)
  const texture = useLoader(
    TextureLoader,
    '/assets/first-section-fabric.png',
  )

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    if (material.current) {
      material.current.uniforms.uTime.value = time * 1.45
    }

    if (mesh.current) {
      mesh.current.position.x = Math.sin(time * 0.58) * 0.08
      mesh.current.position.y = Math.sin(time * 0.9) * 0.045
      mesh.current.rotation.z = Math.sin(time * 0.7) * 0.018
      mesh.current.rotation.y = Math.sin(time * 0.48) * 0.035
    }
  })

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[4.5, 5.58, 96, 96]} />
      <shaderMaterial
        ref={material}
        transparent
        depthWrite={false}
        uniforms={{
          uTime: { value: 0 },
          uSpeed: { value: 0.42 },
          uPhase: { value: 1.4 },
          uAmplitude: { value: 1.0 },
          uTexture: { value: texture },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

function LayerStack() {
  return (
    <div className="layer-stack" aria-hidden="true">
      <Canvas
        orthographic
        camera={{
          position: [0, 0, 8],
          left: -2.6,
          right: 2.6,
          top: 3.2,
          bottom: -3.2,
          zoom: 1,
        }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <FabricLayer />
      </Canvas>
    </div>
  )
}

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
        <LayerStack />
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
