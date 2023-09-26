
/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  element.innerHTML = String.raw`
  <div class="question-box">

  <div class="alternative">
    ${key}: ${answerText};

  </div>
  </div>
  `;
  return element;
};
