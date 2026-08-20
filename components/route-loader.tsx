'use client'

import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function RouteLoader() {
  const pathname = usePathname()

  return <RouteLoaderScreen key={pathname} />
}

function RouteLoaderScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const loaderTimer = window.setTimeout(() => {
      setVisible(false)
    }, 700)

    return () => window.clearTimeout(loaderTimer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="home-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
