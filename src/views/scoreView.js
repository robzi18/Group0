/**
 * Create an score element
 * @returns {Element}
 */
export const createScoreElement = (score) =>{
    const scoreElement = document.createElement('div');
    scoreElement.innerHTML = `
    <h3> Your Score </h3>
    <p> ${score} point${score === 1 ? '' : 's'} </p>
    `;


}
