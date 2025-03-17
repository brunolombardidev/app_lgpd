import { Header } from "./components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="w-full">
        <iframe
          className="w-full min-h-[250px]"
          src="https://www.youtube.com/embed/GV3HUDMQ-F8"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-bold text-center mb-6">Nossos Planos</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Plano Básico</h3>
            <ul className="mb-6">
              <li>Recurso 1</li>
              <li>Recurso 2</li>
              <li>Recurso 3</li>
            </ul>
            <Link href="/cadastro-rapido">
              <Button variant="outline" className="w-full">
                Assinar
              </Button>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transform scale-105 border-2 border-blue-500 transition-transform duration-300 hover:scale-110">
            <h3 className="text-xl font-semibold mb-4">Plano Pro</h3>
            <ul className="mb-6">
              <li>Tudo do Plano Básico</li>
              <li>Recurso 4</li>
              <li>Recurso 5</li>
              <li>Recurso 6</li>
            </ul>
            <Link href="/cadastro-rapido">
              <Button variant="default" className="w-full">
                Assinar
              </Button>
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
            <h3 className="text-xl font-semibold mb-4">Plano Enterprise</h3>
            <ul className="mb-6">
              <li>Tudo do Plano Pro</li>
              <li>Recurso 7</li>
              <li>Recurso 8</li>
              <li>Suporte 24/7</li>
            </ul>
            <Link href="/cadastro-rapido">
              <Button variant="outline" className="w-full">
                Assinar
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

