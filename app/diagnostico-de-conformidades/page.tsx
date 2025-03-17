"use client"

import { useState } from "react"
import { Header } from "../components/header"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

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

export default function DiagnosticoDeConformidades() {
  const [filter, setFilter] = useState("todas")
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const filteredQuestions = filter === "todas" ? questions : questions.filter((q) => q.category === filter)

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-6">Diagnóstico de Conformidades</h1>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">
          <div className="mb-6">
            <Label htmlFor="filter">Filtrar por:</Label>
            <Select onValueChange={setFilter} defaultValue={filter}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um filtro" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todos os Controles</SelectItem>
                <SelectItem value="controles-fisicos">Controles Físicos</SelectItem>
                <SelectItem value="controles-ia">Controles de IA</SelectItem>
                <SelectItem value="controles-organizacao">Controles da Organização</SelectItem>
                <SelectItem value="controles-pessoas">Controles de Pessoas</SelectItem>
                <SelectItem value="controles-tecnologicos">Controles Tecnológicos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <form className="space-y-6">
            {filteredQuestions.map((question) => (
              <div key={question.id} className="space-y-2">
                <p className="font-medium">
                  {question.id}. {question.text}
                </p>
                <RadioGroup
                  onValueChange={(value) => handleAnswerChange(question.id, value)}
                  value={answers[question.id]}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id={`yes-${question.id}`} />
                    <Label htmlFor={`yes-${question.id}`}>Sim</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id={`no-${question.id}`} />
                    <Label htmlFor={`no-${question.id}`}>Não</Label>
                  </div>
                </RadioGroup>
              </div>
            ))}
          </form>
          <div className="mt-6 flex justify-between">
            <Link href="/trilha-de-conformidade">
              <Button variant="outline">Voltar</Button>
            </Link>
            <Link href="/mapa-de-maturidade">
              <Button>Calcular Pontuação</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

