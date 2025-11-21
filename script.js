
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
    },
     {
        question: "Which is the smallest country in the world?",
        choices: ["Monaco", "St. Kit and Nevis", "Vatican City", "Singapore"],
        answer: 2
    },
     {
        question: "Which is the longest country in the world?",
        choices: ["Brazil", "Russia", "China", "Chile"],
        answer: 3
    },
     {
        question: "Which is the smallest continent in the world?",
        choices: ["Asia", "Australia", "Europe", "Africa"],
        answer: 1
    },
     {
        question: "How many oceans are there in the earth?",
        choices: ["5", "7", "6", "4"],
        answer: 0
    },
     {
        question: "How many districts are there in Nepal?",
        choices: ["75", "76", "77", "78"],
        answer: 2
    },
    {
        question: "Which district in Nepal is known as 'district of lakes'?",
        choices: ["Kathmandu", "Dhanusha", "Kaski", "Sunsari"],
        answer: 2
    },
    {
        question: "Who wrote the national anthem of Nepal?",
        choices: ["Pradeep Rai", "Chandra Gurung", "Byakul Maila", "Dharmaraj Thapa"],
        answer:2
    },
    {
    question: "Which is the largest lake in Nepal?",
    choices: ["Phewa Lake", "Rara Lake", "Tilicho Lake", "Gosaikunda"],
    answer: 1
    },
    {
    question: "Which is the oldest temple in Nepal?",
    choices: ["Pashupatinath", "Changu Narayan", "Swayambhu", "Budhanilkantha"],
    answer: 1
    },
    {
    question: "Which river is known as 'Sorrow of Bihar'?",
    choices: ["Bagmati", "Karnali", "Koshi", "Gandaki"],
    answer: 2
    },
    {
    question: "Which mountain is nicknamed ‘Killer Mountain’?",
    choices: ["Manaslu", "Lhotse", "Annapurna", "Dhaulagiri"],
    answer: 2
    },
    {
    question: "Which is the oldest national park of Nepal?",
    choices: ["Shivapuri", "Sagarmatha", "Chitwan", "Banke"],
    answer: 2
    },
    {
    question: "The deepest lake of Nepal is?",
    choices: ["Tilicho", "Phoksundo", "Rara", "Gosaikunda"],
    answer: 1
    },
    {
    question: "Which district of Nepal touches the highest number of other districts?",
    choices: ["Sindhuli", "Kathmandu", "Bhaktapur", "Rasuwa"],
    answer: 0
    }
    ];

let questionEl = document.querySelector(".questionBox h2");
let optionButton = document.querySelector(".choicesButtons");
let nextButton = document.getElementById("nextButton");

let timerEl;
let countDown;
let timeLeft= 10;


let currentQuestionIndex= 0;
let yourScore = 0;
let answered= false;

let progressBar = null;

const correctSound = new Audio("./Audios/correctSound.wav");
const incorrectSound = new Audio("./Audios/wrongSound.wav");
const timesUpSound = new Audio("./Audios/timesupSound.wav");

let optionButtons= [];

function startQuiz(){
    currentQuestionIndex= 0;
    yourScore= 0;

    document.querySelector(".questionBox").innerHTML=`
    <div class="progressBarContainer">
    <div class="progressBar" id="progressBar"></div>
    </div>
    <h3 id="timer">Time left: 10s</h3>
    <h2>Here will be question</h2>
    <div class="choicesButtons"></div>
    <button id="nextButton">Next</button>
    `;

    progressBar = document.getElementById("progressBar");

    questionEl = document.querySelector(".questionBox h2");
    optionButton = document.querySelector(".choicesButtons");
    nextButton = document.getElementById("nextButton");
    timerEl = document.getElementById("timer");

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

    resetTimer();
    startTimer();

    updateProgressBar();
    animateQuestionBox();
}

function selectAnswer(selectedIndex){

    if (answered) return;
    answered = true;

    const correctIndex = quizData[currentQuestionIndex].answer;
    const buttons = optionButton.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctIndex){
            btn.style.background = "lightgreen";
            btn.classList.add("correctAnimation");
            setTimeout(()=>btn.classList.remove("correctAnimation"), 500);}

        if (i === selectedIndex && selectedIndex !== correctIndex){
            btn.style.background = "salmon";
            btn.classList.add("incorrectAnimation");
            setTimeout(() => btn.classList.remove("incorrectAnimation"), 500);
        }
    });

    if(selectedIndex === correctIndex){
        yourScore++;
        correctSound.currentTime= 0;
        correctSound.play();
    }
    else {
    incorrectSound.currentTime = 0;
    incorrectSound.play();
    }

    nextButton.style.display= "block";
}

function nextHandler() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length)
        {
            displayQuestion();
        }
    else showResult();
}

function showResult(){
    
    clearInterval(countDown);

    let storedHigh = updateHighscore();
    let newHigh = yourScore == storedHigh;

    document.querySelector(".questionBox").innerHTML=`
    <div class="resultCard ${newHigh ? "highlight" : ""}">
     <h2>Quiz Completed!</h2>
    
    <div class="scoreBox">
     <p>Your score:</p>
     <h1>${yourScore} / ${quizData.length}</h1>
    </div>
    
    <div class="highScoreBox">
     <p>Highest Score:</p>
     <h1>${storedHigh}</h1>
    </div>
    
     ${newHigh ? `<p class="newHighScoreText">🏆 New High Score!</p>` : ""}

     <button id="restartButton">Restart Quiz</button>
    </div>
    `;

    document.getElementById("restartButton").onclick= ()=>{
        startQuiz();   
    };
}

function startTimer(){
    timeLeft = 10;
    timerEl.textContent= `Time left: ${timeLeft}s`;

    countDown = setInterval(()=>{
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft}s`;

        if(timeLeft<=0){
            clearInterval(countDown);
            autoSelectAnswer();
        }
    }, 1000);
}


function resetTimer(){
    clearInterval(countDown);
    timeLeft = 10;
    timerEl.textContent= `Time left: ${timeLeft}s`;
}


function autoSelectAnswer() {
    if (answered) return;
    answered = true;

    const correctIndex = quizData[currentQuestionIndex].answer;
    const buttons = optionButton.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctIndex) btn.style.background = "lightgreen";
    });

    timesUpSound.currentTime = 0;
    timesUpSound.play();


    nextButton.style.display = "block";
}

function updateHighscore(){

    const storedHigh = localStorage.getItem("highScore");

    if(!storedHigh|| yourScore > storedHigh){
        localStorage.setItem("highScore", yourScore);
        return yourScore;
    }
    return storedHigh;
}

function getHighScore(){
    return localStorage.getItem("highScore") || 0;
}

document.getElementById("themeChange").onclick = () => {
    document.body.classList.toggle("dark");
    document.querySelector(".mainContainer").classList.toggle("dark");
};

function updateProgressBar(){
    const total = quizData.length;
    const current = currentQuestionIndex;

    const progressPercent = (current / total) * 100;

    progressBar.style.width = progressPercent + "%";
}

function animateQuestionBox(){
    const box = document.querySelector(".questionBox");
    box.classList.remove("show");
    setTimeout(()=>{
        box.classList.add("show");
    }, 10);
}
startQuiz();