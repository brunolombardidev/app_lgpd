import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import { Check, X, ChevronRight } from "lucide-react"
import Link from "next/link"

export default function TrilhaDeConformidade() {
  const steps = [
    { name: "Configuração de Perfil", completed: true, href: "/configurar-perfil" },
    { name: "Encarregado de Dados", completed: false, href: "/encarregado-de-dados" },
    { name: "Diagnóstico de Conformidades", completed: false, href: "/diagnostico-de-conformidades" },
    { name: "Plano de Ação", completed: false, href: "/plano-de-acao" },
    { name: "Portal de Privacidade", completed: false, href: "#" },
    { name: "Implementação", completed: false, href: "#" },
    { name: "Documentação e Relatórios", completed: false, href: "#" },
    { name: "Monitoramento Contínuo", completed: false, href: "#" },
    { name: "Certificação e Auditoria", completed: false, href: "#" },
  ]

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-6">Trilha de Conformidade</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-black"></div>
            {steps.map((step, index) => (
              <div key={index} className="flex items-center mb-4 last:mb-0">
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                    step.completed ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {step.completed ? <Check className="h-5 w-5 text-white" /> : <X className="h-5 w-5 text-white" />}
                </div>
                <div className="flex-grow ml-2">
                  <Link href={step.href} passHref>
                    <Button
                      variant="outline"
                      className={`w-full justify-between transition-transform duration-300 hover:scale-105 ${
                        step.completed
                          ? "bg-green-100 hover:bg-green-200 text-green-800"
                          : "bg-red-100 hover:bg-red-200 text-red-800"
                      }`}
                    >
                      {step.name}
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

