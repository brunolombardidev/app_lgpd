"use client"

import { useState } from "react"
import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function Pagamentos() {
  const [plano, setPlano] = useState("mensal")
  const precos = {
    mensal: 349.9,
    trimestral: 999.9,
    semestral: 1889.9,
    anual: 3499.9,
  }
  const descontos = {
    mensal: 0,
    trimestral: 5,
    semestral: 10,
    anual: 17,
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-6">Pagamento</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Plano Pro - R$ {precos[plano].toFixed(2)}</h2>
            <p className="text-sm text-gray-600">
              {descontos[plano] > 0 ? `Economia de ${descontos[plano]}%` : "Sem desconto"}
            </p>
          </div>
          <form className="space-y-4">
            <Select onValueChange={(value) => setPlano(value)}>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-full text-gray-500">
                <SelectValue placeholder="Selecione o plano" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensal">Mensal</SelectItem>
                <SelectItem value="trimestral">Trimestral</SelectItem>
                <SelectItem value="semestral">Semestral</SelectItem>
                <SelectItem value="anual">Anual</SelectItem>
              </SelectContent>
            </Select>
            <input
              type="text"
              placeholder="Cupom de desconto"
              className="w-full p-2 border border-gray-300 rounded-full"
            />
            <input
              type="text"
              placeholder="Número do cartão"
              className="w-full p-2 border border-gray-300 rounded-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="MM/AA" className="w-full p-2 border border-gray-300 rounded-full" />
              <input type="text" placeholder="CVV" className="w-full p-2 border border-gray-300 rounded-full" />
            </div>
            <input
              type="text"
              placeholder="Nome no cartão"
              className="w-full p-2 border border-gray-300 rounded-full"
            />
            <div className="flex justify-between">
              <Link href="/cadastro-rapido">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>
              </Link>
              <Link href="/agradecimento">
                <Button variant="default">Finalizar</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

