const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: "JavaScript"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent Van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    answer: "Leonardo da Vinci"
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Text Machine Language"
    ],
    answer: "Hyper Text Markup Language"
  }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const submitBtn = document.getElementById("submit-btn");
const scoreEl = document.getElementById("score");

function loadQuestion() {
  const current = quizData[currentQuestion];
  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";
  feedbackEl.textContent = "";

  current.options.forEach(option => {
    const li = document.createElement("li");
    li.innerHTML = `
      <label>
        <input type="radio" name="option" value="${option}"> ${option}
      </label>
    `;
    optionsEl.appendChild(li);
  });
}

submitBtn.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  if (!selectedOption) {
    alert("Please select an answer.");
    return;
  }

  const answer = selectedOption.value;
  const correct = quizData[currentQuestion].answer;

  if (answer === correct) {
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "green";
    score++;
  } else {
    feedbackEl.textContent = `Wrong! The correct answer was "${correct}".`;
    feedbackEl.style.color = "red";
  }

  scoreEl.textContent = `Score: ${score}`;
  submitBtn.disabled = true;

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
      submitBtn.disabled = false;
    } else {
      showFinalScore();
    }
  }, 1500);
});

function showFinalScore() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  feedbackEl.textContent = `Your final score is ${score} out of ${quizData.length}.`;
  submitBtn.style.display = "none";
}

loadQuestion();
