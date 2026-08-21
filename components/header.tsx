'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Header() {
  const [hiddenHeader, setHiddenHeader] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)

  function closeMenu() {
    const menuCheck = document.getElementById('site-menu-check')

    if (menuCheck instanceof HTMLInputElement) {
      menuCheck.checked = false
    }
  }

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
    <>
      <input
        className="menu-check"
        id="site-menu-check"
        type="checkbox"
        aria-hidden="true"
        tabIndex={-1}
      />

      <header
        className={`site-header ${hiddenHeader ? 'is-hidden' : ''} ${
          headerScrolled ? 'is-scrolled' : ''
        }`}
      >
        <Link className="logo" href="/" onClick={closeMenu}>
          <img
            src="/images/Fondazione-logo.png"
            alt="Fondazione La Fabbrica di Cioccolato"
          />
        </Link>

        <label
          className="menu-toggle"
          htmlFor="site-menu-check"
          aria-label="Apri menu"
          aria-controls="site-menu"
        >
          <span></span>
          <span></span>
        </label>
      </header>

      <nav className="site-nav" id="site-menu">
        <Link href="/" onClick={closeMenu}>
          Home
        </Link>
        <Link href="/fondazione" onClick={closeMenu}>
          Fondazione
        </Link>
        <Link href="/progetti" onClick={closeMenu}>
          Progetti
        </Link>
        <Link href="/contatti" onClick={closeMenu}>
          Contatti
        </Link>
      </nav>
    </>
  )
}
