'use client'

import { useState } from 'react'

const sliderImages = [
  {
    id: 1,
    label: 'Immagine 01',
    title: 'Spazio espositivo',
  },
  {
    id: 2,
    label: 'Immagine 02',
    title: 'Mostre e installazioni',
  },
  {
    id: 3,
    label: 'Immagine 03',
    title: 'Incontri e comunità',
  },
]

export default function FondazionePage() {
  const [activeImage, setActiveImage] = useState(0)

  const nextImage = () => {
    setActiveImage((activeImage + 1) % sliderImages.length)
  }

  const prevImage = () => {
    setActiveImage(
      activeImage === 0 ? sliderImages.length - 1 : activeImage - 1,
    )
  }

  return (
    <main className="page fondazione-page">
      <section className="page-hero fondazione-hero">
        <p className="eyebrow">La fondazione</p>

        <h1 className="page-title">
          Uno spazio per arte,
          <br />
          ricerca e comunità.
        </h1>

        <div className="hero-image-placeholder">
          <img
            className="hero-image"
            src="/images/hero-fondazione.jpg"
            alt="Fondazione La Fabbrica di Cioccolato"
          />
        </div>
      </section>

      <section className="page-content fondazione-content">
        <p>
          La Fabbrica di Cioccolato nasce come luogo dedicato alla produzione
          culturale contemporanea, alla sperimentazione artistica e al dialogo
          con il territorio.
        </p>

        <p>
          Attraverso mostre, residenze, incontri e progetti educativi, la
          fondazione sostiene nuove forme di immaginazione e crea occasioni di
          incontro tra artisti, curatori, pubblico e comunità.
        </p>
      </section>

      <section className="image-slider">
        <div className="slider-image-placeholder">
          <span>{sliderImages[activeImage].label}</span>
          <h2>{sliderImages[activeImage].title}</h2>
        </div>

        <div className="slider-controls">
          <button type="button" onClick={prevImage}>
            Indietro
          </button>

          <span>
            {activeImage + 1} / {sliderImages.length}
          </span>

          <button type="button" onClick={nextImage}>
            Avanti
          </button>
        </div>
      </section>
    </main>
  )
}
