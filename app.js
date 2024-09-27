const quizData = [
    {
        question: "What does Html stand for?",
        options: [
            "Hyper transfer markup language",
            "Hyper text machine language",
            "Hyper text markup language",
            "HyperLink text markup language",
        ],
        correct: 2,
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["color", "font-color", "text-color", "background-color"],
        correct: 0,
    },
    {
        question: "What is the purpose of the <head> tag in HTML?",
        options: [
            "To display the main content of the page",
            "To link external resources like CSS and JS",
            "To create headings on the page",
            "To store images",
        ],
        correct: 1,
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["Django", "Flask", "React", "Laravel"],
        correct: 2,
    },
    {
        question: "What is the correct syntax to refer to an external script called 'app.js'?",
        options: [
            "script src='app.js'",
            "script href='app.js'",
            "script ref='app.js'",
            "script link='app.js'",
        ],
        correct: 0,
    },
];
let quizBox = document.getElementById("Quiz");
let questions = document.getElementById("question");
let option1 = document.getElementById("option-1");
let option2 = document.getElementById("option-2");
let option3 = document.getElementById("option-3");
let option4 = document.getElementById("option-4");
let btn = document.getElementById("submit");
let timerDisplay = document.getElementById("timer");
let currentQuiz = 0;
let score = 0;
let timeLeft = 50; // 5 minutes in seconds
let timer;
// Load the first question initially
loadQuiz();
startTimer();
function loadQuiz() {
    questions.innerHTML = `${currentQuiz + 1}: ${quizData[currentQuiz].question}`;
    const options = quizData[currentQuiz].options;
    option1.innerHTML = options[0];
    option2.innerHTML = options[1];
    option3.innerHTML = options[2];
    option4.innerHTML = options[3];
}
function getSelectedOption() {
    const answers = document.querySelectorAll(".answer");
    let selectedOption;
    answers.forEach((answer, index) => {
        if (answer.checked) {
            selectedOption = index;
        }
    });
    return selectedOption;
}
btn.addEventListener("click", function () {
    const selectedOption = getSelectedOption();
    if (selectedOption === undefined) {
        Swal.fire("Please select an option!");
        return;
    }
    if (selectedOption === quizData[currentQuiz].correct) {
        score++;
    }
    if (currentQuiz < quizData.length - 1) {
        currentQuiz++;
        document.querySelectorAll(".answer").forEach((radio) => (radio.checked = false));
        loadQuiz();
    } else {
        endQuiz();
    }
});
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        // Check if time has run out
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz(true); // End quiz automatically if time runs out
        }
    }, 1000);
}
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.innerHTML = `Time Left: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
function endQuiz(timeUp = false) {
    clearInterval(timer);
    quizBox.innerHTML = `
        <div class="result">
            <h2>${timeUp ? 'Time is up! ' : ''}Your score: ${score}/${quizData.length} correct answers</h2>         
        </div>`;
}