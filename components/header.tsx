'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

export default function Header() {
  const headerRef = useRef<HTMLElement | null>(null)

  function closeMenu() {
    const menuCheck = document.getElementById('site-menu-check')

    if (menuCheck instanceof HTMLInputElement) {
      menuCheck.checked = false
    }
  }

  useEffect(() => {
    const header = headerRef.current

    if (!header) {
      return
    }

    const headerElement = header
    let previousScrollY = window.pageYOffset

    function handleScroll() {
      const currentScrollY = window.pageYOffset

      headerElement.classList.toggle('is-scrolled', currentScrollY > 10)

      if (previousScrollY < currentScrollY && currentScrollY > 80) {
        headerElement.classList.add('is-hidden')
      } else {
        headerElement.classList.remove('is-hidden')
      }

      previousScrollY = currentScrollY
    }

    handleScroll()
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

      <header className="site-header" ref={headerRef}>
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
