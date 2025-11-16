
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
const buttonContainer = document.querySelector(".choicesButtons");
const nextButton = document.getElementById("nextButton");


let currentIndex= 0;
let yourScore = 0;

function quizSection(){
    currentQuestion= 0;
    yourScore= 0;
    nextButton.innerHTML= "Next";
    displayQuestion();
}

function displayQuestion(){
    let currentQuestion = questionBox[currentQuestion];
    let questionNumber = currentQuestion + 1;

}