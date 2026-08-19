'use client'

import { useState } from 'react'

type ProjectCarouselProps = {
  images: string[]
}

export default function ProjectCarousel({ images }: ProjectCarouselProps) {
  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (images.length === 0) {
    return null
  }

  return (
    <section className="project-carousel" aria-label="Galleria del progetto">
      <button
        className="project-carousel-frame"
        type="button"
        onClick={() => setLightboxOpen(true)}
        aria-label="Apri immagine grande"
      >
        <img src={images[activeImage]} alt="" />
      </button>

      <div className="project-carousel-dots" aria-label="Seleziona immagine">
        {images.map((image, index) => (
          <button
            className={index === activeImage ? 'is-active' : ''}
            type="button"
            key={image}
            onClick={() => setActiveImage(index)}
            aria-label={`Mostra immagine ${index + 1}`}
            aria-current={index === activeImage}
          />
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Immagine ingrandita"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            className="project-lightbox-close"
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Chiudi immagine"
          >
            ×
          </button>
          <img src={images[activeImage]} alt="" />
        </div>
      )}
    </section>
  )
}
