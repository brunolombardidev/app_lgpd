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
  