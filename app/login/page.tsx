import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Login() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-6">Login</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <form className="space-y-4">
            <input type="email" placeholder="E-mail" className="w-full p-2 border border-gray-300 rounded-full" />
            <input type="password" placeholder="Senha" className="w-full p-2 border border-gray-300 rounded-full" />
            <div className="text-center">
              <Link href="#" className="text-sm text-blue-600 hover:underline">
                Esqueci minha senha
              </Link>
            </div>
            <Link href="/configurar-perfil">
              <Button variant="default" className="w-full">
                Entrar
              </Button>
            </Link>
          </form>
          <div className="mt-8">
            <p className="text-center mb-4">Baixe nosso app:</p>
            <div className="flex justify-center space-x-4">
              <Link href="https://play.google.com/store" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/180px-Google_Play_Store_badge_EN.svg.png"
                  alt="Get it on Google Play"
                  width={135}
                  height={40}
                />
              </Link>
              <Link href="https://www.apple.com/app-store/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/135px-Download_on_the_App_Store_Badge.svg.png"
                  alt="Download on the App Store"
                  width={120}
                  height={40}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

