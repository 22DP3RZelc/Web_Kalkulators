let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

document.getElementById('input-field').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate();
        event.preventDefault();
    }
});

function appendValue(value) {
    const inputField = document.getElementById('input-field');
    if (inputField.value === '0') {
        inputField.value = value;
    } else {
        inputField.value += value;
    }
}

function calculate() {
    const inputField = document.getElementById('input-field');
    try {
        const result = eval(inputField.value);
        addToHistory(inputField.value + ' = ' + result);
        if (result === Infinity || result === -Infinity || result === undefined) {
            inputField.placeholder = result;
            inputField.value = '';
        }
        else {
            inputField.value = result;
            inputField.placeholder = '0'
        }
    } catch {
        inputField.placeholder = 'Error';
        inputField.value = '';

    }
    inputField.focus();
}

function addToHistory(entry) {
    history.push(entry);
    updateHistoryUI();
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

function updateHistoryUI() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    history.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = entry;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'X';
        deleteButton.onclick = () => removeHistoryEntry(index);
        li.appendChild(deleteButton);
        historyList.appendChild(li);
    });
}

function removeHistoryEntry(index) {
    history.splice(index, 1);
    updateHistoryUI();
    localStorage.setItem('calcHistory', JSON.stringify(history));
    document.getElementById('input-field').focus()
}

function clearInput() {
    document.getElementById('input-field').value = '';
    document.getElementById('input-field').focus();
}

function clearHistory() {
    history = [];
    updateHistoryUI();
    localStorage.removeItem('calcHistory');
    document.getElementById('input-field').focus()
}

// Inicializācija
document.addEventListener('DOMContentLoaded', () => {
    updateHistoryUI();
});