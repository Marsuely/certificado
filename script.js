const elementos = {
  inicio: document.querySelector(".caixa-inicio"),
  jogo: document.querySelector(".caixa-jogo"),
  perguntas: document.querySelector(".caixa-perguntas"),
  alternativas: document.querySelector(".caixa-alternativas"),
  resultado: document.querySelector(".caixa-resultado"),
  textoResultado: document.querySelector(".texto-resultado"),
  nomeFinal: document.querySelector(".nome-final"),
  progresso: document.querySelector(".progresso"),
  botaoIniciar: document.querySelector(".botao-iniciar"),
  botaoReiniciar: document.querySelector(".botao-reiniciar")
};

const nomes = [
  "Gabriel", "Ana", "Lucas", "Marina", "Rafael",
  "Beatriz", "Davi", "Sofia", "Miguel", "Helena"
];

const perguntas = [
  {
    enunciado:
      "Assim que saiu da escola, {nome} se deparou com uma inteligência artificial capaz de responder dúvidas e criar imagens e áudios. Qual foi seu primeiro pensamento?",
    alternativas: [
      {
        texto: "Isso é assustador!",
        afirmacoes: [
          "No início, ficou com medo do que essa tecnologia poderia fazer.",
          "Achou assustador pensar na velocidade com que a tecnologia estava avançando."
        ]
      },
      {
        texto: "Isso é maravilhoso!",
        afirmacoes: [
          "Quis descobrir como usar inteligência artificial no dia a dia.",
          "Pensou que a IA poderia ajudar em várias tarefas."
        ]
      }
    ]
  },
  {
    enunciado:
      "Na escola, {nome} recebeu uma atividade que podia ser feita com a ajuda de uma IA. O que decidiu fazer?",
    alternativas: [
      {
        texto: "Usar a IA para pesquisar e conferir as informações.",
        afirmacoes: [
          "Aprendeu que a IA pode ser uma ferramenta de apoio, desde que usada com responsabilidade.",
          "Conferiu as respostas em outras fontes antes de incluí-las no trabalho."
        ]
      },
      {
        texto: "Pedir para a IA fazer tudo.",
        afirmacoes: [
          "Percebeu que receber uma resposta pronta nem sempre significa aprender.",
          "Começou a refletir sobre a importância de verificar o que a IA produz."
        ]
      }
    ]
  },
  {
    enunciado:
      "Uma imagem criada por IA começou a circular como se fosse real. Como {nome} reagiu?",
    alternativas: [
      {
        texto: "Compartilhou a imagem imediatamente.",
        afirmacoes: [
          "Depois, percebeu como é importante verificar a origem de uma imagem antes de compartilhá-la."
        ]
      },
      {
        texto: "Procurou confirmar se a imagem era verdadeira.",
        afirmacoes: [
          "Entendeu que ferramentas digitais também podem ser usadas para criar desinformação.",
          "Passou a conferir as fontes antes de compartilhar conteúdos."
        ]
      }
    ]
  },
  {
    enunciado:
      "Uma ferramenta de IA pediu alguns dados pessoais para oferecer um serviço. O que {nome} fez?",
    alternativas: [
      {
        texto: "Leu as informações e evitou fornecer dados desnecessários.",
        afirmacoes: [
          "Passou a se preocupar mais com privacidade e segurança na internet."
        ]
      },
      {
        texto: "Informou tudo sem pensar muito.",
        afirmacoes: [
          "Mais tarde, percebeu que é importante proteger os próprios dados pessoais."
        ]
      }
    ]
  },
  {
    enunciado:
      "Em 2049, {nome} olhou para trás e pensou sobre as mudanças trazidas pela inteligência artificial. Que conclusão chegou?",
    alternativas: [
      {
        texto: "A tecnologia é melhor quando ajuda as pessoas.",
        afirmacoes: [
          "Acreditou que o futuro dependia de usar a tecnologia com empatia e responsabilidade."
        ]
      },
      {
        texto: "As pessoas precisam decidir como a tecnologia será usada.",
        afirmacoes: [
          "Entendeu que as escolhas humanas são tão importantes quanto os avanços tecnológicos."
        ]
      }
    ]
  }
];

let estado = criarEstadoInicial();

function criarEstadoInicial() {
  return {
    nome: "",
    indicePergunta: 0,
    historia: []
  };
}

function sortearItem(lista) {
  return lista[Math.floor(Math.random() * lista.length)];
}

function iniciarJogo() {
  estado = criarEstadoInicial();
  estado.nome = sortearItem(nomes);

  elementos.inicio.hidden = true;
  elementos.resultado.hidden = true;
  elementos.jogo.hidden = false;

  mostrarPergunta();
}

function mostrarPergunta() {
  const pergunta = perguntas[estado.indicePergunta];

  if (!pergunta) {
    mostrarResultado();
    return;
  }

  elementos.progresso.textContent =
    `Pergunta ${estado.indicePergunta + 1} de ${perguntas.length}`;

  elementos.perguntas.textContent =
    pergunta.enunciado.replaceAll("{nome}", estado.nome);

  elementos.alternativas.replaceChildren();

  pergunta.alternativas.forEach((alternativa) => {
    const botao = document.createElement("button");

    botao.type = "button";
    botao.textContent = alternativa.texto;
    botao.addEventListener("click", () => selecionarAlternativa(alternativa));

    elementos.alternativas.appendChild(botao);
  });
}

function selecionarAlternativa(alternativa) {
  const afirmacao = sortearItem(alternativa.afirmacoes);
  estado.historia.push(afirmacao);
  estado.indicePergunta++;

  mostrarPergunta();
}

function mostrarResultado() {
  elementos.jogo.hidden = true;
  elementos.resultado.hidden = false;
  elementos.nomeFinal.textContent = estado.nome;

  const inicioHistoria =
    `Em 2049, ${estado.nome} olhou para trás e refletiu sobre sua jornada.`;

  elementos.textoResultado.textContent =
    `${inicioHistoria} ${estado.historia.join(" ")}`;
}

elementos.botaoIniciar.addEventListener("click", iniciarJogo);
elementos.botaoReiniciar.addEventListener("click", iniciarJogo);
