'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hiddenHeader, setHiddenHeader] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  useEffect(() => {
    let lastScrollY = window.scrollY

    function handleScroll() {
      const currentScrollY = window.scrollY

      setHeaderScrolled(currentScrollY > 10)

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setHiddenHeader(true)
      } else {
        setHiddenHeader(false)
      }

      lastScrollY = currentScrollY
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header
      className={`site-header ${hiddenHeader ? 'is-hidden' : ''} ${
        headerScrolled ? 'is-scrolled' : ''
      }`}
    >
      <Link className="logo" href="/" onClick={() => setMenuOpen(false)}>
        <img
          src="/images/Fondazione-logo.png"
          alt="Fondazione La Fabbrica di Cioccolato"
        />
      </Link>

      <button
        className={menuOpen ? 'menu-toggle is-open' : 'menu-toggle'}
        type="button"
        aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
      </button>

      <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'}>
        <Link href="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        <Link href="/fondazione" onClick={() => setMenuOpen(false)}>
          Fondazione
        </Link>
        <Link href="/progetti" onClick={() => setMenuOpen(false)}>
          Progetti
        </Link>
        <Link href="/contatti" onClick={() => setMenuOpen(false)}>
          Contatti
        </Link>
      </nav>
    </header>
  )
}
