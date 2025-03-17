"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FileDown, CheckCircle, FileText, X, Download, CheckSquare, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function EncarregadoDeDados() {
  const [openStep, setOpenStep] = useState<string>("item-1")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const handleCompleteStep1 = () => {
    setOpenStep("item-2")
    setCompletedSteps((prev) => [...prev, "item-1"])
  }

  const handleCompleteStep2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setOpenStep("item-3")
    setCompletedSteps((prev) => [...prev, "item-2"])
  }

  const handlePrintTerm = () => {
    window.print()
  }

  const handleExportTerm = () => {
    // Lógica para exportar o termo (pode ser um PDF, por exemplo)
    console.log("Exportando o termo...")
  }

  const today = new Date().toLocaleDateString("pt-BR")

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-6">Encarregado de Dados</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <Accordion type="single" value={openStep} onValueChange={setOpenStep} className="w-full">
            <AccordionItem value="item-1" className="border rounded-lg mb-4">
              <AccordionTrigger
                className={cn(
                  completedSteps.includes("item-1") && "bg-green-100 text-green-800",
                  "flex items-center justify-between p-4 hover:bg-green-50 transition-colors",
                )}
              >
                <div className="flex items-center">
                  {completedSteps.includes("item-1") && (
                    <div className="mr-2 bg-green-500 rounded-sm p-0.5">
                      <CheckSquare className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span>Passo 1: Cadastrar Encarregado</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <div className="space-y-4">
                  <div className="aspect-w-16 aspect-h-9">
                    <iframe
                      src="https://www.youtube.com/embed/GV3HUDMQ-F8"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <p className="text-sm text-gray-600">
                    Este vídeo explica o papel e as responsabilidades do Encarregado de Dados (DPO) no contexto da Lei
                    Geral de Proteção de Dados (LGPD). Aprenda sobre as principais funções deste profissional e como ele
                    contribui para a conformidade da sua organização.
                  </p>
                  <div className="flex flex-col space-y-4">
                    <Button variant="outline" className="flex items-center justify-center">
                      <FileDown className="mr-2 h-4 w-4" />
                      Download PDF
                    </Button>
                    <Button className="flex items-center justify-center" onClick={handleCompleteStep1}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Concluir Passo
                    </Button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border rounded-lg mb-4">
              <AccordionTrigger
                className={cn(
                  completedSteps.includes("item-2") && "bg-green-100 text-green-800",
                  "flex items-center justify-between p-4 hover:bg-green-50 transition-colors",
                )}
              >
                <div className="flex items-center">
                  {completedSteps.includes("item-2") && (
                    <div className="mr-2 bg-green-500 rounded-sm p-0.5">
                      <CheckSquare className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span>Passo 2: Formulário de Nomeação</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <form className="space-y-4">
                  <Input placeholder="Nome da Empresa" />
                  <Input placeholder="Nome do DPO" />
                  <Input placeholder="Cargo do DPO" />
                  <Input placeholder="Nome do Substituto" />
                  <Input placeholder="Cargo do Substituto" />
                  <Input placeholder="DDD+Telefone" />
                  <Input placeholder="E-mail Empresarial" />
                  <Input placeholder="Nome do Representante da Empresa" />
                  <Input placeholder="Cargo do Representante" />
                  <Input type="date" value={today} readOnly />
                  <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full flex items-center justify-center"
                        variant="outline"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <FileText className="mr-2 h-4 w-4" />
                        Gerar o Termo
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                      <div className="flex justify-center mb-4">
                        <DialogClose asChild>
                          <Button variant="outline" className="flex items-center">
                            <X className="mr-2 h-4 w-4" />
                            Fechar
                          </Button>
                        </DialogClose>
                      </div>
                      <DialogHeader>
                        <DialogTitle>Termo de Nomeação do Encarregado pelo Tratamento de Dados Pessoais</DialogTitle>
                        <DialogDescription>Última atualização: {today}</DialogDescription>
                      </DialogHeader>
                      <div className="prose prose-sm max-w-none">
                        <p>[Nome da Empresa]</p>
                        <p>Considerando:</p>
                        <ul>
                          <li>
                            A Lei nº 13.709, de 14 de agosto de 2018 (Lei Geral de Proteção de Dados Pessoais - LGPD);
                          </li>
                          <li>
                            A Resolução CD/ANPD Nº 18, de 16 de julho de 2024, que aprova o Regulamento sobre a atuação
                            do Encarregado pelo Tratamento de Dados Pessoais (DPO);
                          </li>
                        </ul>
                        <p>Resolve:</p>

                        <h2>Art. 1º - Nomeação do Encarregado</h2>
                        <p>
                          Fica nomeado(a) [Nome do DPO], [Cargo do DPO], como Encarregado(a) pelo Tratamento de Dados
                          Pessoais (DPO) da [Nome da Empresa], doravante denominado(a) "Encarregado(a)".
                        </p>

                        <h2>Art. 2º - Atribuições do Encarregado</h2>
                        <ul>
                          <li>
                            Aceitar reclamações e comunicações dos titulares de dados, prestar esclarecimentos e adotar
                            providências cabíveis;
                          </li>
                          <li>
                            Receber comunicações da Autoridade Nacional de Proteção de Dados (ANPD) e adotar
                            providências;
                          </li>
                          <li>Orientar funcionários e contratados sobre práticas de proteção de dados pessoais;</li>
                          <li>Executar demais atribuições conforme normas aplicáveis.</li>
                        </ul>

                        <h2>Art. 3º - Formalização da Nomeação</h2>
                        <p>
                          A indicação do Encarregado(a) é formalizada por este documento escrito, datado e assinado,
                          evidenciando a designação oficial.
                        </p>

                        <h2>Art. 4º - Substituto do Encarregado</h2>
                        <p>Nome do Substituto(a): [Nome do Substituto]</p>
                        <p>Cargo: [Cargo do Substituto]</p>
                        <p>Informações de Contato: [E-mail, Telefone]</p>

                        <h2>Art. 5º - Divulgação das Informações do Encarregado</h2>
                        <p>
                          As informações do Encarregado(a) serão publicadas no sítio eletrônico da empresa e comunicadas
                          à ANPD conforme necessário.
                        </p>

                        <h2>Art. 6º - Responsabilidades da Empresa</h2>
                        <ul>
                          <li>Prover os recursos necessários para a atuação do Encarregado(a);</li>
                          <li>Garantir autonomia técnica para a execução das atividades;</li>
                          <li>Viabilizar comunicação eficaz com titulares de dados e ANPD.</li>
                        </ul>

                        <h2>Art. 7º - Declarações do Encarregado</h2>
                        <ul>
                          <li>Possuir qualificações necessárias para a função;</li>
                          <li>Comunicar-se com titulares e ANPD de forma clara e precisa;</li>
                          <li>Atuar com ética, integridade e evitar conflitos de interesse.</li>
                        </ul>

                        <h2>Art. 8º - Assinatura Digital e Validade</h2>
                        <p>
                          Este termo poderá ser assinado digitalmente utilizando plataformas certificadas, garantindo
                          sua autenticidade.
                        </p>

                        <h2>Art. 9º - Vigência</h2>
                        <p>Este termo entra em vigor na data de sua assinatura.</p>

                        <h2>Assinaturas</h2>
                        <p>Nome do Encarregado(a): [Nome do DPO]</p>
                        <p>Cargo: [Cargo do DPO]</p>
                        <p>Informações de Contato: [E-mail, Telefone]</p>

                        <p>Assinatura:</p>
                        <p>[Nome do Encarregado(a)] - [Data]</p>
                        <p>[Nome do Representante da Empresa] - [Cargo] - [Data]</p>
                      </div>
                      <div className="flex justify-center mt-6">
                        <Button className="flex items-center" onClick={handleExportTerm}>
                          <Download className="mr-2 h-4 w-4" />
                          Exportar Termo de Nomeação
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    className="w-full flex items-center justify-center"
                    onClick={handleCompleteStep2}
                    type="button"
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Concluir Passo
                  </Button>
                </form>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border rounded-lg mb-4">
              <AccordionTrigger
                className={cn(
                  completedSteps.includes("item-3") && "bg-green-100 text-green-800",
                  "flex items-center justify-between p-4 hover:bg-green-50 transition-colors",
                )}
              >
                <div className="flex items-center">
                  {completedSteps.includes("item-3") && (
                    <div className="mr-2 bg-green-500 rounded-sm p-0.5">
                      <CheckSquare className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <span>Passo 3: Cadastrar na ANPD</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-4">
                <h3 className="text-lg font-semibold mb-4">
                  MANUAL DE PROCESSO PARA REGISTRO DO ENCARREGADO DE DADOS NA ANPD
                </h3>
                <p className="mb-4">
                  Objetivo: Orientar de forma simplificada como realizar o registro do Encarregado de Dados (DPO) na
                  Autoridade Nacional de Proteção de Dados (ANPD).
                </p>

                <h4 className="text-md font-semibold mb-2">Passos para o Cadastro no SEI da ANPD</h4>

                <ol className="list-decimal list-inside space-y-4 mb-4">
                  <li>
                    <strong>Cadastro como Usuário Externo:</strong>
                    <ul className="list-disc list-inside ml-4 mt-2">
                      <li>Acesse o site do Sistema Eletrônico de Informações (SEI) da ANPD.</li>
                      <li>Clique no link "Login Usuário Externo" e selecione a opção "Cadastrar".</li>
                      <li>Preencha o formulário com os dados solicitados (CPF, nome, e-mail, etc.).</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Envio de Documentação:</strong>
                    <ul className="list-disc list-inside ml-4 mt-2">
                      <li>Digitalize o Termo de Declaração de Concordância e Veracidade preenchido e assinado.</li>
                      <li>
                        Escolha um dos seguintes métodos para assinatura:
                        <ul className="list-disc list-inside ml-8">
                          <li>Assinatura eletrônica pelo portal gov.br. (RECOMENDADO)</li>
                          <li>Certificado Digital ICP-Brasil.</li>
                          <li>Assinatura manual acompanhada de cópia de documento oficial com foto.</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <strong>Envio por E-mail:</strong>
                    <ul className="list-disc list-inside ml-4 mt-2">
                      <li>Envie os documentos digitalizados para o endereço protocolo@anpd.gov.br.</li>
                      <li>Certifique-se de enviar os arquivos em formato PDF e sem alterações após a assinatura.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Acompanhamento:</strong>
                    <ul className="list-disc list-inside ml-4 mt-2">
                      <li>Aguarde o prazo de até 3 dias úteis para a validação do cadastro.</li>
                      <li>Acompanhe a liberação do cadastro pelo e-mail informado.</li>
                    </ul>
                  </li>
                </ol>

                <h4 className="text-md font-semibold mb-2">Registro do Encarregado de Dados</h4>
                <p className="mb-2">Após concluir o cadastro de Usuário Externo:</p>
                <ol className="list-decimal list-inside space-y-2 mb-4">
                  <li>Acesse o sistema SEI da ANPD com seu login.</li>
                  <li>Utilize o formulário eletrônico específico para o registro do Encarregado.</li>
                  <li>
                    Insira as informações solicitadas:
                    <ul className="list-disc list-inside ml-4 mt-2">
                      <li>Nome completo e contato do DPO.</li>
                      <li>Descrição das responsabilidades e vínculo com a empresa.</li>
                      <li>Canais de contato para o público.</li>
                    </ul>
                  </li>
                  <li>Realize o envio pelo sistema para formalizar o processo.</li>
                </ol>

                <h4 className="text-md font-semibold mb-2">Benefícios do Registro no SEI:</h4>
                <ul className="list-disc list-inside mb-4">
                  <li>Comunicação oficial com a ANPD.</li>
                  <li>Regularização da empresa conforme exigências da LGPD.</li>
                  <li>Acompanhamento de processos e consultas de titulares com maior segurança.</li>
                </ul>

                <p className="mb-4">
                  Esse manual foi preparado para simplificar o entendimento e facilitar o cumprimento das exigências
                  legais para o registro do Encarregado de Dados.
                </p>

                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setOpenStep("item-2")}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
                  </Button>
                  <Button
                    onClick={() => {
                      setCompletedSteps((prev) => [...prev, "item-3"])
                      setOpenStep("")
                    }}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" /> Concluir Passo
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="mt-6">
            <Link href="/trilha-de-conformidade">
              <Button variant="outline" className="w-full">
                Retornar para Trilha
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

