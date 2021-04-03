const getElem = (id) => document.getElementById(id);
const createEl = (teg) => document.createElement(teg);
const inputX = getElem('impx');
const inputY = getElem('impy');
const table = getElem('tbl');
const btnClear = getElem('clear-field-btn');
const btnRandom = getElem('random-field-btn');
const btnStart = getElem('start');
let x;
let y;
let arr = [[0]];
let action = false;
let funcInterval;
let score = getElem('Score');
let count1 = 0;
const defGame = () => {
    clearInterval(funcInterval);
    count1 = 0;
    score.innerHTML = `Дней: ${count1}`;
};
inputX.oninput = (event) => {
    defGame();
    x = +event.target.value;
    if (x) {
        let arrW = arr.length;
        arr = [];
        arr = new Array(arrW).fill(new Array(x).fill(0));
        createTable(arr);
        console.log(arr);
    }
};
inputY.oninput = (event) => {
    defGame();
    y = +event.target.value;
    if (y) {
        let arrH = arr[0].length;
        arr = [];
        arr = new Array(y).fill(new Array(arrH).fill(0));
        createTable(arr);
        console.log(arr);
    }
};
function createTable(arr1) {
    table.innerHTML = '';
    arr1.forEach((elem, i) => {
        let tr = createEl('tr');
        elem.forEach((elem1, j) => {
            let td = createEl('td');
            if (arr1[i][j]) {
                td.className = 'td-black';
            } else {
                td.className = 'td-white';
            }
            td.onclick = () => {
                if (arr[i][j]) {
                    arr = arr.map((item, keyX) => item.map((item1, keyY) => keyX === i && keyY === j ? 0 : item1));
                    td.className = 'td-white';
                } else {
                    arr = arr.map((item, keyX) => item.map((item1, keyY) => keyX === i && keyY === j ? 1 : item1));
                    td.className = 'td-black';
                }
                console.log(arr);
            }
            tr.appendChild(td);
        })
        table.appendChild(tr);
    });
};
createTable(arr);
const clearArr = (fillArr) => fillArr.map((item) => item.map(() => 0));
const randomArr = (anyArr) => anyArr.map(item => item.map(() => Math.round(Math.random())));
btnClear.onclick = () => {
    defGame();
    arr = clearArr(arr);
    createTable(arr);
};
btnRandom.onclick = () => {
    defGame();
    arr = randomArr(arr);
    createTable(arr);
};
const cellStart = () => {
    return arr.map((item, i, arr1) => item.map((item1, j) => {
        let count = 0;
        if (arr1[i - 1 < 0 ? item.length - 1 : i - 1][j] === 1) count++;
        if (arr1[i][j + 1 > arr1.length - 1 ? 0 : j + 1] === 1) count++;
        if (arr1[i + 1 > item.length - 1 ? 0 : i + 1][j] === 1) count++;
        if (arr1[i][j - 1 < 0 ? arr1.length - 1 : j - 1] === 1) count++;
        if (arr1[i - 1 < 0 ? item.length - 1 : i - 1][j - 1 < 0 ? arr1.length - 1 : j - 1] === 1) count++;
        if (arr1[i - 1 < 0 ? item.length - 1 : i - 1][j + 1 > arr1.length - 1 ? 0 : j + 1] === 1) count++;
        if (arr1[i + 1 > item.length - 1 ? 0 : i + 1][j - 1 < 0 ? arr1.length - 1 : j - 1] === 1) count++;
        if (arr1[i + 1 > item.length - 1 ? 0 : i + 1][j + 1 > arr1.length - 1 ? 0 : j + 1] === 1) count++;
        if (item1 === 0) {
            if (count === 3) { return 1 } else { return 0 };
        } else {
            if (count === 2 || count === 3) { return 1 }
            else { return 0 };
        }
    }));
};
btnStart.onclick = () => {
    if (action) {
        clearInterval(funcInterval);
        action = false;
        btnStart.textContent = 'Start';
    } else {
        funcInterval = setInterval(() => {
            arr = cellStart();
            createTable(arr);
            count1++;
            score.innerHTML = `Days: ${count1}`;
        }, 400);
        btnStart.textContent = 'Stop';
        action = true;
    }
};
