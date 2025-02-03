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
