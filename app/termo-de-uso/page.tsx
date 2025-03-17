"use client"

import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function TermoDeUso() {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-6">Termos de Uso</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="prose prose-sm max-w-none mb-6">
            <h2 className="text-2xl font-bold mb-4">Termos de Uso - Nome do App de Compliance</h2>
            <p className="text-sm text-gray-600 mb-4">Última atualização: Data</p>

            <p>
              Nome da sua empresa, inscrita no CNPJ número, com sede em endereço, doravante denominada "CONTRATADA",
              estabelece os presentes Termos de Uso para o licenciamento e utilização de seu aplicativo de compliance,
              denominado Nome do App, pelos usuários, doravante denominados "CONTRATANTE" ou "CLIENTE". Ao aderir
              eletronicamente ao presente termo, o CLIENTE aceita integralmente as condições estabelecidas, obrigando-se
              a cumpri-las. Caso não concorde, deve cessar imediatamente o uso do aplicativo.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">CLÁUSULA I – DO OBJETO</h3>
            <p>
              1.1. Este termo tem por objeto o licenciamento não exclusivo, intransferível e revogável para o uso do
              Nome do App, desenvolvido para fornecer ferramentas de gestão de compliance, incluindo adequação à LGPD,
              GDPR e outros regulamentos aplicáveis.
            </p>
            <p>
              1.2. O licenciamento inclui o acesso à plataforma na versão contratada, conforme especificado no
              formulário eletrônico de contratação.
            </p>
            <p>
              1.3. A utilização do serviço está sujeita aos limites definidos no plano contratado, incluindo
              armazenamento, número de usuários e funcionalidades.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">CLÁUSULA II – CONDIÇÕES DE USO</h3>
            <p>
              2.1. O acesso ao Nome do App é fornecido exclusivamente na modalidade SaaS (Software as a Service) e opera
              em ambiente de nuvem.
            </p>
            <p>
              2.2. O CLIENTE compromete-se a utilizar o aplicativo apenas para fins lícitos e em conformidade com as
              legislações aplicáveis, incluindo a LGPD.
            </p>
            <p>2.3. O uso da plataforma é condicionado à confirmação do pagamento conforme o plano escolhido.</p>
            <p>
              2.4. A responsabilidade pelo gerenciamento de acessos e permissões internas é exclusivamente do CLIENTE.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">CLÁUSULA III – PAGAMENTOS</h3>
            <p>
              3.1. O CLIENTE deve realizar o pagamento do plano contratado conforme valores definidos no formulário de
              contratação.
            </p>
            <p>
              3.2. Em caso de inadimplência superior a X dias, os serviços poderão ser suspensos sem prejuízo da
              cobrança de valores devidos.
            </p>
            <p>
              3.3. Os valores podem ser reajustados anualmente, com aviso prévio de 30 dias, conforme índice oficial
              aplicável.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">CLÁUSULA IV – SUPORTE E ATUALIZAÇÕES</h3>
            <p>
              4.1. O suporte técnico é oferecido exclusivamente por meio eletrônico (e-mail ou chat interno) e durante o
              horário comercial.
            </p>
            <p>
              4.2. Atualizações do sistema serão realizadas automaticamente e poderão incluir melhorias, correções e
              novas funcionalidades, sem necessidade de aviso prévio.
            </p>
            <p>
              4.3. Chamados de suporte terão prazo de resposta de até X horas úteis, dependendo do plano contratado.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">CLÁUSULA V – RESPONSABILIDADES DO CLIENTE</h3>
            <p>
              5.1. Garantir a precisão dos dados inseridos na plataforma e adotar medidas internas para proteger
              credenciais de acesso.
            </p>
            <p>5.2. Informar à CONTRATADA qualquer irregularidade observada na utilização da plataforma.</p>
            <p>
              5.3. Responder por quaisquer danos decorrentes do uso inadequado da plataforma por seus colaboradores.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">CLÁUSULA VI – SIGILO E CONFIDENCIALIDADE</h3>
            <p>
              6.1. A CONTRATADA compromete-se a proteger as informações armazenadas na plataforma, adotando medidas
              técnicas e organizacionais adequadas.
            </p>
            <p>
              6.2. É vedado à CONTRATADA acessar ou compartilhar dados do CLIENTE sem autorização prévia, exceto quando
              exigido por lei.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-2">CLÁUSULA VII – RESCISÃO</h3>
            <p>7.1. Este contrato poderá ser rescindido por qualquer das partes mediante aviso prévio de X dias.</p>
            <p>
              7.2. Em caso de cancelamento, os dados do CLIENTE permanecerão disponíveis para exportação por até X dias
              após o término do contrato.
            </p>
            <p>7.3. A CONTRATADA poderá encerrar o contrato unilateralmente em caso de violação destes Termos.</p>

            <h3 className="text-xl font-semibold mt-6 mb-2">CLÁUSULA VIII – FORO E LEGISLAÇÃO APLICÁVEL</h3>
            <p>8.1. Este termo é regido pelas leis brasileiras.</p>
            <p>
              8.2. As partes elegem o foro da Comarca de Cidade/Estado para dirimir quaisquer litígios oriundos deste
              contrato.
            </p>
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <Checkbox id="terms" checked={isChecked} onCheckedChange={setIsChecked} />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Li e aceito todos as condições do termo acima
            </label>
          </div>

          <div className="flex justify-between">
            <Link href="/configurar-perfil">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
              </Button>
            </Link>
            <Link href="/trilha-de-conformidade">
              <Button variant="default" disabled={!isChecked}>
                Eu Aceito
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

