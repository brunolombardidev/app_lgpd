import { Header } from "../components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function CadastroRapido() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-6">Cadastro Rápido</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <form className="space-y-4">
            <input type="text" placeholder="Empresa" className="w-full p-2 border border-gray-300 rounded-full" />
            <input type="email" placeholder="E-mail" className="w-full p-2 border border-gray-300 rounded-full" />
            <input type="password" placeholder="Senha" className="w-full p-2 border border-gray-300 rounded-full" />
            <input
              type="password"
              placeholder="Confirmação de Senha"
              className="w-full p-2 border border-gray-300 rounded-full"
            />
            <div className="flex justify-between">
              <Link href="/">
                <Button variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                </Button>
              </Link>
              <Link href="/pagamentos">
                <Button variant="default">Cadastrar</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

