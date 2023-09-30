import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  GO_AGAIN_BUTTON_ID
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { createScoreElement } from '../views/scoreView.js';
import { createTotalScoreView } from '../views/totalScoreView.js';
import { loadApp } from '../app.js';

// Variable to store the user score
let userScore = 0;


export const initQuestionPage = () => {
// Variable to track whether an answer has been selected
  let answerSelected = false;

  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';
  


  // Append current question element
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    const questionElement = createQuestionElement(currentQuestion);
    userInterface.appendChild(questionElement);
  
  
 

  // HERE FANCY TRANSITION
    questionElement.classList.add("animated-box")
    questionElement.style.opacity = "0"; // FADE OUT THE ALL THE BOX
    setTimeout(() => {
      questionElement.style.opacity = "1"; // FADE IN THE ALL THE BOX
      questionElement.style.transform= "translateY(0%)";

    }, 120);


  // Create scoreElement with the initial score 0 and append it
  const scoreElement = createScoreElement(userScore);
  userInterface.appendChild(scoreElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  //For each answer option of the Current Question
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const imageSrc = currentQuestion.images[key];
    const answerElement = createAnswerElement(key, answerText, imageSrc);

    // Add a click event listener to each answer element
    answerElement.addEventListener('click', () => {
      if (!answerSelected) {
        // Mark that an answer has been selected
        answerSelected = true;

        // Update the selected answer
        currentQuestion.selected = key;

        // Update the score
        updateScore();

        // Show correct answer
        getCorrectAnswer();

        //Disable answer options
        disableAnswerOptions();

        // Disable the Skip Question button
        const skipQuestionButton = document.getElementById(SKIP_QUESTION_BUTTON_ID);
        if (skipQuestionButton) {
          skipQuestionButton.disabled = true;
        }
      }
    });

    answersListElement.appendChild(answerElement);
  }

  // Next Question Button
  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);

  // Skip Question Button
  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', skipQuestion);
};

// Updating the score depends on the user answers
const updateScore = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const correctAnswer = currentQuestion.correct;
  const selectedAnswer = currentQuestion.selected;
  if( correctAnswer === selectedAnswer){
      userScore++;
  }
    const scoreElement = document.getElementById('score');
    scoreElement.innerHTML =`${userScore} point${userScore === 1 ? '' : 's'} `;
}

// A user can see what the correct answer is after they selected their answer
const getCorrectAnswer = ()=> {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const correctAnswer = currentQuestion.correct;
  const selectedAnswer = currentQuestion.selected;
  const selectedAnswerBox = document.getElementById(`answer-box-${selectedAnswer}`);
  const CorrectAnswerBox = document.getElementById(`answer-box-${correctAnswer}`);
  if( correctAnswer === selectedAnswer){
    selectedAnswerBox.style.backgroundColor = '#9ACD32';
  }
  else {
    selectedAnswerBox.style.backgroundColor = '	#DC143C';
    CorrectAnswerBox.style.background = '#9ACD32';
  }
}
  
// Skip current question and show next question after 2 seconds
const skipQuestion = () =>{
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const correctAnswer = currentQuestion.correct;
  const CorrectAnswerBox = document.getElementById(`answer-box-${correctAnswer}`);
  CorrectAnswerBox.style.background = '#9ACD32';
  setTimeout(nextQuestion,1000);
}

// Disable answer options
const disableAnswerOptions = () => {
  // Select elements with id starting with "answer-box-"
  const answerElements = document.querySelectorAll('[id^="answer-box-"]');
  answerElements.forEach((element) => {
    // Disable click events
    element.style.pointerEvents = 'none';
  });
};

//TOTAL SCORE PAGE
const totalScorePage = ()=>{
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';
  const totalQuestions = quizData.questions
  const totalScore = createTotalScoreView(userScore,totalQuestions.length)
  userInterface.appendChild(totalScore)
  const takeQuizAgain = document.getElementById( GO_AGAIN_BUTTON_ID)
  takeQuizAgain.addEventListener("click",()=>{
    loadApp()
  })

} 
  
// Go to next question
const nextQuestion = () => {

  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  // CHECK WHICH QUESTION NUMBER IS
  if(quizData.currentQuestionIndex !== 10){
  
  initQuestionPage();
}else{
  // IF USER REACHES FINAL QUESTION GO TO TOTAL SCORE PAGE
  totalScorePage()
}
  
};

document.addEventListener('DOMContentLoaded', () => {
  initQuestionPage();
});
