import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ScrollToTop } from "./components/scroll-to-top"

// Configuração correta da fonte Inter usando next/font/google
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "LGPD - Sistema de Compliance",
  description: "Sistema para gerenciamento de conformidade com a LGPD",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body className={inter.className}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}



import './globals.css'