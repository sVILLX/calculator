const display = document.getElementById('display');

const numbers = document.querySelectorAll('.number');
const symbols = document.querySelectorAll('.symbol');

const reset = document.getElementById('reset');
const negative = document.getElementById('negative');
const percentage = document.getElementById('percentage');
const equal = document.getElementById('equal');
const dot = document.getElementById('dot');

let firstValue = '';
let secondValue = '';
let operator = '';
let counter = 0;
let result = 0;

const operators = ['+', '-', '*', '/'];

numbers.forEach(number => {
    number.addEventListener('click', (event) => {
        // si el display es 0, lo reemplaza por el numero seleccionado
        if (display.textContent === '0') {
            display.textContent = event.target.textContent;
        } else {
            display.textContent += event.target.textContent;
        }
        
        // agrega el numero al primer o segundo valor segun el contador
        if (counter === 0) {
            firstValue += event.target.textContent;
        } else {
            secondValue += event.target.textContent;
        }
    });
});

symbols.forEach(symbol => {
    symbol.addEventListener('click', (event) => {
        // si el simbolo es '.', se agrega un punto decimal al primer o segundo valor
        if (event.target.textContent === '.') {
            if (counter === 0) {
                if (!firstValue.includes('.')) {
                    firstValue += '.';
                    display.textContent += '.';
                }
            } else {
                if (!secondValue.includes('.')) {
                    secondValue += '.';
                    display.textContent += '.';
                }
            }

            return; // salimos para no seguir con el resto del código
        }

        if (event.target.textContent === '+/-') {
            if (counter === 0) {
                firstValue = '-' + firstValue;
            } else {
                secondValue = '-' + secondValue;
            }
            return;
        }

        counter = 1;
        
        if (event.target.textContent !== '=') {
            display.textContent += event.target.textContent;
            operator = event.target.textContent;

            if (event.target.textContent === 'AC') {
                // resetear todo
                display.textContent = '0';
                firstValue = '';
                secondValue = '';
                operator = '';
                counter = 0;
            }
        }
        else {
            // se realiza la operacion
            console.log('Operación a realizar: ', firstValue, operator, secondValue);
            switch (operator) {
                case '+': 
                    result = Number(firstValue) + Number(secondValue); 
                    break;
                case '-':
                    result = Number(firstValue) - Number(secondValue);
                    break;
                case 'x':
                    result = Number(firstValue) * Number(secondValue);
                    break;
                case '÷':
                    result = (Number(firstValue) / Number(secondValue)); // 4 decimales
                    // si no es un entero
                    if (result % 1 !== 0) { 
                        result = result.toFixed(4); // redondea a 4 decimales
                    }
                    break;
                case '%':
                    result = Number(firstValue) % Number(secondValue);
                    break;
            }

            display.textContent = result;

            // imprimir el resultado en la consola
            console.log('Resultado: ', result);

            // resetear todo
            firstValue = '';
            secondValue = '';
            operator = '';
            counter = 0;
        }

    });
});
