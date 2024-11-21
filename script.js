
const story = {
  1: {
    title: "Início da Aventura",
    text: "você acaba de entrar para uma guilda de aventureiros e recebe a missão de envestigar o circo estranho que chegou na cidade, mas uma torre charmosa te chama a atenção.",
    options: [
      { text: "ir para o circo", next: 2 },
      { text: "ir para a torre", next: 3 }
    ]
  },
  2: {
    title: "Circo estranho",
    text: "Quando você chega no circo logo compra uma pipoca e senta em um local, porem a coloração do banco é diferente dos demais, ignorando você começa a comer a pipoca e se sente um pouco tonto.",
    options: [
      { text: "Assistir o espetaculo", next: 4 },
      { text: "sair do circo", next: 1 }
    ]
  },
  3: {
    title: "Torre do mago",
    text: "Chegando na torre do mago, ele revela se chamar Orual um mago conhecido pra lá do outro continente, ele te oferece uma aventura perigosa em troca de itens magicos.",
    options: [
      { text: "recusar", next: 1 },
      { text: "aceitar", next: 5 }
    ]
  },
  4: {
    title: "Sequestro",
    text: "Você foi envenedado e acorda dentro uma jaula, mas graças a um rato amigo a porta está aberta, você escuta passos descendo.",
    options: [
      { text: "fungir de morto", next: 6 },
      { text: "ersconder-se", next: 7 }
    ]
  },
  5: {
  title: "Sequestro",
  text: "Por mais experiente que você seja, o inimigo era muito forte para alguem sozinho e eletrocutado você vê seus ultimos momentos",
  options: [
      { text: "Volte para o inicio", next: 1 },
    ]
  },

  6: {
  title: "Disfarce",
  text: "eles te encontram jogado no chão e sem tempo de reação o palhaço maior esmaga sua cabeça",
  options: [
      { text: "Volte para o inicio", next: 1 },
    ]
  },
  7: {
  title: "Esconderijo",
  text: "Com a ajuda das outras pessoas da sala seu esconderijo resulta em um ataque de oportunidade dando baixa em um dos palhaços e encuralando os outros",
  options: [
      { text: "continua", next: 1 },
    ]
  },
  // mais caps aqui
};


function renderChapter(chapterId) {
  const chapter = story[chapterId];
  if (!chapter) return;

 
  document.title = chapter.title;


  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = `
    <h1>${chapter.title}</h1>
    <p>${chapter.text}</p>
    <div>
      ${chapter.options
        .map(
          (option) =>
            `<a href="?chapter=${option.next}" data-chapter="${option.next}">${option.text}</a>`
        )
        .join("<br>")}
    </div>
  `;

 
  localStorage.setItem("lastChapter", chapterId);

 
  const links = contentDiv.querySelectorAll("a");
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const nextChapter = link.getAttribute("data-chapter");
      renderChapter(nextChapter);
    });
  });
}


function getInitialChapter() {
  const params = new URLSearchParams(window.location.search);
  const chapter = params.get("chapter");
  return chapter || localStorage.getItem("lastChapter") || "1";
}

document.addEventListener("DOMContentLoaded", () => {
  const initialChapter = getInitialChapter();
  renderChapter(initialChapter);
});
