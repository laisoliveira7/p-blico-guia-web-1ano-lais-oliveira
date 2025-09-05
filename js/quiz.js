const questions = [
  {
    id: 1,
    question: "O que significa HTML?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Medium Layer",
      "Home Tool Markup Language"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Qual é a função principal do CSS?",
    options: [
      "Criar interatividade",
      "Estruturar o conteúdo",
      "Estilizar elementos",
      "Processar dados"
    ],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "Para que serve o JavaScript?",
    options: [
      "Apenas para validar formulários",
      "Somente para criar animações",
      "Exclusivamente para estilização",
      "Adicionar interatividade e funcionalidades dinâmicas"
    ],
    correctAnswer: 3
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
    
    resultDiv.innerHTML = `
      <h3>Resultado</h3>
      <p>Você acertou ${score} de ${total} questões (${percentage}%)</p>
      <p>${getScoreMessage(percentage)}</p>
    `;
    
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
