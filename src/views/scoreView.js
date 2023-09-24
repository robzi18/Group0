/**
 * Create an score element
 * @returns {Element}
 */
export const createScoreElement = (score) =>{
    const element = document.createElement('div');
    element.classList.add('score-element');
    element.innerHTML = `
    <h3> Your Score </h3>
    <p> ${score} point${score === 1 ? '' : 's'} </p>
    `;
    return element;
}
