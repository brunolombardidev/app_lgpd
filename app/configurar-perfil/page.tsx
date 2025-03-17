import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

export default function ConfigurarPerfil() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-6">Configurar Perfil</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Há um responsável designado para a proteção de dados (Encarregado de dados - DPO)?
              </label>
              <RadioGroup defaultValue="no" className="flex space-x-4">
                <div className="flex items-center">
                  <RadioGroupItem value="yes" id="dpo-yes" className="mr-2" disabled />
                  <label htmlFor="dpo-yes">Sim</label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="no" id="dpo-no" className="mr-2" disabled />
                  <label htmlFor="dpo-no">Não</label>
                </div>
              </RadioGroup>
            </div>

            <input
              type="text"
              placeholder="Nome da Empresa"
              className="w-full p-2 border border-gray-300 rounded-full"
            />

            <input type="text" placeholder="Razão Social" className="w-full p-2 border border-gray-300 rounded-full" />

            <input type="text" placeholder="CNPJ" className="w-full p-2 border border-gray-300 rounded-full" />

            <Select>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-full text-gray-500">
                <SelectValue placeholder="Setor de Atuação" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tecnologia">Tecnologia</SelectItem>
                <SelectItem value="saude">Saúde</SelectItem>
                <SelectItem value="educacao">Educação</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="varejo">Varejo</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-full text-gray-500">
                <SelectValue placeholder="Estrutura da Empresa" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mei">MEI</SelectItem>
                <SelectItem value="me">Microempresa (ME)</SelectItem>
                <SelectItem value="epp">Empresa de Pequeno Porte (EPP)</SelectItem>
                <SelectItem value="ltda">Sociedade Limitada (LTDA)</SelectItem>
                <SelectItem value="sa">Sociedade Anônima (S.A.)</SelectItem>
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="w-full p-2 border border-gray-300 rounded-full text-gray-500">
                <SelectValue placeholder="Modelo de Negócio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="b2b">B2B</SelectItem>
                <SelectItem value="b2c">B2C</SelectItem>
                <SelectItem value="both">Ambos</SelectItem>
              </SelectContent>
            </Select>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sua empresa possui Website?</label>
              <RadioGroup defaultValue="no" className="flex space-x-4">
                <div className="flex items-center">
                  <RadioGroupItem value="yes" id="website-yes" className="mr-2" disabled />
                  <label htmlFor="website-yes">Sim</label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="no" id="website-no" className="mr-2" disabled />
                  <label htmlFor="website-no">Não</label>
                </div>
              </RadioGroup>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Se possui Website, informe a URL abaixo:
              </label>
              <input
                type="url"
                placeholder="https://www.exemplo.com"
                className="w-full p-2 border border-gray-300 rounded-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Utiliza Inteligência Artificial como base para o funcionamento do seu negócio?
              </label>
              <RadioGroup defaultValue="no" className="flex space-x-4">
                <div className="flex items-center">
                  <RadioGroupItem value="yes" id="ai-yes" className="mr-2" disabled />
                  <label htmlFor="ai-yes">Sim</label>
                </div>
                <div className="flex items-center">
                  <RadioGroupItem value="no" id="ai-no" className="mr-2" disabled />
                  <label htmlFor="ai-no">Não</label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex justify-between">
              <Link href="/login">
                <Button variant="outline">Voltar</Button>
              </Link>
              <Link href="/termo-de-uso">
                <Button variant="default">Atualizar</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

