import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  SKIP_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { createScoreElement } from '../views/scoreView.js';

let userScore = 0;
export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';
  


  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];

  // const questionElement = createQuestionElement(currentQuestion.text);
  const questionElement = createQuestionElement(currentQuestion);

  userInterface.appendChild(questionElement);

  //create scoreElement with the initial score 0 and append it
  const scoreElement = createScoreElement(userScore);
  userInterface.appendChild(scoreElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);





  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);

     // Add a click event listener to each answer element
    answerElement.addEventListener('click', () => {
    currentQuestion.selected = key; // Update the selected answer
    updateScore(); // Update the score
    getCorrectAnswer();
    

  });
    answersListElement.appendChild(answerElement);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);

  document
    .getElementById(SKIP_QUESTION_BUTTON_ID)
    .addEventListener('click', skipQuestion);
};

//updating the score depends on tje user answers
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
//A user can see what the correct answer is after they selected their answer
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
  
  //skip current question and shows next question after 2 seconds
  const skipQuestion = () =>{
    const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
    const correctAnswer = currentQuestion.correct;
    const CorrectAnswerBox = document.getElementById(`answer-box-${correctAnswer}`);
    CorrectAnswerBox.style.background = '#9ACD32';
    setTimeout(nextQuestion,2000);
  }

const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  initQuestionPage();
};
document.addEventListener('DOMContentLoaded', () => {
  initQuestionPage();
});
