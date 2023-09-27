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
let coA = ""
let seA = ""
  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
  
    const answerElement = createAnswerElement(key, answerText,currentQuestion.correct);
  answerElement.addEventListener("click",function(){
   alert( key)
   seA = key
   return key

  })

    answersListElement.appendChild(answerElement);
    // updateScore(key,currentQuestion.correct)
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);

    return seA
};

//updating the score depends on tje user answers
const updateScore = () => {
  const boo = initQuestionPage()
  console.log("returned" ,boo)
  
  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  const correctAnswer = currentQuestion.correct;
  console.log("correctAns",correctAnswer)
  const selectedAnswer = currentQuestion.selected;
  console.log(selectedAnswer)
  if( correctAnswer === selectedAnswer){
      userScore++;
  }

}


const nextQuestion = () => {
  updateScore();
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;

  initQuestionPage();
};
document.addEventListener('DOMContentLoaded', () => {
  initQuestionPage();
});
