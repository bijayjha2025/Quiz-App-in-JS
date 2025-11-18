
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

let questionEl = document.querySelector(".questionBox h2");
let optionButton = document.querySelector(".choicesButtons");
let nextButton = document.getElementById("nextButton");


let currentQuestionIndex= 0;
let yourScore = 0;
let answered= false;

let optionButtons= [];

function startQuiz(){
    currentQuestionIndex= 0;
    yourScore= 0;

    document.querySelector(".questionBox").innerHTML=`
    <h2>Here will be question</h2>
    <div class="choicesButtons"></div>
    <button id="nextButton">Next</button>
    `;

    questionEl = document.querySelector(".questionBox h2");
    optionButton = document.querySelector(".choicesButtons");
    nextButton = document.getElementById("nextButton");

    optionButton.style.display = "block";
    nextButton.style.display = "none";

    nextButton.addEventListener("click", nextHandler);

    displayQuestion();
}

function displayQuestion() {
    answered = false;
    nextButton.style.display = "none";

    optionButton.innerHTML = "";

    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

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

function nextHandler() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) displayQuestion();
    else showResult();
}

function showResult(){
    
    questionEl.innerHTML= `Your score:${yourScore}/${quizData.length}`;

    optionButton.innerHTML = "";
    optionButton.style.display = "none";

    nextButton.style.display = "none";

    const restartBtn = document.createElement("button");
    restartBtn.id = "restartButton";
    restartBtn.textContent = "Restart Quiz";

    document.querySelector(".questionBox").appendChild(restartBtn);

    restartBtn.onclick = ()=> {
        restartBtn.remove(); 
        startQuiz();   
    };
}


startQuiz();