let result = '';
let history = '';

function appendToDisplay(value) {
    const display = document.getElementById('result');
    
    if (value === '.' && result.includes('.')) {
        return;
    }
    
    if (['+', '-', '*', '/'].includes(value)) {
        if (['+', '-', '*', '/'].includes(result.slice(-1))) {
            result = result.slice(0, -1) + value;
        } else {
            result += value;
        }
    } else {
        result += value;
    }
    
    display.textContent = result;
}

function clearDisplay() {
    result = '';
    history = '';
    document.getElementById('result').textContent = '0';
    document.getElementById('history').textContent = '';
}

function backspace() {
    result = result.slice(0, -1);
    document.getElementById('result').textContent = result || '0';
}

function calculate() {
    if (!result) return;
    
    const lastChar = result.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        result = result.slice(0, -1);
    }
    
    history = result;
    
    try {
        let computedResult = eval(result.replace('×', '*'));
        
        if (computedResult === Infinity || computedResult === -Infinity) {
            throw new Error('Cannot divide by zero');
        }
        
        if (isNaN(computedResult)) {
            throw new Error('Invalid expression');
        }
        
        computedResult = parseFloat(computedResult.toFixed(10));
        result = computedResult.toString();
        
        document.getElementById('result').textContent = result;
        document.getElementById('history').textContent = history + ' =';
    } catch (error) {
        document.getElementById('result').textContent = 'Error';
        document.getElementById('history').textContent = history;
        result = '';
    }
}