import { START_QUIZ_BUTTON_ID,GO_AGAIN_BUTTON_ID } from '../constants.js';


/**
 * Create a full question element
 * @returns {Element}
 */

export const createTotalScoreView = (userScore,totalQuestions)=>{
    
    const element = document.createElement("div");
    element.innerHTML = String.raw`
    <div class="container">
      <div class="column">
        <h1>Congratulations</h1>
        <h1>
        Your score is
        </h1>
        <h1>${userScore} / ${totalQuestions} </h1>
        <button id="${GO_AGAIN_BUTTON_ID}">
        Take The Quiz Again
      </button>
      </div>
    </div>
    `;
    return element
}
