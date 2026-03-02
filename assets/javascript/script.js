const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("[data-board]");
const winningMessageText = document.querySelector("[data-winning-message-text]")
const winningMessage = document.querySelector("[data-winning-message]")
const restartButton = document.querySelector("[data-restart-button]")
const playerScoreElement = document.querySelector(".playerScore");
const cpuScoreElement = document.querySelector(".cpuScore");

let playerScore = 0;
let cpuScore = 0;

let isOTurn;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

const startGame = () => {
    isOTurn = false;

    for (const cell of cellElements) {
        cell.classList.remove('o');
        cell.classList.remove('x');
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove('show-winning-message');
}

const endGame = (isDraw, winner) => {
    if (isDraw) {
        winningMessageText.innerText = 'Empate!';
    } else {
        if (winner === 'x') {
            playerScore++;
            playerScoreElement.innerText = playerScore;
            winningMessageText.innerText = 'Você venceu!';
        } else {
            cpuScore++;
            cpuScoreElement.innerText = cpuScore;
            winningMessageText.innerText = 'CPU venceu!';
        }
    }

    winningMessage.classList.add('show-winning-message')
}

const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [... cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

const setBoardHoverClass = () => {
    board.classList.remove('o', 'x');
    board.classList.add(isOTurn ? 'o' : 'x');
}

const swapTurns = () => {
    isOTurn = !isOTurn;

    setBoardHoverClass();
}

const handleClick = (e) => {
    const cell = e.target;
    const player = 'x';

    placeMark(cell, player)

    const isWin = checkForWin(player);
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false, player);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurns();

        setTimeout(() => {
            makeComputerMove();
        }, 500);
    }
};

const getWinningMove = (player) => {
    for (const combination of winningCombinations) {
        const cells = combination.map(index => cellElements[index]);

        const marks = cells.map(cell =>
            cell.classList.contains('x') ? 'x' :
            cell.classList.contains('o') ? 'o' : null
        );

        const countPlayer = marks.filter(mark => mark === player).length;
        const emptyIndex = marks.indexOf(null);

        if (countPlayer === 2 && emptyIndex !== -1) {
            return cells[emptyIndex];
        }
    }
    return null;
};

const makeComputerMove = () => {
    const computer = 'o';
    const player = 'x';

    let move = getWinningMove(computer);

    if (!move) {
        move = getWinningMove(player);
    }

    if (!move) {
        const availableCells = [... cellElements].filter(cell =>
        !cell.classList.contains('x') &&
        !cell.classList.contains('o')
        );

        const randomIndex = Math.floor(Math.random() * availableCells.length);
        if (availableCells.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableCells.length);
            move = availableCells[randomIndex];
        }
    }

    placeMark(move, computer);

    const isWin = checkForWin(computer);
    const isDraw = checkForDraw();

    if (isWin) {
        endGame(false, computer);
    } else if (isDraw) {
        endGame(true);
    } else {
        swapTurns();
    }
}

startGame();

restartButton.addEventListener("click", startGame);