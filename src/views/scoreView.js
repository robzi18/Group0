/**
 * Create an score element
 * @returns {Element}
 */
export const createScoreElement = (score) =>{
    const element = document.createElement('div');
    element.classList.add('score-element');
    const h3 = document.createElement('h3');
    h3.innerHTML = "Your Score :";
    element.appendChild(h3);
    const p = document.createElement('p');
    p.innerHTML = `${score} point${score === 1 ? '' : 's'} `;
    p.id = 'score';
    element.appendChild(p);
    
    return element;
}
