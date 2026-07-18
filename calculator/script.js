let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetScreen = false;
let scientificMode = null;

const display = document.getElementById('display');
const previousDisplay = document.getElementById('previous-operand');
const historyList = document.getElementById('history-list');

// Keyboard Mapping
window.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '=' || e.key === 'Enter') calculate();
    if (e.key === 'Backspace') deleteNumber();
    if (e.key === 'Escape') clearDisplay();
    if (['+', '-', '*', '/', '%'].includes(e.key)) appendOperator(e.key);
}

function appendNumber(number) {
    if (display.innerText === '0' || shouldResetScreen) {
        resetScreen();
    }
    if (number === '.' && currentInput.includes('.')) return;
    currentInput += number;
    updateDisplay();
}

function resetScreen() {
    currentInput = '';
    shouldResetScreen = false;
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    scientificMode = null;
    previousDisplay.innerText = '';
    updateDisplay();
}

function deleteNumber() {
    if (currentInput === '0') return;
    if (currentInput.length === 1) {
        currentInput = '0';
    } else {
        currentInput = currentInput.slice(0, -1);
    }
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) calculate();
    previousInput = currentInput;
    operator = op;
    previousDisplay.innerText = `${previousInput} ${getOperatorSymbol(op)}`;
    shouldResetScreen = true;
}

function getOperatorSymbol(op) {
    if (op === '*') return '×';
    if (op === '/') return '÷';
    return op;
}

function scientific(func) {
    let val = parseFloat(currentInput);
    let expr = '';
    let result = 0;

    switch(func) {
        case 'sin': expr = `sin(${val})`; result = Math.sin(val * Math.PI / 180); break; // Degree
        case 'cos': expr = `cos(${val})`; result = Math.cos(val * Math.PI / 180); break;
        case 'tan': expr = `tan(${val})`; result = Math.tan(val * Math.PI / 180); break;
        case 'sqrt': expr = `√(${val})`; if(val < 0) return alert('Invalid Input'); result = Math.sqrt(val); break;
        case 'log': expr = `log(${val})`; result = Math.log10(val); break;
        case 'ln': expr = `ln(${val})`; result = Math.log(val); break;
        case 'pi': currentInput = Math.PI.toString(); updateDisplay(); return;
        case 'pow': 
            previousInput = currentInput;
            operator = '^';
            previousDisplay.innerText = `${previousInput} ^`;
            shouldResetScreen = true;
            return;
    }

    if (func !== 'pow') {
        let finalRes = roundResult(result).toString();
        addHistoryItem(expr, finalRes);
        currentInput = finalRes;
        shouldResetScreen = true;
        updateDisplay();
    }
}

function calculate() {
    if (operator === null || shouldResetScreen) return;
    
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let expr = `${previousInput} ${getOperatorSymbol(operator)} ${currentInput}`;
    
    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': 
            if (current === 0) { alert("Cannot divide by zero"); clearDisplay(); return; }
            result = prev / current; 
            break;
        case '%': result = prev % current; break;
        case '^': expr = `${previousInput}^${currentInput}`; result = Math.pow(prev, current); break;
        default: return;
    }
    
    let finalRes = roundResult(result).toString();
    addHistoryItem(expr, finalRes);
    currentInput = finalRes;
    operator = null;
    previousDisplay.innerText = '';
    shouldResetScreen = true;
    updateDisplay();
}

function roundResult(number) {
    return Math.round(number * 1000000) / 1000000;
}

function updateDisplay() {
    display.innerText = currentInput;
}

// History Handling Logic
function toggleHistory() {
    document.getElementById('history-panel').classList.toggle('active');
}

function addHistoryItem(expr, res) {
    const emptyMsg = historyList.querySelector('.empty-msg');
    if (emptyMsg) emptyMsg.remove();

    const item = document.createElement('div');
    item.className = 'history-item';
    item.innerHTML = `<div class="hist-expr">${expr} =</div><div class="hist-res">${res}</div>`;
    
    item.addEventListener('click', () => {
        currentInput = res;
        updateDisplay();
    });

    historyList.insertBefore(item, historyList.firstChild);
}

function clearHistory() {
    historyList.innerHTML = '<p class="empty-msg">No history yet</p>';
}

// UI Mode Toggle
function toggleTheme() {
    document.body.classList.toggle('light-theme');
}