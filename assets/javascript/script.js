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
let startingPlayer = 'x';

// Cada array representa uma combinação vencedora
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

/*
    Iniciar / reiniciar o jogo
        - Limpa o tabuleiro, redefine eventos e remove mensagens de vitória
*/
const startGame = () => {
    isOTurn = startingPlayer === 'o';

    for (const cell of cellElements) {
        cell.classList.remove('o');
        cell.classList.remove('x');
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    }

    setBoardHoverClass();
    winningMessage.classList.remove('show-winning-message');

    startingPlayer = startingPlayer === 'x' ? 'o' : 'x';

    if (isOTurn) {
        setTimeout(() => {
            makeComputerMove();
        }, 500);
    }
}

/*
    Finalizar partida
        - Exibe mensagem de vitória ou empate, e atualiza o placar
*/
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


/*
    Verificar vitória
        - Retorna true se o jogador atual tiver uma combinação vencedora
*/
const checkForWin = (currentPlayer) => {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

/*
    Verificar empate
        - Retorna true se todas as células estiverem preenchidas.
*/
const checkForDraw = () => {
    return [... cellElements].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    })
}

// Adiciona a classe correspondente ao jogador na célula clicada.
const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
};

// Mostra visualmente de quem é a vez.
const setBoardHoverClass = () => {
    board.classList.remove('o', 'x');
    board.classList.add(isOTurn ? 'o' : 'x');
}

// Trocar turno
const swapTurns = () => {
    isOTurn = !isOTurn;

    setBoardHoverClass();
}

// Executada quando o jogador clica em uma célula
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

// Buscar jogada vencedora
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

/*
    Movimento da CPU
        - 1. Tenta vencer
        - 2. Tenta bloquear jogador
        - 3. Faz jogada aleatória
*/
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