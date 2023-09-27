import { START_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createWelcomeElement = () => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <h1 id="welcome-title"><span>Hello!</span> It's good to have you!</h1>
    <p id="welcome-message">Let's answer some fun riddles! :)</p>
    <button id="${START_QUIZ_BUTTON_ID}">Start Quiz</button>
  `;
  return element;
};