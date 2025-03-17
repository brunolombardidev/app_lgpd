"use client"

import { useState } from "react"
import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronUp, AlertTriangle, CheckCircle, Clock } from "lucide-react"

// Importar as mesmas questões do diagnóstico
const questions = [
  {
    id: 1,
    text: "Há um responsável designado para a proteção de dados (Encarregado de dados - DPO)?",
    category: "controles-organizacao",
  },
  { id: 2, text: "Existe uma política de privacidade acessível ao público?", category: "controles-organizacao" },
  { id: 3, text: "As normas de LGPD são conhecidas e aplicadas pela alta direção?", category: "controles-organizacao" },
  {
    id: 4,
    text: "Há uma definição clara de responsabilidades entre controlador e operador de dados?",
    category: "controles-organizacao",
  },
  {
    id: 5,
    text: "A startup possui medidas para evitar conflitos de interesse na proteção de dados?",
    category: "controles-organizacao",
  },
  {
    id: 6,
    text: "A startup possui um código de conduta ética relacionado a dados pessoais?",
    category: "controles-organizacao",
  },
  {
    id: 7,
    text: "Os contratos com fornecedores incluem cláusulas de proteção de dados?",
    category: "controles-organizacao",
  },
  {
    id: 8,
    text: "Os contratos com colaboradores CLT e PJ incluem cláusulas de proteção de dados?",
    category: "controles-organizacao",
  },
  {
    id: 9,
    text: "O mapeamento de processos envolvendo dados foi realizado e/ou está atualizado?",
    category: "controles-organizacao",
  },
  { id: 10, text: "Há uma política de retenção e descarte de dados pessoais?", category: "controles-organizacao" },
  {
    id: 11,
    text: "A empresa realiza análises de impacto à proteção de dados (DPIA)?",
    category: "controles-organizacao",
  },
  {
    id: 12,
    text: "Existe um Portal de Privacidade no site (ou outro meio) para atender solicitações de titulares de dados e para fins de requisição?",
    category: "controles-organizacao",
  },
  {
    id: 13,
    text: "A startup possui políticas de segurança da informação documentadas?",
    category: "controles-organizacao",
  },
  { id: 14, text: "Existe um plano de continuidade de negócios?", category: "controles-organizacao" },
  { id: 15, text: "A empresa realiza auditorias regulares de conformidade?", category: "controles-organizacao" },
  {
    id: 16,
    text: "Todos os funcionários receberam treinamento sobre proteção de dados?",
    category: "controles-pessoas",
  },
  {
    id: 17,
    text: "Existem procedimentos claros para onboarding e offboarding de colaboradores?",
    category: "controles-pessoas",
  },
  {
    id: 18,
    text: "Os acessos de funcionários a sistemas críticos são baseados em perfil de trabalho?",
    category: "controles-pessoas",
  },
  { id: 19, text: "Existe um controle de acessos para dados sensíveis?", category: "controles-pessoas" },
  { id: 20, text: "Há uma política de senha para os colaboradores?", category: "controles-pessoas" },
  {
    id: 21,
    text: "Os funcionários sabem identificar e reportar incidentes de segurança?",
    category: "controles-pessoas",
  },
  {
    id: 22,
    text: "Há campanhas regulares de conscientização sobre privacidade e segurança?",
    category: "controles-pessoas",
  },
  { id: 23, text: "Existe uma política de sanções para violações de segurança?", category: "controles-pessoas" },
  {
    id: 24,
    text: "Os dispositivos fornecidos pela empresa possuem configuração de segurança padrão?",
    category: "controles-organizacao",
  },
  { id: 25, text: "O trabalho remoto é regulamentado por políticas de segurança?", category: "controles-organizacao" },
  {
    id: 26,
    text: "Existe um canal confidencial para que colaboradores relatem problemas?",
    category: "controles-pessoas",
  },
  { id: 27, text: "A equipe conhece os riscos associados a compartilhamento de dados?", category: "controles-pessoas" },
  {
    id: 28,
    text: "Há restrições para uso de dispositivos pessoais em ambientes corporativos?",
    category: "controles-pessoas",
  },
  {
    id: 29,
    text: "Os acessos a sistemas são revogados imediatamente após a saída de colaboradores?",
    category: "controles-pessoas",
  },
  { id: 30, text: "As equipes responsáveis por dados têm supervisão adequada?", category: "controles-pessoas" },
  {
    id: 31,
    text: "A empresa utiliza criptografia para proteção de dados em repouso e em trânsito?",
    category: "controles-tecnologicos",
  },
  { id: 32, text: "Existe um sistema de backup regular?", category: "controles-tecnologicos" },
  {
    id: 33,
    text: "Os sistemas estão protegidos contra ataques de malware e ransomware?",
    category: "controles-tecnologicos",
  },
  { id: 34, text: "Há um plano documentado de resposta a incidentes?", category: "controles-tecnologicos" },
  { id: 35, text: "Os sistemas possuem logs de acesso e atividades?", category: "controles-tecnologicos" },
  { id: 36, text: "A empresa realiza testes de vulnerabilidade regularmente?", category: "controles-tecnologicos" },
  {
    id: 37,
    text: "Existe segregação de ambientes (produção, desenvolvimento, testes)?",
    category: "controles-tecnologicos",
  },
  { id: 38, text: "As APIs utilizadas possuem autenticação segura?", category: "controles-tecnologicos" },
  {
    id: 39,
    text: "Os sistemas críticos são atualizados regularmente com patches de segurança?",
    category: "controles-tecnologicos",
  },
  { id: 40, text: "Existe controle de acesso por autenticação multifator (MFA)?", category: "controles-tecnologicos" },
  {
    id: 41,
    text: "A startup monitora o tráfego de rede para detectar comportamentos anômalos?",
    category: "controles-tecnologicos",
  },
  { id: 42, text: "Os dados pessoais são pseudonimizados ou anonimizados?", category: "controles-tecnologicos" },
  { id: 43, text: "Existem restrições de acesso físico a servidores e dispositivos?", category: "controles-fisicos" },
  {
    id: 44,
    text: "Os dispositivos móveis utilizados têm gerenciamento de segurança centralizado?",
    category: "controles-tecnologicos",
  },
  { id: 45, text: "O local de trabalho possui restrições de acesso físico?", category: "controles-tecnologicos" },
  { id: 46, text: "Existe controle de acesso por crachás ou biometria?", category: "controles-fisicos" },
  {
    id: 47,
    text: "As estações de trabalho estão configuradas para bloquear automaticamente após inatividade?",
    category: "controles-fisicos",
  },
  { id: 48, text: "Há monitoramento por câmeras de segurança nas áreas críticas?", category: "controles-fisicos" },
  {
    id: 49,
    text: "Os servidores em nuvem têm MFA (autenticação multifatorial), criptografia e acesso restrito (controle de acesso - IAM)?",
    category: "controles-fisicos",
  },
  { id: 50, text: "Existe uma política de limpeza de mesa (clean desk)?", category: "controles-tecnologicos" },
  {
    id: 51,
    text: "Os documentos físicos com dados pessoais são armazenados em armários trancados e com acesso restrito?",
    category: "controles-fisicos",
  },
  { id: 52, text: "Existe um controle de visitantes que acessam áreas restritas?", category: "controles-tecnologicos" },
  { id: 53, text: "O descarte de documentos físicos segue normas de segurança?", category: "controles-tecnologicos" },
  { id: 54, text: "O ambiente possui proteção contra incêndios e desastres naturais?", category: "controles-fisicos" },
  {
    id: 55,
    text: "As áreas de trabalho possuem controle de acesso visual (confidencialidade de telas)?",
    category: "controles-fisicos",
  },
  { id: 56, text: "Equipamentos antigos são descartados com segurança de dados?", category: "controles-fisicos" },
  { id: 57, text: "Há inspeções regulares para identificar vulnerabilidades físicas?", category: "controles-fisicos" },
  { id: 58, text: "O acesso aos dispositivos compartilhados é monitorado?", category: "controles-organizacao" },
  { id: 59, text: "Existe um plano de evacuação para situações de emergência?", category: "controles-organizacao" },
  {
    id: 60,
    text: "Os dispositivos móveis utilizados têm gerenciamento de segurança centralizado?",
    category: "controles-organizacao",
  },
  {
    id: 61,
    text: "Sua organização possui um responsável designado (DPO ou outro) para supervisionar e garantir o uso ético e responsável das ferramentas de IA? (Governança IA)",
    category: "controles-ia",
  },
  {
    id: 62,
    text: "Todos os casos de uso de IA estão devidamente documentados, incluindo o propósito, impacto esperado e riscos associados ao uso da tecnologia? (Documentação de Casos de Uso)",
    category: "controles-ia",
  },
  {
    id: 63,
    text: "Existe um mapeamento claro de como os dados entram, são processados e saem de cada ferramenta de IA utilizada, garantindo a rastreabilidade e conformidade com normas como a LGPD? (Fluxo de Dados)",
    category: "controles-ia",
  },
  {
    id: 64,
    text: "Quais mecanismos estão implementados para identificar e mitigar riscos associados ao uso de ferramentas de IA não autorizadas pelos colaboradores? (Shadow AI)",
    category: "controles-ia",
  },
  {
    id: 65,
    text: "Com que frequência os sistemas e algoritmos de IA são avaliados para garantir sua conformidade contínua com políticas internas e regulamentos externos? (Atualização e Conformidade)",
    category: "controles-ia",
  },
  {
    id: 66,
    text: "As ferramentas de IA da organização possuem políticas robustas de acesso, incluindo autenticação multifator e segregação de perfis de acesso para evitar vazamento de informações sensíveis? (Controle de Acesso)",
    category: "controles-ia",
  },
  {
    id: 67,
    text: "Os modelos de IA utilizados pela organização são documentados de forma que permitam a explicação de decisões automáticas para clientes, colaboradores ou órgãos reguladores? (Transparência Algorítmica)",
    category: "controles-ia",
  },
  {
    id: 68,
    text: "A organização realiza auditorias para identificar e mitigar vieses nos dados de treinamento ou nos resultados produzidos pelos modelos de IA? (Tendências e Viés)",
    category: "controles-ia",
  },
  {
    id: 69,
    text: "Existe um processo estruturado para identificar e mitigar riscos emergentes associados ao uso de IA, como mudanças regulatórias ou impactos éticos? (Gerenciamento de Risco)",
    category: "controles-ia",
  },
  {
    id: 70,
    text: "Há um programa contínuo de capacitação dos colaboradores sobre os riscos, benefícios e limitações do uso de IA, incluindo sua aplicação responsável? (Educação e Conscientização)",
    category: "controles-ia",
  },
  {
    id: 71,
    text: "As políticas de uso de IA detalham onde, quando e como a IA pode ser utilizada, além de limites claros para evitar uso indevido ou excessivo? (Políticas de Uso)",
    category: "controles-ia",
  },
  {
    id: 72,
    text: "A organização possui um plano de resposta a incidentes específico para IA, caso ocorra um comportamento inesperado, vazamento de dados ou falha nos sistemas? (Monitoramento e Respostas a Incidentes)",
    category: "controles-ia",
  },
]

// Distribuição exata de 72 itens entre os níveis de risco e impacto
const quantidades = {
  "Muito Alto": {
    "90%": 5,
    "70%": 4,
    "50%": 3,
    "30%": 2,
    "10%": 1,
  },
  Alto: {
    "90%": 4,
    "70%": 5,
    "50%": 4,
    "30%": 3,
    "10%": 2,
  },
  Moderado: {
    "90%": 3,
    "70%": 4,
    "50%": 6,
    "30%": 4,
    "10%": 3,
  },
  Baixo: {
    "90%": 2,
    "70%": 3,
    "50%": 4,
    "30%": 5,
    "10%": 4,
  },
  "Muito Baixo": {
    "90%": 1,
    "70%": 2,
    "50%": 3,
    "30%": 4,
    "10%": 5,
  },
}

// Modificar a função gerarDistribuicaoAleatoria para ordenar os números dentro de cada categoria
const gerarDistribuicaoAleatoria = () => {
  // Criar um array com números de 1 a 72
  const numeros = Array.from({ length: 72 }, (_, i) => i + 1)

  // Embaralhar o array (algoritmo Fisher-Yates)
  for (let i = numeros.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[numeros[i], numeros[j]] = [numeros[j], numeros[i]]
  }

  // Estrutura para armazenar a distribuição
  const distribuicao = {
    "Muito Alto": {
      "90%": [],
      "70%": [],
      "50%": [],
      "30%": [],
      "10%": [],
    },
    Alto: {
      "90%": [],
      "70%": [],
      "50%": [],
      "30%": [],
      "10%": [],
    },
    Moderado: {
      "90%": [],
      "70%": [],
      "50%": [],
      "30%": [],
      "10%": [],
    },
    Baixo: {
      "90%": [],
      "70%": [],
      "50%": [],
      "30%": [],
      "10%": [],
    },
    "Muito Baixo": {
      "90%": [],
      "70%": [],
      "50%": [],
      "30%": [],
      "10%": [],
    },
  }

  // Índice para acompanhar a posição atual no array embaralhado
  let indice = 0

  // Distribuir os números entre os níveis
  Object.keys(quantidades).forEach((nivel) => {
    Object.keys(quantidades[nivel]).forEach((impacto) => {
      const quantidade = quantidades[nivel][impacto]
      for (let i = 0; i < quantidade; i++) {
        if (indice < numeros.length) {
          distribuicao[nivel][impacto].push(numeros[indice])
          indice++
        }
      }
    })
  })

  // Ordenar os números dentro de cada categoria de impacto
  Object.keys(distribuicao).forEach((nivel) => {
    Object.keys(distribuicao[nivel]).forEach((impacto) => {
      distribuicao[nivel][impacto].sort((a, b) => a - b)
    })
  })

  return distribuicao
}

// Gerar a distribuição aleatória
const distribuicaoRiscos = gerarDistribuicaoAleatoria()

// Cores para cada nível de risco
const coresRisco = {
  "Muito Alto": "bg-red-600 text-white",
  Alto: "bg-orange-500 text-white",
  Moderado: "bg-yellow-500 text-black",
  Baixo: "bg-green-500 text-white",
  "Muito Baixo": "bg-blue-500 text-white",
}

// Cores para cada nível de impacto
const coresImpacto = {
  "90%": "bg-red-100 border-red-300 text-red-800",
  "70%": "bg-orange-100 border-orange-300 text-orange-800",
  "50%": "bg-yellow-100 border-yellow-300 text-yellow-800",
  "30%": "bg-green-100 border-green-300 text-green-800",
  "10%": "bg-blue-100 border-blue-300 text-blue-800",
}

// Status de implementação
const statusImplementacao = {
  "Não iniciado": {
    icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
    class: "text-red-500",
  },
  "Em andamento": {
    icon: <Clock className="h-5 w-5 text-amber-500" />,
    class: "text-amber-500",
  },
  Concluído: {
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
    class: "text-green-500",
  },
}

// Gerar status aleatório para cada questão
const gerarStatusAleatorio = () => {
  const status = Object.keys(statusImplementacao)
  return status[Math.floor(Math.random() * status.length)]
}

// Gerar responsáveis aleatórios
const responsaveis = [
  "João Silva (TI)",
  "Maria Oliveira (Jurídico)",
  "Carlos Santos (Compliance)",
  "Ana Souza (RH)",
  "Pedro Costa (Segurança)",
  "Juliana Lima (DPO)",
]

const gerarResponsavelAleatorio = () => {
  return responsaveis[Math.floor(Math.random() * responsaveis.length)]
}

// Gerar datas aleatórias para prazos (entre hoje e 6 meses no futuro)
const gerarPrazoAleatorio = () => {
  const hoje = new Date()
  const prazoMaximo = new Date()
  prazoMaximo.setMonth(hoje.getMonth() + 6)

  const prazo = new Date(hoje.getTime() + Math.random() * (prazoMaximo.getTime() - hoje.getTime()))
  return prazo.toLocaleDateString("pt-BR")
}

export default function PlanoDeAcao() {
  const [filtroRisco, setFiltroRisco] = useState("todos")
  const [filtroImpacto, setFiltroImpacto] = useState("todos")
  const [filtroStatus, setFiltroStatus] = useState("todos")
  const [filtroCategoria, setFiltroCategoria] = useState("todos")
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  // Função para expandir ou recolher todos os itens
  const toggleAllItems = (expand: boolean) => {
    if (expand) {
      // Coletar todos os IDs de itens visíveis
      const visibleItems: string[] = []
      Object.keys(distribuicaoRiscos).forEach((nivel) => {
        if (filtroRisco === "todos" || filtroRisco === nivel) {
          Object.keys(distribuicaoRiscos[nivel]).forEach((impacto) => {
            if (filtroImpacto === "todos" || filtroImpacto === impacto) {
              distribuicaoRiscos[nivel][impacto].forEach((id) => {
                const question = questions.find((q) => q.id === id)
                if (question && (filtroCategoria === "todos" || question.category === filtroCategoria)) {
                  visibleItems.push(`item-${nivel}-${impacto}-${id}`)
                }
              })
            }
          })
        }
      })
      setExpandedItems(visibleItems)
    } else {
      setExpandedItems([])
    }
  }

  // Obter questão pelo ID
  const getQuestionById = (id: number) => {
    return questions.find((q) => q.id === id) || { id: 0, text: "Questão não encontrada", category: "" }
  }

  // Verificar se um item deve ser exibido com base nos filtros
  const shouldShowItem = (nivel: string, impacto: string, questionId: number) => {
    if (filtroRisco !== "todos" && filtroRisco !== nivel) return false
    if (filtroImpacto !== "todos" && filtroImpacto !== impacto) return false

    const question = getQuestionById(questionId)
    if (filtroCategoria !== "todos" && question.category !== filtroCategoria) return false

    // Simulando filtro por status (usando o ID da questão para gerar um status consistente)
    const statusIndex = questionId % 3
    const status = Object.keys(statusImplementacao)[statusIndex]
    if (filtroStatus !== "todos" && filtroStatus !== status) return false

    return true
  }

  // Contar itens visíveis
  const countVisibleItems = () => {
    let count = 0
    Object.keys(distribuicaoRiscos).forEach((nivel) => {
      Object.keys(distribuicaoRiscos[nivel]).forEach((impacto) => {
        distribuicaoRiscos[nivel][impacto].forEach((id) => {
          if (shouldShowItem(nivel, impacto, id)) {
            count++
          }
        })
      })
    })
    return count
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-2">Plano de Ação LGPD</h1>
        <p className="text-center text-gray-600 mb-6">
          Acompanhe e gerencie as ações necessárias para conformidade com a LGPD.
        </p>

        {/* Filtros */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <h2 className="text-lg font-semibold mb-3">Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex space-x-3">
              <Select value={filtroRisco} onValueChange={setFiltroRisco} className="flex-1">
                <SelectTrigger>
                  <SelectValue placeholder="Nível de Risco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os níveis</SelectItem>
                  <SelectItem value="Muito Alto">Muito Alto</SelectItem>
                  <SelectItem value="Alto">Alto</SelectItem>
                  <SelectItem value="Moderado">Moderado</SelectItem>
                  <SelectItem value="Baixo">Baixo</SelectItem>
                  <SelectItem value="Muito Baixo">Muito Baixo</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroImpacto} onValueChange={setFiltroImpacto} className="flex-1">
                <SelectTrigger>
                  <SelectValue placeholder="Impacto" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os impactos</SelectItem>
                  <SelectItem value="90%">90%</SelectItem>
                  <SelectItem value="70%">70%</SelectItem>
                  <SelectItem value="50%">50%</SelectItem>
                  <SelectItem value="30%">30%</SelectItem>
                  <SelectItem value="10%">10%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex space-x-3">
              <Select value={filtroStatus} onValueChange={setFiltroStatus} className="flex-1">
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="Não iniciado">Não iniciado</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Concluído">Concluído</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filtroCategoria} onValueChange={setFiltroCategoria} className="flex-1">
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todas as categorias</SelectItem>
                  <SelectItem value="controles-organizacao">Controles da Organização</SelectItem>
                  <SelectItem value="controles-pessoas">Controles de Pessoas</SelectItem>
                  <SelectItem value="controles-tecnologicos">Controles Tecnológicos</SelectItem>
                  <SelectItem value="controles-fisicos">Controles Físicos</SelectItem>
                  <SelectItem value="controles-ia">Controles de IA</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-between mt-3">
            <p className="text-sm text-gray-600">Exibindo {countVisibleItems()} de 72 itens</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => toggleAllItems(true)} className="flex items-center">
                <ChevronDown className="h-4 w-4 mr-1" /> Expandir Todos
              </Button>
              <Button variant="outline" size="sm" onClick={() => toggleAllItems(false)} className="flex items-center">
                <ChevronUp className="h-4 w-4 mr-1" /> Recolher Todos
              </Button>
            </div>
          </div>
        </div>

        {/* Plano de Ação - Organizado por Nível de Risco */}
        {Object.keys(distribuicaoRiscos).map((nivel) => {
          // Verificar se há itens visíveis neste nível
          const hasVisibleItems = Object.keys(distribuicaoRiscos[nivel]).some((impacto) =>
            distribuicaoRiscos[nivel][impacto].some((id) => shouldShowItem(nivel, impacto, id)),
          )

          if (!hasVisibleItems) return null

          return (
            <div key={nivel} className="mb-8">
              <h2 className={`text-lg font-semibold p-3 rounded-t-lg ${coresRisco[nivel]}`}>Nível de Risco: {nivel}</h2>

              {/* Seções de Impacto */}
              {Object.keys(distribuicaoRiscos[nivel]).map((impacto) => {
                // Verificar se há itens visíveis neste impacto
                const impactoItems = distribuicaoRiscos[nivel][impacto].filter((id) =>
                  shouldShowItem(nivel, impacto, id),
                )

                if (impactoItems.length === 0) return null

                return (
                  <div key={`${nivel}-${impacto}`} className="mb-6 border rounded-b-lg">
                    <h3 className={`p-2 font-medium ${coresImpacto[impacto]}`}>
                      Impacto: {impacto} ({impactoItems.length} {impactoItems.length === 1 ? "item" : "itens"})
                    </h3>

                    {/* Itens de Ação (Accordion) */}
                    <Accordion
                      type="multiple"
                      value={expandedItems}
                      onValueChange={setExpandedItems}
                      className="px-2 py-1"
                    >
                      {impactoItems.map((id) => {
                        const question = getQuestionById(id)
                        const itemId = `item-${nivel}-${impacto}-${id}`

                        // Gerar dados consistentes baseados no ID da questão
                        const statusIndex = id % 3
                        const status = Object.keys(statusImplementacao)[statusIndex]
                        const responsavel = responsaveis[id % responsaveis.length]
                        const prazo = gerarPrazoAleatorio()

                        return (
                          <AccordionItem key={itemId} value={itemId} className="border-b py-2">
                            <AccordionTrigger className="hover:bg-gray-50 px-2 rounded-md">
                              <div className="flex items-center text-left">
                                <span className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-medium mr-3">
                                  {id}
                                </span>
                                <div className="flex-1 mr-2 text-sm">{question.text}</div>
                                <div className={`flex items-center ${statusImplementacao[status].class} ml-2`}>
                                  {statusImplementacao[status].icon}
                                  <span className="ml-1 text-xs hidden sm:inline">{status}</span>
                                </div>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent className="px-4 py-2 bg-gray-50 rounded-md">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h4 className="text-sm font-semibold mb-2">Detalhes da Ação</h4>
                                  <p className="text-sm mb-2">
                                    <span className="font-medium">Categoria:</span>{" "}
                                    {question.category === "controles-organizacao" && "Controles da Organização"}
                                    {question.category === "controles-pessoas" && "Controles de Pessoas"}
                                    {question.category === "controles-tecnologicos" && "Controles Tecnológicos"}
                                    {question.category === "controles-fisicos" && "Controles Físicos"}
                                    {question.category === "controles-ia" && "Controles de IA"}
                                  </p>
                                  <p className="text-sm mb-2">
                                    <span className="font-medium">Nível de Risco:</span> {nivel}
                                  </p>
                                  <p className="text-sm mb-2">
                                    <span className="font-medium">Impacto:</span> {impacto}
                                  </p>
                                  <p className="text-sm mb-4">
                                    <span className="font-medium">Status:</span>{" "}
                                    <span className={statusImplementacao[status].class}>
                                      {statusImplementacao[status].icon} <span className="ml-1">{status}</span>
                                    </span>
                                  </p>
                                </div>

                                <div>
                                  <h4 className="text-sm font-semibold mb-2">Responsabilidades</h4>
                                  <p className="text-sm mb-2">
                                    <span className="font-medium">Responsável:</span> {responsavel}
                                  </p>
                                  <p className="text-sm mb-2">
                                    <span className="font-medium">Prazo:</span> {prazo}
                                  </p>
                                  <p className="text-sm mb-2">
                                    <span className="font-medium">Última atualização:</span>{" "}
                                    {new Date().toLocaleDateString("pt-BR")}
                                  </p>
                                </div>
                              </div>

                              <div className="mt-4">
                                <h4 className="text-sm font-semibold mb-2">Ações Recomendadas</h4>
                                <ul className="list-disc list-inside text-sm space-y-1">
                                  <li>Realizar levantamento da situação atual</li>
                                  <li>Desenvolver política ou procedimento específico</li>
                                  <li>Implementar controles técnicos necessários</li>
                                  <li>Treinar equipes envolvidas</li>
                                  <li>Documentar evidências de conformidade</li>
                                </ul>
                              </div>

                              <div className="mt-4 flex justify-end space-x-2">
                                <Button size="sm" variant="outline">
                                  Editar
                                </Button>
                                <Button size="sm">Atualizar Status</Button>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        )
                      })}
                    </Accordion>
                  </div>
                )
              })}
            </div>
          )
        })}

        {/* Botões de navegação */}
        <div className="mt-8 flex justify-between">
          <Link href="/diagnostico-de-conformidades">
            <Button variant="outline">Voltar para Diagnóstico</Button>
          </Link>
          <Link href="/trilha-de-conformidade">
            <Button>Retornar à Trilha</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

