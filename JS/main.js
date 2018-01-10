/*
Click to generate random color.
It will copy color rgb value and display the color, changing color of text based on color value.
It will display up to 20 previous colors that were generated.
Using the input field you can specify a color number previously generated
to copy and then click copy color and it will copy the color rgb value you chose.

USEFUL FOR CREATING A RANDOM COLOR AND COPYING COLOR RGB VALUE.
*/


const rand = ( s, e ) => {
    const random = s + Math.floor( Math.random() * (e-s+1) );
    return random;
}

const colorHolder = document.querySelector('.js-color-holder');
const squareHolder = document.querySelector('.js-square-holder');
const colorName = document.querySelector('.js-color-name');
const colorHistoryView = document.querySelector('.js-color-history')
const button = document.querySelector('.js-copy-button')
const copyNumberValue = document.querySelector('.js-color-number-input')
let colorHistory = []

const onClick = event => {
    const R = rand(0,255);
    const G = rand(0,255);
    const B = rand(0,255);
    const randomColor = `rgb(${R},${G},${B})`

    colorHolder.style.backgroundColor = randomColor;
    squareHolder.innerHTML += `<div class="square" style="background-color: ${randomColor}"></div>`
    const lastSquare = document.querySelector('.square:last-child')
    let colorStr = lastSquare.style.backgroundColor
    colorStr = colorStr.slice(colorStr.indexOf('(') + 1, colorStr.indexOf(')'));
    const colorArr = colorStr.split(',');

    if (colorArr[0] < 150 || colorArr[1] < 150 || colorArr[2] < 150) {
        colorHolder.style.color = "white";
        colorHolder.innerHTML = lastSquare.style.backgroundColor
        colorHistory.push(colorHolder.innerHTML)
        colorHistoryView.value = colorHistory
    }
    else {
        colorHolder.style.color = "black";
        colorHolder.innerHTML = lastSquare.style.backgroundColor
        colorHistory.push(colorHolder.innerHTML)
        colorHistoryView.value = colorHistory


    }
    const allSquares = document.querySelectorAll('.square')
    if (allSquares.length > 20) {
        squareHolder.innerHTML = ''
        colorHolder.style.backgroundColor = null
        colorHolder.innerHTML = 'Click to Generate Color'
        colorHolder.style.color = "white";
        colorHistory = []
        colorHistoryView.value = colorHistory
    }
}
const copyRgbColor = (event) => {
    colorName.value = colorHolder.style.backgroundColor
    colorName.select();
    document.execCommand("Copy");
}

const copyValue = () => {
    if (copyNumberValue.value > colorHistory.length) {
        alert("No color at the position to copy")
    }
    else {
    const num = copyNumberValue.value
    const copyHistoryValue = (num) => {
        colorHistoryView.value = colorHistory[num-1]
        colorHistoryView.select()
        document.execCommand('Copy')
    }
    copyHistoryValue(num)
    }
}

colorHolder.addEventListener('click', onClick);
colorHolder.addEventListener('click', copyRgbColor);
button.addEventListener('click', copyValue)
