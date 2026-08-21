'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RouteLoader() {
  const pathname = usePathname()

  return <RouteLoaderScreen key={pathname} />
}

function RouteLoaderScreen() {
  const [isLeaving, setIsLeaving] = useState(false)
  const [isMounted, setIsMounted] = useState(true)

  useEffect(() => {
    const leaveTimer = window.setTimeout(() => {
      setIsLeaving(true)
    }, 700)

    const removeTimer = window.setTimeout(() => {
      setIsMounted(false)
    }, 1100)

    return () => {
      window.clearTimeout(leaveTimer)
      window.clearTimeout(removeTimer)
    }
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className={isLeaving ? 'home-loader is-leaving' : 'home-loader'}>
      <img className="home-loader-logo" src="/images/FFC-logo-icon.png" alt="" />
      <span className="home-loader-line" />
    </div>
  )
}
