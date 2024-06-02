function generateWordSearch() {
    const size = parseInt(document.getElementById('size').value);
    const words = document.getElementById('words').value.split(',').map(word => word.trim().toUpperCase());

    if (isNaN(size) || size < 5 || size > 20) {
        alert("El tamaño de la tabla debe estar entre 5 y 20.");
        return;
    }

    const table = createEmptyTable(size);
    const answerTable = createEmptyTable(size);
    if (!placeWordsInTable(table, answerTable, words, size)) {
        alert("No se pudieron colocar todas las palabras en la tabla. Intente con un tamaño mayor o menos palabras.");
        return;
    }
    fillEmptySpaces(table, size);
    displayTable(table, size, 'wordSearchContainer');
    displayTable(answerTable, size, 'wordSearchContainer', true);
    displayWordList(words);
}

function createEmptyTable(size) {
    const table = [];
    for (let i = 0; i < size; i++) {
        table[i] = Array(size).fill('');
    }
    return table;
}

function placeWordsInTable(table, answerTable, words, size) {
    const directions = [
        { x: 1, y: 0 }, { x: -1, y: 0 }, // Horizontal
        { x: 0, y: 1 }, { x: 0, y: -1 }, // Vertical
        { x: 1, y: 1 }, { x: -1, y: -1 }, // Diagonal (down-right and up-left)
        { x: 1, y: -1 }, { x: -1, y: 1 }  // Diagonal (up-right and down-left)
    ];

    for (let word of words) {
        let placed = false;
        for (let attempts = 0; attempts < 100 && !placed; attempts++) {
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const startX = Math.floor(Math.random() * size);
            const startY = Math.floor(Math.random() * size);
            placed = tryPlaceWord(table, answerTable, word, startX, startY, direction, size);
        }
        if (!placed) return false;
    }
    return true;
}

function tryPlaceWord(table, answerTable, word, startX, startY, direction, size) {
    let x = startX, y = startY;
    for (let i = 0; i < word.length; i++) {
        if (x < 0 || x >= size || y < 0 || y >= size || (table[y][x] !== '' && table[y][x] !== word[i])) {
            return false;
        }
        x += direction.x;
        y += direction.y;
    }
    x = startX, y = startY;
    for (let i = 0; i < word.length; i++) {
        table[y][x] = word[i];
        answerTable[y][x] = word[i]; // Record the answer
        x += direction.x;
        y += direction.y;
    }
    return true;
}

function fillEmptySpaces(table, size) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (table[y][x] === '') {
                const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
                table[y][x] = randomLetter;
            }
        }
    }
}

function displayTable(table, size, containerId, isAnswer = false) {
    const container = document.getElementById(containerId);
    const tableElem = document.createElement('table');
    for (let y = 0; y < size; y++) {
        const row = document.createElement('tr');
        for (let x = 0; x < size; x++) {
            const cell = document.createElement('td');
            cell.textContent = table[y][x];
            if (isAnswer) {
                cell.classList.add('answer');
            }
            row.appendChild(cell);
        }
        tableElem.appendChild(row);
    }
    container.appendChild(tableElem);
}

function displayWordList(words) {
    const wordListContainer = document.getElementById('wordListContainer');
    wordListContainer.innerHTML = '';

    const columns = 3;
    const columnSize = Math.ceil(words.length / columns);

    for (let i = 0; i < columns; i++) {
        const column = document.createElement('ul');
        column.classList.add('word-list-column');

        for (let j = 0; j < columnSize; j++) {
            const wordIndex = i * columnSize + j;
            if (wordIndex < words.length) {
                const listItem = document.createElement('li');
                listItem.classList.add('word-list-item');
                listItem.textContent = '◯ ' + words[wordIndex];
                column.appendChild(listItem);
            }
        }
        wordListContainer.appendChild(column);
    }
}

function resetWordSearch() {
    const wordListContainer = document.getElementById('wordListContainer');
    const inputOfSizeCrossWord = document.getElementById('size');
    const words = document.getElementById('words');    
    const wordSearchContainer = document.getElementById('wordSearchContainer');
    wordListContainer.innerHTML = '';
    inputOfSizeCrossWord.value = '';
    words.value = '';
    wordSearchContainer.innerHTML = '';
}