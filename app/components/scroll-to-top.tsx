"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function ScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    // Quando a rota (pathname) muda, scroll para o topo
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

