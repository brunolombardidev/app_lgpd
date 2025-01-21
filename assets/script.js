document.addEventListener("DOMContentLoaded", () => {
  const filtro = document.getElementById("categoria-filtro");
  const categorias = document.querySelectorAll(".categoria");
  const botaoCalcular = document.getElementById("calcular-pontuacao");
  
  // Filtrar questões por categoria
  filtro.addEventListener("change", (event) => {
    const valor = event.target.value;
    categorias.forEach((categoria) => {
      if (valor === "todas" || categoria.dataset.categoria === valor) {
        categoria.style.display = "block";
      } else {
        categoria.style.display = "none";
      }
    });
  });
  
  // Calcular pontuação
  botaoCalcular.addEventListener("click", () => {
    let pontuacaoTotal = 0;
    const respostas = document.querySelectorAll("input[type='radio']:checked");
    respostas.forEach((resposta) => {
      pontuacaoTotal += parseInt(resposta.value, 10);
    });
     alert(`Sua pontuação total é: ${pontuacaoTotal}`);
  });
});

/* ---// ANALISE E MAPA DE CONFORMIDADE //--- */

document.addEventListener("DOMContentLoaded", () => {
  const salvarRespostas = () => {
    const respostas = {};
    document.querySelectorAll(".categoria").forEach((categoriaDiv) => {
      const categoria = categoriaDiv.dataset.categoria;
      respostas[categoria] = [];
      categoriaDiv.querySelectorAll("input[type='radio']:checked").forEach((input) => {
        respostas[categoria].push(parseInt(input.value, 10));
      });
    });
    localStorage.setItem("respostasDiagnostico", JSON.stringify(respostas));
    window.location.href = "maturidade_lgpd.html";
  };

  const carregarGraficos = () => {
    const respostas = JSON.parse(localStorage.getItem("respostasDiagnostico")) || {};
    const categorias = ["organizacao", "pessoas", "tecnologicos", "fisicos"];
    const graficos = {};

    const calcularMedia = (valores) => {
      if (!valores || valores.length === 0) return 0;
      const total = valores.reduce((acc, val) => acc + val, 0);
      return Math.round((total / (valores.length * 5)) * 100);
    };

    const criarGrafico = (id, media) => {
      const contexto = document.getElementById(id).getContext("2d");
      const cor = media >= 76 ? "#28a745" : media >= 51 ? "#ffc107" : media >= 26 ? "#fd7e14" : "#dc3545";

      if (graficos[id]) graficos[id].destroy();

      graficos[id] = new Chart(contexto, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: [media, 100 - media],
              backgroundColor: [cor, "#e9ecef"],
              borderWidth: 0,
              cutout: "70%"
            }
          ]
        },
        options: {
          rotation: -90,
          circumference: 180,
          plugins: {
            tooltip: { enabled: false },
            legend: { display: false }
          }
        }
      });
    };

    categorias.forEach((categoria) => {
      const media = calcularMedia(respostas[categoria] || []);
      document.getElementById(`media-${categoria}`).textContent = `${media}%`;
      criarGrafico(`grafico-${categoria}`, media);
    });
  };

  if (document.getElementById("salvar-respostas")) {
    document.getElementById("salvar-respostas").addEventListener("click", salvarRespostas);
  }

  if (document.getElementById("maturidade-section")) {
    carregarGraficos();
  }
});

/* /// Gráficos Novos /// */

document.addEventListener("DOMContentLoaded", () => {
  // Gráfico de Quadrantes
  const criarGraficoQuadrantes = () => {
    const ctx = document.getElementById("grafico-quadrantes").getContext("2d");

    new Chart(ctx, {
      type: "scatter",
      data: {
        datasets: [
          {
            label: "Setor A",
            data: [
              { x: 10, y: 20 },
              { x: 30, y: 40 },
              { x: 20, y: 50 }
            ],
            backgroundColor: "rgba(54, 162, 235, 0.6)"
          },
          {
            label: "Setor B",
            data: [
              { x: 40, y: 60 },
              { x: 50, y: 30 },
              { x: 60, y: 70 }
            ],
            backgroundColor: "rgba(255, 99, 132, 0.6)"
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" }
        },
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "Impacto"
            }
          },
          y: {
            title: {
              display: true,
              text: "Probabilidade"
            }
          }
        }
      }
    });
  };

  // Gráfico de Calor
  
  const criarGraficoCalor = () => {
    const ctx = document.getElementById("grafico-calor").getContext("2d");

    new Chart(ctx, {
      type: "matrix",
      data: {
        datasets: [
          {
            label: "Mapa de Calor",
            data: [
              { x: 1, y: 1, v: 20 },
              { x: 2, y: 1, v: 40 },
              { x: 3, y: 1, v: 60 },
              { x: 1, y: 2, v: 30 },
              { x: 2, y: 2, v: 50 },
              { x: 3, y: 2, v: 80 }
            ],
            backgroundColor(context) {
              const value = context.dataset.data[context.dataIndex].v;
              if (value < 30) return "rgba(75, 192, 192, 0.6)";
              if (value < 60) return "rgba(255, 206, 86, 0.6)";
              return "rgba(255, 99, 132, 0.6)";
            },
            width(context) {
              const chart = context.chart;
              const xScale = chart.scales.x;
              return (xScale.width - xScale.left) / 3 - 5;
            },
            height(context) {
              const chart = context.chart;
              const yScale = chart.scales.y;
              return (yScale.height - yScale.top) / 3 - 5;
            }
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: "linear",
            position: "bottom",
            title: {
              display: true,
              text: "Impacto"
            }
          },
          y: {
            title: {
              display: true,
              text: "Probabilidade"
            }
          }
        },
        plugins: {
          tooltip: {
            callbacks: {
              label(context) {
                const value = context.dataset.data[context.dataIndex].v;
                return `Valor: ${value}`;
              }
            }
          }
        }
      }
    });
  };

  // Renderiza os gráficos quando a página carrega
  if (document.getElementById("grafico-quadrantes")) {
    criarGraficoQuadrantes();
  }

  if (document.getElementById("grafico-calor")) {
    criarGraficoCalor();
  }
});
