//Variable for HTML page
var timeDisplay = document.getElementById("timer")
var questions= document.getElementById("questions")
var btnStart= document.querySelector(".btn")
var option1= document.getElementById("btn1")
var option2= document.getElementById("btn2")
var option3= document.getElementById("btn3")
var option4= document.getElementById("btn4")
var messages= document.getElementById("messages")
var btnNext= document.querySelector(".nextBtn")
var saveBtn= document.getElementById("saveBtn")
var initials= document.getElementById("initialbox")
var answerbtns= document.querySelectorAll(".answerbtn")
var leaderBoard = document.querySelectorAll(".saved-score");

//timeDisplay.textContent = "Timer"

//java script variables
var timeLeft = 75; //Time for my clock
var questionNumber = 0 
var rightAnswer = ""
var myCountdown = ""
var numberCorrect = 0
var totalQuestions = 8 
var quizOver = false


function myTimer() {
  timeLeft--;
  timeDisplay.textContent= "Time Remaining: " + timeLeft

  if(timeLeft === 0) {
    // Stops execution of action at set interval
    clearInterval(myCountdown);
    quizOver = true
    showBtns()
  }
}


//Questions
var questionList = [
    {
        question: "What does CSS stand for?",
        answers: ["Creative Style Section", "Colorful Style Sheet", "Cascading Style Sheet", "Code Style Sheet"],
        correctAnswer: 3
    },
    {
        question: "What is one type of Web Storage in HTML5?",
        answers: ["Public Storage", "Private Storage", "DOM Storage", "Local Storage"],
        correctAnswer: 4
    }, 
    {
        question: "What is used to add styling to a web page?",
        answers: ["CSS", "HTML", "Photoshop", "Javascript"],
        correctAnswer: 1
    },
    {
        question: "The canvas element helps to build ______ .",
        answers: ["Functions in JS", "Display Object Management", "Charts and Graphs", "Desktop Storage"],
        correctAnswer: 3
    },
    {
        question: "What is the language that works with HTML and CSS",
        answers: ["Java", "Javascript", "None", "any application"],
        correctAnswer: 2
    },
    {
        question: "What does WWW stand for?",
        answers: ["World Wind Watch", "World Wide Web", "Web Watchers Wiki", "World Wide Watch"],
        correctAnswer: 2
    },
    {
        question: "What does Web APIs use to manipulate webpages?",
        answers: ["Javascript", "CSS", "HTML", "None"],
        correctAnswer: 1
    },
    {
        question: "What does API stand for?",
        answers: ["Application Program Initiation", "Apple Programming Interface", "Assigned Programming Interface", "Application Programming Interface"],
        correctAnswer: 4
    }
]



//TO DO: Build Function to Start Quiz
//Start timer, load first question
function startQuiz(){
    myCountdown = setInterval(myTimer, 1000);
    quizOver = false
    timeLeft = 75; 
    questionNumber = 0 
    numberCorrect = 0
    messages.textContent= ""
    enableBtns()
    hideBtns()
    nextQuestion()
}

//right or wrong 
function checkAnswer(userChoice){
    if(userChoice==rightAnswer){
        messages.textContent="Correct Answer!!"
        numberCorrect++;
    } else{
        messages.textContent="Incorrect"
        clearInterval(myCountdown)
        timeLeft-=2;
        myCountdown = setInterval(myTimer, 1000); //Start and stopped clock for 2 sec penalty 
    }
    if(questionNumber==7){
        quizOver = true
        showBtns()
        clearInterval(myCountdown)
    }else{
        questionNumber++;
    }
    
}
//call check answer pass the user choice to it
function choice1(){
    checkAnswer(1)
    disableBtns()
}
function choice2(){
    checkAnswer(2)
    disableBtns()
}
function choice3(){
    checkAnswer(3)
    disableBtns()
}
function choice4(){
    checkAnswer(4)
    disableBtns()
}

function nextQuestion(){
    questions.textContent= questionNumber + 1 + ". " + questionList[questionNumber].question
    option1.textContent= "1. " + questionList[questionNumber].answers[0]
    option2.textContent= "2. " + questionList[questionNumber].answers[1]
    option3.textContent= "3. " + questionList[questionNumber].answers[2]
    option4.textContent= "4. " + questionList[questionNumber].answers[3]
    rightAnswer = questionList[questionNumber].correctAnswer 
    if(!quizOver){
     enableBtns()
    }
}

//Save button and calcualting the score 
function saveScore(){
    var quizScore ={
        initials: initials.value,
        score: Math.floor(numberCorrect / totalQuestions * 100)
    }
    var a = []; // Empty array to hold the localstorage objects
    // Parse the data back into an array of objects. 
     a = JSON.parse(localStorage.getItem("quizScore")) || [];
     a.push(quizScore); // Push in the new data. 

    localStorage.setItem("quizScore", JSON.stringify(a));
    getScore()
}

function getScore(){
    var highScores = JSON.parse(localStorage.getItem("quizScore")) || [];
    if(highScores !== null){
    for(i=0; i < highScores.length; i++){
      leaderBoard[i].textContent = i+1 + ". " + highScores[i].initials + " - " + highScores[i].score + "%"
    }
  }
};

function enableBtns(){
    var button = answerbtns
    for(i=0; i < button.length; i++){
        button[i].disabled=false
    }
}
function disableBtns(){
    var button = answerbtns
    for(i=0; i < button.length; i++){
        button[i].disabled=true
    }
}

function showBtns(){
    if(saveBtn.classList.contains("hidden")){
        saveBtn.classList.remove("hidden")
    }else{
        saveBtn.classList.add("hidden")
    }
    if(btnStart.classList.contains("hidden")){
        btnStart.classList.remove("hidden")
    }else{
       btnStart.classList.add("hidden")
    }
    if(initials.classList.contains("hidden")){
        initials.classList.remove("hidden")
    }else{
        initials.classList.add("hidden")
    }
    /*if(btnNext.classList.contains("hidden")){
        btnNext.classList.remove("hidden")
    }else{
        btnNext.classList.add("hidden")
    }*/
    
}
function hideBtns(){
    if(!btnStart.classList.contains("hidden")){
        btnStart.classList.add("hidden")
    }else{
        btnStart.classList.remove("hidden")
    }
    if(!saveBtn.classList.contains("hidden")){
        saveBtn.classList.add("hidden")
    }else{
        saveBtn.classList.remove("hidden")
    }
    if(!initials.classList.contains("hidden")){
        initials.classList.add("hidden")
    }else{
        initials.classList.remove("hidden")
    }
    /*if(btnNext.classList.contains("hidden")){
        btnNext.classList.add("hidden")
    }else{
        btnNext.classList.remove("hidden")
    }*/
}

//loades highscores when page loads 
getScore()

//Listener for buttons
btnStart.addEventListener("click", startQuiz)
btnNext.addEventListener("click", nextQuestion)
saveBtn.addEventListener("click", saveScore)

//answer click
option1.addEventListener("click", choice1)
option2.addEventListener("click", choice2)
option3.addEventListener("click", choice3)
option4.addEventListener("click", choice4)
