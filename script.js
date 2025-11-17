
const quizData = [
    {
        question: "What does HTML stands for?",
        choices: ["HyperText Makeup Language", "HyperText Markup Language", "HyperText Machine Language", "HyperType Markup Language"],
        answer: 1
    },
    {
        question: "Which is the biggest district of Nepal?",
        choices: ["Dolpa", "Kathmandu", "Ilam", "Kaski"],
        answer: 0
    },
    {
        question: "Which is the national sport of Nepal?",
        choices: ["Volleyball", "Cricket", "Football", "Dandibiyo"],
        answer: 0
    },
    {
        question: "Which is the second highest mountain in the world?",
        choices: ["Kanchenjunga", "Manaslu", "Machhapuchre", "Mt. K2"],
        answer: 3
    },
    {
        question: "How many provinces are there in Nepal?",
        choices: ["8", "7", "6", "5"],
        answer: 1

    },
    {
        question: "Who is called the father of computer science?",
        choices: ["Charles Babbage", "Augusta Ada Lovelace", "Howard Aiken", "Blaise Pascal"],
        answer: 0
    }
    ];

const questionEl = document.querySelector(".questionBox h2");
const optionButton = document.querySelector(".choicesButtons");
const nextButton = document.getElementById("nextButton");


let currentQuestionIndex= 0;
let yourScore = 0;
let answered= false;

let optionButtons= [];

function startQuiz(){
    currentQuestionIndex= 0;
    yourScore= 0;
    displayQuestion();
}

function displayQuestion() {
    answered = false;
    nextButton.style.display = "none";

    optionButton.innerHTML = ""; // clear previous options

    const currentQuestion = quizData[currentQuestionIndex];

    let questionNumber = currentQuestionIndex + 1;
    questionEl.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement("button");
        button.innerHTML = choice;
        button.classList.add("option");
        button.onclick = () => selectAnswer(index);
        optionButton.appendChild(button);
    });
}

function selectAnswer(selectedIndex){

       if (answered) return;
    answered = true;

    const correctIndex = quizData[currentQuestionIndex].answer;
    const buttons = optionButton.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctIndex) btn.style.background = "lightgreen";
        if (i === selectedIndex && selectedIndex !== correctIndex)
            btn.style.background = "salmon";
    });

    if(selectedIndex === correctIndex){
        yourScore++; 
    }

    nextButton.style.display= "block";
}

nextButton.addEventListener("click", ()=>{
    currentQuestionIndex++;

    if(currentQuestionIndex < quizData.length){
        displayQuestion();
    }
    else {
        showResult();
    }
});

function showResult(){
    document.querySelector(".questionBox").innerHTML = 
    `<h2>Your score:${yourScore}/${quizData.length}</h2>
    <button id= "restartButton">Restart Quiz</button>`;

    document.getElementById("restartButton").addEventListener("click", startQuiz);
}

startQuiz();