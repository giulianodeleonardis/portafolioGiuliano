let arrayOfWordsSelected = [];

function buttonGeratorWords() {
    const words = document.getElementById('words').value.split(' ').map(word => word.trim().toUpperCase());
    // Filtering words equal or greater to 3
    const wordsFiltered = words.filter(word => {
        // Remove special characters and numbers
        const cleanWord_1 = word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, '');
        // Check is the celan word have a length equal or greater to 3
        return cleanWord_1.length > 3;
    }).map(word => {
        // Remove special characters and numbers to the words that passed the first filter
        let cleanWord_2 = word.normalize("NFD").replace(/[\u0301]/g, "");
        return cleanWord_2.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, '');
    });
    const wordsUnique = new Set(wordsFiltered);
    const arrayWordsUnique = Array.from(wordsUnique);

    displayWordListToSelect(arrayWordsUnique, 'wordListToSelect');
}

function generateWordSearch() {
    let listWordsCheckbox = document.querySelectorAll(".word-list-item__label");
    let partOfNameId = 'uncheck';
    let eachIdOfCheckBox;
    arrayOfWordsSelected = [];
    for (let i = 0; i < listWordsCheckbox.length; i++) {
        let idNumber = i;
        eachIdOfCheckBox = '';
        eachIdOfCheckBox = document.getElementById(partOfNameId + idNumber);
        if (listWordsCheckbox[i].control.check === true) {
            arrayOfWordsSelected.push(listWordsCheckbox[i].innerText);
        }
    }
    const size = parseInt(document.getElementById('size').value);
    const words = arrayOfWordsSelected.map(word => word.trim().toUpperCase());

    // Filtering words equal or greater to 3
    const wordsFiltered = words.filter(word => {
        // Remove special characters and numbers
        const cleanWord = word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, '');
        // Check is the celan word have a length equal or greater to 3
        return cleanWord.length > 3;
    }).map(word => {
        // Remove special characters and numbers to the words that passed the first filter
        return word.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/g, '');
    });
    const wordsUnique = new Set(wordsFiltered);
    const arrayWordsUnique = Array.from(wordsUnique);

    if (isNaN(size) || size < 5 || size > 20) {
        alert("El tamaño de la tabla debe estar entre 5 y 20.");
        return;
    }

    const table = createEmptyTable(size);
    const answerTable = createEmptyTable(size);
    if (!placeWordsInTable(table, answerTable, arrayWordsUnique, size)) {
        alert("No se pudieron colocar todas las palabras en la tabla. Intente con un tamaño mayor o menos palabras.");
        return;
    }
    fillEmptySpaces(table, size);
    displayTable(table, size, 'wordSearchContainer');
    displayTable(answerTable, size, 'wordSearchContainer', true);
    //displayWordListToSelect(arrayWordsUnique, 'wordListToSelect');
    //displayWordList(arrayWordsUnique, 'wordListContainer');

    //List of words selected
    const wordsSelectedContainer = document.getElementById("wordsSelected");
    wordsSelectedContainer.style.width = "40%";
    wordsSelectedContainer.style.margin = "0 auto"
    const columns = 3;
    const columnSize = Math.ceil(words.length / columns);
    const qtyOfWords = words.length;
    const h3Element = document.createElement("h3");
    h3Element.innerText = "Lista de palabras seleccionadas";
    wordsSelectedContainer.appendChild(h3Element);
    for (let i = 0; i < columns; i++) {
        const divItem = document.createElement('div');
        divItem.classList.add('word-list-item');
        for (let j = 0; j < columnSize; j++) {
            const wordIndex = i * columnSize + j;
            if (wordIndex < qtyOfWords) {
                let nameForEachCheck = "check" + (wordIndex);
                const labelTag = document.createElement("label");
                labelTag.setAttribute("for", nameForEachCheck);
                labelTag.setAttribute("class", "word-list-item__label");
                let labelText = document.createTextNode(words[wordIndex]);
                const inputTag = document.createElement('input');
                labelTag.appendChild(labelText);
                divItem.appendChild(labelTag);
                //br HTML tag
                const brTag = document.createElement("br");
                divItem.appendChild(brTag);
            }
        }

        wordsSelectedContainer.appendChild(divItem);
    }
}

function createEmptyTable(size) {
    const table = [];
    for (let i = 0; i < size; i++) {
        table[i] = Array(size).fill('');
    }
    return table;
}

function placeWordsInTable(table, answerTable, arrayWordsUnique, size) {
    const directions = [
        { x: 1, y: 0 }, { x: -1, y: 0 }, // Horizontal
        { x: 0, y: 1 }, { x: 0, y: -1 }, // Vertical
        { x: 1, y: 1 }, { x: -1, y: -1 }, // Diagonal (down-right and up-left)
        { x: 1, y: -1 }, { x: -1, y: 1 }  // Diagonal (up-right and down-left)
    ];

    for (let word of arrayWordsUnique) {
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

let tableCounter = 0;
function displayTable(table, size, containerId, isAnswer = false) {
    tableCounter++;
    const container = document.getElementById(containerId);
    const tableElem = document.createElement('table');

    tableElem.id = `table-${tableCounter}`; // ID único

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
    // 🔸 Crear el botón 📸
    const copyBtn = document.createElement('div');
    copyBtn.className = 'copy-img-btn';
    copyBtn.textContent = '📸';

    // Agrupar en un contenedor individual (opcional pero útil)
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrapper'; // para estilo si deseas
    if (tableElem.id) wrapper.id = `wrapper-${tableElem.id}`; // opcional

    wrapper.appendChild(copyBtn);   // Agrega el botón primero (esquina superior derecha)
    container.appendChild(wrapper); // Agrega el contenedor al DOM
    wrapper.appendChild(tableElem); // Luego agrega la tabla al contenedor
    //container.appendChild(tableElem);

    document.querySelectorAll('.copy-img-btn').forEach(button => {
        button.addEventListener('click', async () => {
            const container = button.parentElement;

            // Ocultamos el botón temporalmente para no capturarlo
            button.style.visibility = 'hidden';

            const canvas = await html2canvas(container);
            button.style.visibility = 'visible';

            canvas.toBlob(blob => {
                if (!blob) return;

                // Usamos el portapapeles si está disponible
                if (navigator.clipboard && navigator.clipboard.write) {
                    const item = new ClipboardItem({ "image/png": blob });
                    navigator.clipboard.write([item]).then(() => {
                        button.textContent = '✅';
                        setTimeout(() => button.textContent = '📸', 1500);
                    });
                } else {
                    alert("Tu navegador no permite copiar imágenes al portapapeles.");
                }
            });
        });
    });

}

function displayWordListToSelect(words, container) {
    const wordListContainer = document.getElementById(container);
    //wordListContainer.innerHTML = '';

    const columns = 3;
    const columnSize = Math.ceil(words.length / columns);
    const qtyOfWords = words.length;
    const bullet = '◯ ';
    for (let i = 0; i < columns; i++) {
        const divItem = document.createElement('div');
        divItem.classList.add('word-list-item');
        for (let j = 0; j < columnSize; j++) {
            const wordIndex = i * columnSize + j;
            if (wordIndex < qtyOfWords) {
                let nameForEachCheck = "check" + (wordIndex);
                let idForLabel = "label-check" + (wordIndex);
                const labelTag = document.createElement("label");
                labelTag.setAttribute("for", nameForEachCheck);
                labelTag.setAttribute("class", "word-list-item__label");
                labelTag.setAttribute("id", idForLabel);
                let labelText = document.createTextNode(bullet + words[wordIndex]);
                const inputTag = document.createElement('input');
                inputTag.setAttribute("type", "checkbox");
                inputTag.setAttribute("name", nameForEachCheck);
                inputTag.setAttribute("id", nameForEachCheck);
                inputTag.setAttribute("class", "inputTypeCheck");
                inputTag.setAttribute("check", false);
                labelTag.appendChild(inputTag);
                labelTag.appendChild(labelText);
                divItem.appendChild(labelTag);
                //br HTML tag
                const brTag = document.createElement("br");
                divItem.appendChild(brTag);
                inputTag.addEventListener('change', updateCount);
            }
        }
        wordListContainer.appendChild(divItem);
    }
    const qtyOfWordsToSelect = document.getElementById("qtyOfWordsToSelect");
    const labelTagQtyWords = document.createElement("label");
    labelTagQtyWords.setAttribute("id", "qtyWordListToSelect");
    qtyOfWordsToSelect.appendChild(labelTagQtyWords);
    updateCount();
}

function displayWordList(words, container) {
    const wordListContainer = document.getElementById(container);
    //wordListContainer.innerHTML = '';

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
    const displayQtyOfWords = document.getElementById("qtyOfWordsToSelect");
    const listOfWords = document.getElementById("wordListToSelect");
    const listOfWordsSelected = document.getElementById("wordsSelected");
    wordListContainer.innerHTML = '';
    inputOfSizeCrossWord.value = '';
    words.value = '';
    displayQtyOfWords.innerHTML = '';
    listOfWords.innerHTML = '';
    listOfWordsSelected.innerHTML = '';
    wordSearchContainer.innerHTML = '';
}


// Display de quantity of words selected
function updateCount() {
    if (!this.check) {
        this.check = true;  // Marcar como checked
    }
    else if (this.check) {
        this.check = false;  // Marcar como unchecked
    }


    const countDisplay = document.getElementById('qtyWordListToSelect');
    const checkedCount = document.querySelectorAll('.inputTypeCheck:checked').length;
    countDisplay.textContent = checkedCount;
}


