const questions = [
  {
    id: 1,
    question: "O que é HTML?",
    options: [
      "Linguagem de programação",
      "Linguagem de marcação",
      "Folha de estilo",
      "Script de backend"
    ],
    correctAnswer: 1,
    explanation: "HTML é uma linguagem de marcação usada para estruturar páginas web."
  },
  {
    id: 2,
    question: "Qual propriedade CSS altera a cor do texto?",
    options: ["font-size", "color", "text-align", "background"],
    correctAnswer: 1,
    explanation: "A propriedade 'color' define a cor do texto em CSS."
  },
  {
    id: 3,
    question: "Para que serve o JavaScript?",
    options: [
      "Criar estilos visuais",
      "Definir layout",
      "Adicionar interatividade",
      "Desenhar imagens"
    ],
    correctAnswer: 2,
    explanation: "JavaScript é usado para adicionar comportamento e interatividade às páginas."
  },
  {
    id: 4,
    question: "O que é responsividade?",
    options: [
      "Código que responde rapidamente",
      "Sites que se adaptam a diferentes tamanhos de tela",
      "Uso de JavaScript para animações",
      "Sites rápidos para carregar"
    ],
    correctAnswer: 1,
    explanation: "Responsividade permite que o site se adapte a diferentes dispositivos (mobile, tablet, desktop)."
  },
  {
    id: 5,
    question: "Qual é a forma correta de declarar uma variável no JavaScript moderno?",
    options: ["var nome = 'João';", "dim nome = 'João';", "let nome = 'João';", "new nome = 'João';"],
    correctAnswer: 2,
    explanation: "A declaração moderna usa 'let' ou 'const'."
  },
  {
    id: 6,
    question: "O que é Git?",
    options: [
      "Um sistema de design",
      "Um tipo de banco de dados",
      "Um sistema de controle de versões",
      "Uma linguagem de programação"
    ],
    correctAnswer: 2,
    explanation: "Git é um sistema de versionamento de código, amplamente usado no desenvolvimento."
  },
  {
    id: 7,
    question: "Qual das opções é um framework de front-end?",
    options: ["React", "Node.js", "MySQL", "Docker"],
    correctAnswer: 0,
    explanation: "React é um framework (ou biblioteca) de front-end para construir interfaces."
  },
  {
    id: 8,
    question: "Qual elemento HTML representa uma navegação?",
    options: ["<div>", "<main>", "<footer>", "<nav>"],
    correctAnswer: 3,
    explanation: "<nav> é uma tag semântica usada para menus de navegação."
  },
  {
    id: 9,
    question: "Qual das opções salva dados no navegador?",
    options: ["sessionStorage", "localStorage", "cookies", "todas as anteriores"],
    correctAnswer: 3,
    explanation: "Todas podem armazenar dados no navegador, cada uma com comportamentos distintos."
  },
  {
    id: 10,
    question: "Qual unidade é mais adequada para design responsivo?",
    options: ["px", "pt", "cm", "rem"],
    correctAnswer: 3,
    explanation: "Unidades relativas como 'rem' facilitam a responsividade e acessibilidade."
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const quizForm = document.getElementById('quiz-form');
  const submitButton = document.getElementById('submit-quiz');
  const resultDiv = document.getElementById('quiz-result');
  const restartButton = document.getElementById('restart-quiz');

  function createQuiz() {
    questions.forEach((q, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question';
      
      questionDiv.innerHTML = `
        <h3>Questão ${index + 1}: ${q.question}</h3>
        <div class="options">
          ${q.options.map((option, i) => `
            <div class="option">
              <input type="radio" name="q${q.id}" value="${i}" id="q${q.id}o${i}" required>
              <label for="q${q.id}o${i}">${option}</label>
            </div>
          `).join('')}
        </div>
      `;
      
      quizForm.appendChild(questionDiv);
    });
  }

  function calculateScore() {
    let score = 0;
    questions.forEach(q => {
      const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
      if (selected && parseInt(selected.value) === q.correctAnswer) {
        score++;
      }
    });
    return score;
  }

  function showResult(score) {
    const total = questions.length;
    const percentage = (score / total) * 100;
    
    let resultHTML = `
      <h3>Resultado</h3>
      <p>Você acertou ${score} de ${total} questões (${percentage}%)</p>
      <p>${getScoreMessage(percentage)}</p>
      <div class="explicacoes">
        <h4>Revisão das questões:</h4>
    `;

    questions.forEach((q, index) => {
      const selected = document.querySelector(`input[name="q${q.id}"]:checked`);
      const isCorrect = selected && parseInt(selected.value) === q.correctAnswer;
      const selectedAnswer = selected ? q.options[parseInt(selected.value)] : "Não respondida";
      const correctAnswer = q.options[q.correctAnswer];

      resultHTML += `
        <div class="questao-revisao ${isCorrect ? 'correta' : 'incorreta'}">
          <h5>Questão ${index + 1}: ${q.question}</h5>
          <p><strong>Sua resposta:</strong> ${selectedAnswer}</p>
          <p><strong>Resposta correta:</strong> ${correctAnswer}</p>
          <p><strong>Explicação:</strong> ${q.explanation}</p>
        </div>
      `;
    });

    resultHTML += '</div>';
    resultDiv.innerHTML = resultHTML;
    
    resultDiv.hidden = false;
    submitButton.hidden = true;
    restartButton.hidden = false;
  }

  function getScoreMessage(percentage) {
    if (percentage === 100) return "Excelente! Você é um expert!";
    if (percentage >= 70) return "Muito bom! Continue estudando!";
    if (percentage >= 50) return "Bom, mas você pode melhorar!";
    return "Continue estudando e tente novamente!";
  }

  function restartQuiz() {
    quizForm.reset();
    resultDiv.hidden = true;
    submitButton.hidden = false;
    restartButton.hidden = true;
  }

  // Event Listeners
  submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (quizForm.checkValidity()) {
      const score = calculateScore();
      showResult(score);
    } else {
      alert('Por favor, responda todas as questões!');
    }
  });

  restartButton.addEventListener('click', restartQuiz);

  // Inicializar o quiz
  createQuiz();
});
