"use client"

import { Header } from "../components/header"
import { useEffect, useState, useRef } from "react"
import Chart from "chart.js/auto"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

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

// Verificar o total de itens
const totalItens = Object.values(quantidades).reduce((total, impactos) => {
  return total + Object.values(impactos).reduce((sum, count) => sum + count, 0)
}, 0)

// Distribuição aleatória das 72 perguntas entre os níveis de risco e impacto
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
  "90%": "bg-red-100 border-red-300",
  "70%": "bg-orange-100 border-orange-300",
  "50%": "bg-yellow-100 border-yellow-300",
  "30%": "bg-green-100 border-green-300",
  "10%": "bg-blue-100 border-blue-300",
}

// Dados para o gráfico de quadrantes
const dadosQuadrantes = {
  organizacao: 75,
  pessoas: 60,
  tecnologicos: 80,
  fisicos: 70,
  ia: 45,
}

// Cores para o gráfico de quadrantes
const coresQuadrantes = {
  organizacao: "#3B82F6", // blue-500
  pessoas: "#10B981", // emerald-500
  tecnologicos: "#F59E0B", // amber-500
  fisicos: "#8B5CF6", // violet-500
  ia: "#EF4444", // red-500
}

export default function MapaDeMaturidade() {
  const [colunaAtual, setColunaAtual] = useState("Muito Alto")
  const carrosselRef = useRef<HTMLDivElement>(null)
  const colunas = ["Muito Alto", "Alto", "Moderado", "Baixo", "Muito Baixo"]
  const impactos = ["90%", "70%", "50%", "30%", "10%"]
  const [isMobile, setIsMobile] = useState(true)

  useEffect(() => {
    // Verificar se é mobile ou desktop
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024) // 1024px é o breakpoint para lg no Tailwind
    }

    // Verificar inicialmente
    checkIfMobile()

    // Adicionar listener para redimensionamento
    window.addEventListener("resize", checkIfMobile)

    // Remover listener ao desmontar
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  useEffect(() => {
    // Criar gráfico de quadrantes (radar)
    const ctxQuadrantes = document.getElementById("grafico-quadrantes") as HTMLCanvasElement
    if (ctxQuadrantes) {
      new Chart(ctxQuadrantes, {
        type: "radar",
        data: {
          labels: ["Organização", "Pessoas", "Tecnológicos", "Físicos", "IA"],
          datasets: [
            {
              label: "Nível de Maturidade",
              data: [
                dadosQuadrantes.organizacao,
                dadosQuadrantes.pessoas,
                dadosQuadrantes.tecnologicos,
                dadosQuadrantes.fisicos,
                dadosQuadrantes.ia,
              ],
              fill: true,
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "#3B82F6",
              borderWidth: 2,
              pointBackgroundColor: [
                coresQuadrantes.organizacao,
                coresQuadrantes.pessoas,
                coresQuadrantes.tecnologicos,
                coresQuadrantes.fisicos,
                coresQuadrantes.ia,
              ],
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "#3B82F6",
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        },
        options: {
          scales: {
            r: {
              angleLines: {
                display: true,
                color: "rgba(0, 0, 0, 0.1)",
                lineWidth: 1,
              },
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
                circular: true,
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                stepSize: 20,
                backdropColor: "transparent",
                color: "#666",
                font: {
                  size: 10,
                },
              },
              pointLabels: {
                color: "#333",
                font: {
                  size: 14,
                  weight: "bold",
                },
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  size: 14,
                },
                boxWidth: 15,
                padding: 20,
              },
            },
            tooltip: {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              titleColor: "#333",
              bodyColor: "#333",
              borderColor: "#ddd",
              borderWidth: 1,
              padding: 12,
              boxWidth: 10,
              boxHeight: 10,
              boxPadding: 3,
              usePointStyle: true,
              callbacks: {
                title: (context) => context[0].label,
                label: (context) => `Maturidade: ${context.raw}%`,
              },
            },
          },
          elements: {
            line: {
              tension: 0.1,
            },
          },
        },
      })
    }

    // Criar gráficos de maturidade individuais
    const createChart = (id: string, data: number) => {
      const ctx = document.getElementById(id) as HTMLCanvasElement
      if (!ctx) return

      new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [data, 100 - data],
              backgroundColor: ["#4CAF50", "#F5F5F5"],
            },
          ],
        },
        options: {
          cutout: "80%",
          responsive: true,
          maintainAspectRatio: false,
        },
      })
    }

    // Criar gráficos de maturidade
    createChart("grafico-organizacao", 75)
    createChart("grafico-pessoas", 60)
    createChart("grafico-tecnologicos", 80)
    createChart("grafico-fisicos", 70)
    createChart("grafico-ia", 45)
  }, [])

  // Função para navegar para a próxima coluna
  const proximaColuna = () => {
    const index = colunas.indexOf(colunaAtual)
    if (index < colunas.length - 1) {
      setColunaAtual(colunas[index + 1])
      scrollToColuna(colunas[index + 1])
    }
  }

  // Função para navegar para a coluna anterior
  const colunaAnterior = () => {
    const index = colunas.indexOf(colunaAtual)
    if (index > 0) {
      setColunaAtual(colunas[index - 1])
      scrollToColuna(colunas[index - 1])
    }
  }

  // Função para rolar para uma coluna específica
  const scrollToColuna = (coluna: string) => {
    if (carrosselRef.current) {
      const colunaElement = document.getElementById(`coluna-${coluna}`)
      if (colunaElement) {
        carrosselRef.current.scrollTo({
          left: colunaElement.offsetLeft - carrosselRef.current.offsetLeft,
          behavior: "smooth",
        })
      }
    }
  }

  // Componente para os indicadores de porcentagem
  const IndicadoresPorcentagem = () => (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center p-2 rounded-md bg-blue-50 border-l-4 border-blue-500">
        <div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div>
        <span className="font-medium text-blue-800">Organização:</span>
        <span className="ml-auto font-bold text-blue-600">{dadosQuadrantes.organizacao}%</span>
      </div>

      <div className="flex items-center p-2 rounded-md bg-emerald-50 border-l-4 border-emerald-500">
        <div className="w-3 h-3 rounded-full bg-emerald-500 mr-3"></div>
        <span className="font-medium text-emerald-800">Pessoas:</span>
        <span className="ml-auto font-bold text-emerald-600">{dadosQuadrantes.pessoas}%</span>
      </div>

      <div className="flex items-center p-2 rounded-md bg-amber-50 border-l-4 border-amber-500">
        <div className="w-3 h-3 rounded-full bg-amber-500 mr-3"></div>
        <span className="font-medium text-amber-800">Tecnológicos:</span>
        <span className="ml-auto font-bold text-amber-600">{dadosQuadrantes.tecnologicos}%</span>
      </div>

      <div className="flex items-center p-2 rounded-md bg-violet-50 border-l-4 border-violet-500">
        <div className="w-3 h-3 rounded-full bg-violet-500 mr-3"></div>
        <span className="font-medium text-violet-800">Físicos:</span>
        <span className="ml-auto font-bold text-violet-600">{dadosQuadrantes.fisicos}%</span>
      </div>

      <div className="flex items-center p-2 rounded-md bg-red-50 border-l-4 border-red-500">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-3"></div>
        <span className="font-medium text-red-800">IA:</span>
        <span className="ml-auto font-bold text-red-600">{dadosQuadrantes.ia}%</span>
      </div>
    </div>
  )

  return (
    <main className="flex min-h-screen flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-xl font-bold text-center text-black mb-2">Mapa de Maturidade LGPD</h1>
        <p className="text-center text-gray-600 mb-6">
          Acompanhe o nível de maturidade da sua organização em relação à conformidade com a LGPD.
        </p>

        {/* Novo Gráfico de Quadrantes - Melhorado */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold mb-6 text-center">Visão Geral de Maturidade</h2>

          {/* Layout flexível que muda com o tamanho da tela */}
          <div className="lg:flex lg:items-start lg:space-x-6">
            {/* Gráfico de quadrantes */}
            <div className="lg:flex-1 h-96 md:h-[500px] mb-6 lg:mb-0">
              <canvas id="grafico-quadrantes"></canvas>
            </div>

            {/* Indicadores de porcentagem - à direita em telas grandes, abaixo em telas pequenas */}
            <div className="lg:w-64 mt-6 lg:mt-0">
              <IndicadoresPorcentagem />
            </div>
          </div>
        </div>

        {/* Gráficos de Maturidade */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-base font-semibold mb-4">Controles da Organização</h2>
            <div className="h-48">
              <canvas id="grafico-organizacao"></canvas>
            </div>
            <p className="text-center mt-4">
              Média de Pontuação: <span id="media-organizacao">75%</span>
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-base font-semibold mb-4">Controles de Pessoas</h2>
            <div className="h-48">
              <canvas id="grafico-pessoas"></canvas>
            </div>
            <p className="text-center mt-4">
              Média de Pontuação: <span id="media-pessoas">60%</span>
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-base font-semibold mb-4">Controles Tecnológicos</h2>
            <div className="h-48">
              <canvas id="grafico-tecnologicos"></canvas>
            </div>
            <p className="text-center mt-4">
              Média de Pontuação: <span id="media-tecnologicos">80%</span>
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-base font-semibold mb-4">Controles Físicos</h2>
            <div className="h-48">
              <canvas id="grafico-fisicos"></canvas>
            </div>
            <p className="text-center mt-4">
              Média de Pontuação: <span id="media-fisicos">70%</span>
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
            <h2 className="text-base font-semibold mb-4">Controles de IA</h2>
            <div className="h-48">
              <canvas id="grafico-ia"></canvas>
            </div>
            <p className="text-center mt-4">
              Média de Pontuação: <span id="media-ia">45%</span>
            </p>
          </div>
        </div>

        {/* Matriz de Riscos - Nova Versão por Colunas */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-base font-semibold mb-2">Matriz de Riscos LGPD</h2>
          <p className="text-sm text-gray-600 mb-4">
            Distribuição dos {totalItens} itens de conformidade por nível de risco e impacto.
            {isMobile && " Deslize ou use as setas para navegar entre os níveis de risco."}
          </p>

          {/* Navegação da Matriz - Apenas para mobile */}
          {isMobile && (
            <div className="flex justify-between items-center mb-4">
              <Button
                variant="outline"
                onClick={colunaAnterior}
                disabled={colunaAtual === colunas[0]}
                className="flex items-center"
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Anterior
              </Button>

              <div className="flex space-x-1">
                {colunas.map((coluna) => (
                  <button
                    key={coluna}
                    onClick={() => {
                      setColunaAtual(coluna)
                      scrollToColuna(coluna)
                    }}
                    className={`w-3 h-3 rounded-full ${colunaAtual === coluna ? "bg-blue-600" : "bg-gray-300"}`}
                    aria-label={`Ver nível de risco ${coluna}`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                onClick={proximaColuna}
                disabled={colunaAtual === colunas[colunas.length - 1]}
                className="flex items-center"
              >
                Próximo <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          )}

          {/* Carrossel de Colunas para Mobile */}
          {isMobile ? (
            <div
              ref={carrosselRef}
              className="overflow-x-auto pb-4 hide-scrollbar"
              style={{ scrollSnapType: "x mandatory" }}
            >
              <div className="flex min-w-full">
                {colunas.map((coluna) => (
                  <div
                    key={coluna}
                    id={`coluna-${coluna}`}
                    className="flex-shrink-0 w-full scroll-snap-align-start"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    <div className={`rounded-t-lg p-3 text-center font-bold ${coresRisco[coluna]}`}>{coluna}</div>

                    <div className="border border-t-0 rounded-b-lg p-4">
                      {impactos.map((impacto) => (
                        <div key={impacto} className="mb-4 last:mb-0">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">Impacto {impacto}</span>
                            <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                              {distribuicaoRiscos[coluna][impacto].length} itens
                            </span>
                          </div>

                          <div className={`border ${coresImpacto[impacto]} rounded-lg p-3`}>
                            <div className="flex flex-wrap gap-2">
                              {distribuicaoRiscos[coluna][impacto].map((numero) => (
                                <div
                                  key={numero}
                                  className="w-8 h-8 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-medium"
                                  title={`Pergunta ${numero}`}
                                >
                                  {numero}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Layout para Desktop - Todas as colunas lado a lado
            <div className="grid grid-cols-5 gap-4">
              {colunas.map((coluna) => (
                <div key={coluna} className="border rounded-lg">
                  <div className={`rounded-t-lg p-3 text-center font-bold ${coresRisco[coluna]}`}>{coluna}</div>
                  <div className="p-3">
                    {impactos.map((impacto) => (
                      <div key={impacto} className="mb-3 last:mb-0">
                        <div className="flex justify-between items-center mb-1 text-sm">
                          <span className="font-medium">Impacto {impacto}</span>
                          <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded-full">
                            {distribuicaoRiscos[coluna][impacto].length}
                          </span>
                        </div>

                        <div className={`border ${coresImpacto[impacto]} rounded-lg p-2`}>
                          <div className="flex flex-wrap gap-1">
                            {distribuicaoRiscos[coluna][impacto].map((numero) => (
                              <div
                                key={numero}
                                className="w-6 h-6 rounded-full bg-white border border-gray-300 flex items-center justify-center text-xs font-medium"
                                title={`Pergunta ${numero}`}
                              >
                                {numero}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Legenda */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
            {impactos.map((impacto) => (
              <div key={impacto} className={`${coresImpacto[impacto]} p-2 rounded text-center`}>
                Impacto {impacto}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Link href="/diagnostico-de-conformidades">
            <Button variant="outline">Voltar</Button>
          </Link>
          <Link href="/trilha-de-conformidade">
            <Button>Retornar a Trilha</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}

