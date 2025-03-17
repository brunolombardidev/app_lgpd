"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Agradecimento() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(30)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer)
          router.push("/login")
          return 0
        }
        return prevCount - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-6">Obrigado pela sua compra!</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <p className="text-center mb-6">
            Seu pagamento foi processado com sucesso. Você será redirecionado para a página de login em{" "}
            <span className="font-bold">{countdown}</span> segundos.
          </p>
          <Link href="/login">
            <Button variant="default" className="w-full">
              Faça Login
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

