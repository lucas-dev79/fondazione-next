'use client'

import Link from 'next/link'
import { MouseEvent, useRef, useState } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react'
import { projects } from '../lib/projects'

type HeroImageFragmentProps = {
  alt?: string
  className?: string
  duration?: number
  exitDirection?: number
  floatRotate: number[]
  floatY: number[]
  image: string
  isVisible: boolean
}

function HeroImageFragment({
  alt = '',
  className = '',
  duration = 8,
  exitDirection = 1,
  floatRotate,
  floatY,
  image,
  isVisible,
}: HeroImageFragmentProps) {
  const fragmentX = useMotionValue(0)
  const fragmentY = useMotionValue(0)
  const smoothX = useSpring(fragmentX, { stiffness: 180, damping: 18 })
  const smoothY = useSpring(fragmentY, { stiffness: 180, damping: 18 })
  const rotateX = useTransform(smoothY, [-30, 30], [5, -5])
  const rotateY = useTransform(smoothX, [-30, 30], [-5, 5])

  function handleFragmentMove(event: MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = event.clientX - rect.left - rect.width / 2
    const y = event.clientY - rect.top - rect.height / 2

    fragmentX.set((x / rect.width) * 60)
    fragmentY.set((y / rect.height) * 60)
  }

  function resetFragmentPosition() {
    fragmentX.set(0)
    fragmentY.set(0)
  }

  return (
    <motion.figure
      className={`hero-image-fragment ${className}`}
      animate={{
        x: isVisible ? 0 : exitDirection * 520,
        y: isVisible ? 0 : 90,
        rotate: isVisible ? 0 : exitDirection * 18,
      }}
      transition={{
        type: 'spring',
        stiffness: 85,
        damping: 18,
      }}
    >
      <motion.div
        className="hero-image-fragment-motion"
        animate={{
          y: floatY,
          rotate: floatRotate,
        }}
        whileHover={{ scale: 1.04 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        onMouseMove={handleFragmentMove}
        onMouseLeave={resetFragmentPosition}
        style={{
          x: smoothX,
          y: smoothY,
          rotateX,
          rotateY,
        }}
      >
        <img src={image} alt={alt} />
      </motion.div>
    </motion.figure>
  )
}

export default function Home() {
  const [openProgram, setOpenProgram] = useState<string | null>(null)
  const heroRef = useRef<HTMLElement | null>(null)
  const heroInView = useInView(heroRef, { amount: 0.95 })

  function scrollToProgram() {
    document.getElementById('progetti')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="page">
      <section className="hero" ref={heroRef}>
        <p className="eyebrow">Fondazione</p>

        <h1 className="hero-title">
          La Fabbrica
          <br />
          di Cioccolato
        </h1>

        <HeroImageFragment
          image="/images/fairy_tail.jpg"
          isVisible={heroInView}
          exitDirection={1}
          floatY={[0, -18, 0]}
          floatRotate={[-6, -2, -6]}
        />

        <p className="hero-text">
          Arte contemporanea, cultura e comunità in uno spazio dedicato alla
          ricerca, agli incontri e alla produzione di nuove immaginazioni.
        </p>

        <HeroImageFragment
          className="hero-image-fragment-secondary"
          image="/images/fondazione_01.jpg"
          isVisible={heroInView}
          exitDirection={-1}
          floatY={[0, 14, 0]}
          floatRotate={[4, 8, 4]}
          duration={9}
        />

        <div className="hero-actions">
          <button type="button" onClick={scrollToProgram}>
            Progetti
          </button>
          <a href="#fondazione">La fondazione</a>
        </div>
      </section>

      <section className="section about" id="fondazione">
        <p className="section-label">La fondazione</p>

        <div className="section-flex">
          <h2>
            Un luogo dove arte, territorio e pensiero contemporaneo si
            incontrano.
          </h2>

          <div className="desc-cta-block">
            <p>
              La Fabbrica di Cioccolato promuove mostre, residenze, progetti
              culturali e momenti di dialogo. La fondazione nasce come spazio
              aperto alla ricerca, alla comunità e alla sperimentazione
              artistica.
            </p>
            <div className="fondazione-action">
              <Link href="/fondazione">Scopri di più</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section program" id="progetti">
        <p className="section-label">Progetti</p>

        <div className="program-list">
          {projects.map((project) => (
            <article
              className={openProgram === project.slug ? 'is-open' : ''}
              key={project.slug}
            >
              <span className="program-category">{project.category}</span>

              <div className="program-body">
                <button
                  type="button"
                  className="program-toggle"
                  onClick={() =>
                    setOpenProgram(
                      openProgram === project.slug ? null : project.slug,
                    )
                  }
                >
                  <h3>{project.title}</h3>
                  <span className="program-arrow">↓</span>
                </button>

                <div className="program-description">
                  <p>{project.excerpt}</p>
                  <div className="project-actions">
                    <Link href={`/progetti/${project.slug}`}>
                      Scopri di più
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="program-archive-action">
          <Link href="/progetti">Tutti i progetti</Link>
        </div>
      </section>
    </main>
  )
}
