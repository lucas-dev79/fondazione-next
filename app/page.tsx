'use client'

import Link from 'next/link'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react'
import { featuredProjectImages, projects } from '../lib/projects'

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

type FeaturedProjectTileProps = {
  className?: string
  image: string
}

const fondazioneGalleryImages = [
  '/images/fairy_tail.jpg',
  '/images/hero-fondazione.jpg',
  '/images/fondazione_01.jpg',
  '/images/grid-hp/featured.jpg',
  '/images/grid-hp/grid-02.jpg',
  '/images/grid-hp/grid-03.jpg',
]

function FondazioneStickyGallery() {
  const galleryRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start start', 'end end'],
  })
  const galleryX = useTransform(scrollYProgress, [0, 1], ['28vw', '-78%'])

  return (
    <div className="fondazione-sticky-gallery-section" ref={galleryRef}>
      <motion.div
        className="fondazione-sticky-gallery"
        initial={{ opacity: 0, y: 56 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.22 }}
        transition={{
          duration: 1.25,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="fondazione-sticky-gallery-stage">
          <motion.div className="fondazione-sticky-gallery-track" style={{ x: galleryX }}>
            {fondazioneGalleryImages.map((image) => (
              <figure className="fondazione-sticky-gallery-image" key={image}>
                <img src={image} alt="" />
              </figure>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

function FeaturedProjectTile({ className = '', image }: FeaturedProjectTileProps) {
  const rotateXValue = useMotionValue(0)
  const rotateYValue = useMotionValue(0)
  const smoothRotateX = useSpring(rotateXValue, { stiffness: 180, damping: 18 })
  const smoothRotateY = useSpring(rotateYValue, { stiffness: 180, damping: 18 })

  function handleTileMove(event: MouseEvent<HTMLElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    rotateXValue.set((0.5 - y) * 16)
    rotateYValue.set((x - 0.5) * 16)
    event.currentTarget.style.setProperty('--glare-x', `${x * 100}%`)
    event.currentTarget.style.setProperty('--glare-y', `${y * 100}%`)
  }

  function resetTilePosition() {
    rotateXValue.set(0)
    rotateYValue.set(0)
  }

  return (
    <motion.figure
      className={`featured-project-tile ${className}`}
      onMouseMove={handleTileMove}
      onMouseLeave={resetTilePosition}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
      }}
    >
      <img src={image} alt="" />
    </motion.figure>
  )
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
      initial={{
        opacity: 0,
        x: exitDirection * 160,
        y: 56,
        rotate: exitDirection * 10,
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : exitDirection * 520,
        y: isVisible ? 0 : 90,
        rotate: isVisible ? 0 : exitDirection * 18,
      }}
      transition={{
        type: 'spring',
        stiffness: 55,
        damping: 20,
        mass: 1.1,
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
  const [loaderVisible, setLoaderVisible] = useState(true)
  const heroRef = useRef<HTMLElement | null>(null)
  const heroInView = useInView(heroRef, { amount: 0.95 })
  const heroReady = !loaderVisible && heroInView
  const featuredProject = projects[0]

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => {
      setLoaderVisible(false)
    }, 1400)

    return () => window.clearTimeout(loaderTimer)
  }, [])

  function scrollToProgram() {
    document.getElementById('progetti')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function scrollToNextSection() {
    document.getElementById('progetto-in-evidenza')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <main className="page">
      <AnimatePresence>
        {loaderVisible && (
          <motion.div
            className="home-loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              className="home-loader-logo"
              src="/images/FFC-logo-icon.png"
              alt=""
            />
            <motion.span
              className="home-loader-line"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <section className="hero" ref={heroRef}>
        <p className="eyebrow">Fondazione</p>

        <h1 className="hero-title">
          {['La Fabbrica', 'di Cioccolato'].map((line) => (
            <span className="hero-title-line" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <HeroImageFragment
          image="/images/fairy_tail.jpg"
          isVisible={heroReady}
          exitDirection={1}
          floatY={[0, -18, 0]}
          floatRotate={[-6, -2, -6]}
        />

        <motion.p
          className="hero-text"
          initial={{ opacity: 0, y: 28 }}
          animate={heroReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
          transition={{
            duration: 1.35,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          Arte contemporanea, cultura e comunità in uno spazio dedicato alla
          ricerca, agli incontri e alla produzione di nuove immaginazioni.
        </motion.p>

        <HeroImageFragment
          className="hero-image-fragment-secondary"
          image="/images/fondazione_01.jpg"
          isVisible={heroReady}
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

        <button
          className="hero-scroll-indicator"
          type="button"
          onClick={scrollToNextSection}
          aria-label="Scorri alla sezione successiva"
        >
          <span />
        </button>
      </section>

      <motion.section
        className="featured-project"
        id="progetto-in-evidenza"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.28 }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="featured-project-grid">
          {/* Three-image grid version. Uncomment this block to restore it.
          {featuredProjectImages.map((image) => (
            <FeaturedProjectTile image={image} key={image} />
          ))}
          */}
          <FeaturedProjectTile
            image={featuredProjectImages[0]}
            className="featured-project-tile-single"
          />
        </div>

        <div className="featured-project-content">
          <p className="section-label">Progetto in evidenza</p>
          <h2>{featuredProject.title}</h2>
          <p>{featuredProject.excerpt}</p>
          <div className="program-archive-action">
            <Link href={`/progetti/${featuredProject.slug}`}>Scopri il progetto</Link>
          </div>
        </div>

      </motion.section>

      <section className="section about" id="fondazione">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.28 }}
          transition={{
            duration: 1.25,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
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
        </motion.div>

        <FondazioneStickyGallery />
      </section>

      <section className="section program" id="progetti">
        <p className="section-label">Progetti</p>

        <div className="program-list">
          {projects.map((project, index) => (
            <motion.article
              className={openProgram === project.slug ? 'is-open' : ''}
              key={project.slug}
              initial={{
                opacity: 0,
                x: -42,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: false,
                amount: 0.3,
              }}
              transition={{
                duration: 1.35,
                delay: index * 0.22,
                ease: [0.22, 1, 0.36, 1],
              }}
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
            </motion.article>
          ))}
        </div>

        <div className="program-archive-action">
          <Link href="/progetti">Tutti i progetti</Link>
        </div>
      </section>
    </main>
  )
}
