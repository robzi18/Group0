import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
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
    const scoreElement = createScoreElement(userScore);
  userInterface.appendChild(scoreElement);
  });
    answersListElement.appendChild(answerElement);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
};

//updating the score depends on tje user answers
const updateScore = () => {
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const correctAnswer = currentQuestion.correct;
  const selectedAnswer = currentQuestion.selected;
  if( correctAnswer === selectedAnswer){
      userScore++;
  }

}



const nextQuestion = () => {
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  initQuestionPage();
};
document.addEventListener('DOMContentLoaded', () => {
  initQuestionPage();
});
