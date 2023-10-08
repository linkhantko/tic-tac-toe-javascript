const gameboard = document.querySelector('#gameboard')
const info = document.querySelector('#info')
const starCells = [
    "", "", "", "", "", "", "", "", "",
]

let go = 'circle'
info.textContent = "Circle Go First!"

function createBoard() {
    starCells.forEach((_cell, index) => {
        const cellElement = document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index
        cellElement.addEventListener('click', addGo)
        gameboard.append(cellElement)
    })

}

createBoard()

function addGo(e) {
    const goDisplay = document.createElement('div')
    goDisplay.classList.add(go)
    e.target.append(goDisplay)
    go = go === "circle" ? "cross" : "circle"
    info.textContent = "It is now " + go + "'s go."
    e.target.removeEventListener('click', addGo)
    checkScore();
}

function checkScore() {
    const allSquare = document.querySelectorAll(".square")
    const winning = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    winning.forEach(array => {
        const circleWin = array.every(cell => allSquare[cell].firstChild?.classList.contains('circle'))
        if (circleWin) {
            info.textContent = "Circle Win!"
            allSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })

    winning.forEach(array => {
        const crossWin = array.every(cell => allSquare[cell].firstChild?.classList.contains('cross'))
        if (crossWin) {
            info.textContent = "Cross Win!"
            allSquare.forEach(square => square.replaceWith(square.cloneNode(true)))
            return
        }
    })
}