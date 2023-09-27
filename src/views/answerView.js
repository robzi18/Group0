
/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText) => {
  const element = document.createElement('li');
  element.id = `answer-box-${key}`
  element.innerHTML = String.raw`
  <div class="answer-box">
  <div class="answer-option">
  <p>
    ${key}: ${answerText};
  </p>
  </div>

  </div>
  `;
  return element;
};
