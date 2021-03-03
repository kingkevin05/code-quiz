const question = document.getElementById("question");
const container = document.getElementsByClassName("container");
const choices = Array.from(document.getElementsByClassName('choice-text'));
const answerIs = document.querySelector("#answerIs")
const initials = document.querySelector("#initials")
// const startButton = document.getElementsByClassName("strBtn");




// let saveBtn = document.createElement("button");
//   saveBtn.className = "answerBtn";
//   initials.appendChild(saveBtn);

var oneMinute = 59; 
var seconds = {};

display = document.querySelector('#time');


startTimer(oneMinute, display);


function startTimer(duration, display) {
  var timer = duration, seconds;
  var myClock = setInterval(function () {
    // minutes = parseInt(timer / 60, 10)
    seconds = parseInt(timer % 60, 10);

    // minutes = minutes < 10 ? "0" + minutes : minutes;
    // seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = seconds;

    
    
    
    

    if (--timer < 0) {
      // timer = duration;
      clearInterval(myClock);
      clearQuiz(); 
    } else if(availableQuestions.length === 0) {
      clearInterval(myClock);
      
      // clearQuiz();
    }
  }, 1000);

  choices.forEach(choice => {
    choice.addEventListener("click", function(event) {
      if(!acceptingAnswers) return;

      acceptingAnswers = false
      const selectedChoice = event.target;
      const selectedAnswer = selectedChoice.dataset["answer"];

      var classToApply = "incorrect";
        if(selectedAnswer == currentQuestion.answer) {
          classToApply = "correct";
        } else {
          timer = seconds - 10;
          display.textContent = timer;
          console.log(seconds - 10);
        }
        
        
        

        
        

      answerIs.className = "answerCheck"
      answerIs.innerText = classToApply;

      setTimeout( () => {
        answerIs.className = "answerGone"
        getNewQuestion();
      }, 1000);

      
      
      
      

    });
  });

  
}




let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

var myQuestions = [
	{
		question: "A modal is also known as a what?",
		choice1: 'index',
		choice2: 'pop-up',
		choice3: 'function',
    choice4: 'DOM',
		answer: 2
	},
	{
		question: "A variable is a named location for a ______ that gets stored in the browser's memory when a program is run",
		choice1: 'value',
		choice2: 'comment',
		choice3: 'object',
    choice4: 'file',
		answer: 1
	},
  {
		question: "______are created using curly brackets, and object properties are defined within using property: value syntax and separated by a comma.",
		choice1: 'variable',
		choice2: 'ad',
		choice3: 'object',
    choice4: 'console',
		answer: 3
	},
	{
		question: "To ______ the function, add the function name with parentheses and a semicolon",
		choice1: 'click',
		choice2: 'delete',
		choice3: 'copy',
    choice4: 'call',
		answer: 4
	},
  {
		question: "An array always starts with ____ unless otherwise defined",
		choice1: '0',
		choice2: '1',
		choice3: '10',
    choice4: 'null',
		answer: 1
	}

];

const maxQuestions = 5;

function startGame() {
  questionCounter = 0;
  availableQuestions = [...myQuestions];

  getNewQuestion();

  


};

function getNewQuestion() {

  if(availableQuestions.length === 0 || questionCounter > maxQuestions ) {
    clearQuiz();
    
    return;
  }

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach( choice => {
    const answer = choice.dataset['answer'];
    choice.innerText = currentQuestion["choice" + answer];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};



function clearQuiz(){
  var clear = document.getElementById("quiz");
  if (clear.style.display == "none") {
      clear.style.display = "block";
  } else {
      clear.style.display = "none";
  } 
  
  endGame();
  
}

function endGame() {
  initialsForm = document.createElement("form");
  yourInitials = document.createElement("input");

  yourInitials.type="text";
  yourInitials.name="initials";
  yourInitials.id="initials";
  yourInitials.placeholder="type initials";
  initialsForm.appendChild(yourInitials);

  let saveBtn = document.createElement("button");
  saveBtn.className = "answerBtn";
  saveBtn.id="save";
  saveBtn.textContent = "SAVE"

  let backBtn = document.createElement("button");
  backBtn.className = "answerBtn";
  backBtn.id="back";
  backBtn.href="./index.html";
  backBtn.textContent = "Go Back"



  document.body.appendChild(saveBtn);

  document.body.appendChild(backBtn);

  document.body.appendChild(initialsForm);



  // initialsForm.submit();



}

startGame();

