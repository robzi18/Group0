
/**
 * Create an Answer element
 * @returns {Element}
 */
export const createAnswerElement = (key, answerText, imageSrc) => {
  const element = document.createElement('li');
  element.id = `answer-box-${key}`
  element.innerHTML = String.raw`
  <div class="answer-box">

  <div class="answer-img">
    <img src="${imageSrc}">
  </div>

  <div class="answer-option">
    <p>
     ${answerText}
    </p>
  </div>

  </div>
  `;
  return element;
};
