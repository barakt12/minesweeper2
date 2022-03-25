'use strict'
const SMILEY = '😄'
const SMILEY_WIN = '😎'
const SMILEY_LOSE = '🤯'
const MINE = '💣'
const FLAG = '🚩'

var gBoard
var gTimerIntervalId
var gLevel = {
  size: 4,
  mines: 2,
}
var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
  lives: 3,
  hints: 3,
  hintClicked: false,
}

function initGame() {
  gBoard = buildBoard()
  gGame.isOn = true
  gGame.secsPassed = 0
  clearInterval(gTimerIntervalId)
  gGame.lives = 3
  gGame.hints = 3
  renderDisplay()
  renderLives()
  renderHints()
  renderBoard(gBoard)
}

function buildBoard() {
  var board = []
  for (var i = 0; i < gLevel.size; i++) {
    board[i] = []
    for (var j = 0; j < gLevel.size; j++) {
      board[i][j] = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      }
    }
  }
  return board
}

function timer() {
  gTimerIntervalId = setInterval(() => {
    document.querySelector('.timer').innerText = gGame.secsPassed++
  }, 1000)
}

function clickedHint(elHint) {
  if (gGame.hintClicked && elHint.classList.contains('grow')) {
    gGame.hintClicked = false
    elHint.classList.remove('grow')
  } else if (gGame.hintClicked && !elHint.classList.contains('grow')) {
    return
  } else {
    gGame.hintClicked = true
    elHint.classList.add('grow')
  }
}

function setMinesNegsCount(cellI, cellJ, mat) {
  var mineCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= mat[i].length) continue
      if (mat[i][j].isMine) mineCount++
    }
  }
  gGame.shownCount++
  return mineCount
}

function expandShown(cellI, cellJ, elCell, isHintActive, isHidden) {
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= gBoard.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (j < 0 || j >= gBoard[i].length) continue
      elCell = document.querySelector(`.cell${i}-${j}`)
      var cell = gBoard[i][j]
      var minesCount = setMinesNegsCount(i, j, gBoard)
      if (isHintActive && !isHidden) {
        elCell.classList.add('shown')
        if (cell.isMine) elCell.innerText = MINE
        else elCell.innerText = minesCount
      } else if (isHintActive && isHidden && !cell.isShown) {
        elCell.innerText = ''
        elCell.classList.remove('shown')
      } else {
        if (!minesCount && !cell.isShown) {
          cell.isShown = true
          expandShown(i, j, elCell)
        }
        cell.minesAroundCount = minesCount
        colorNum(minesCount, elCell)
        cell.isShown = true
        if (minesCount) elCell.innerText = minesCount
        if (cell.isMarked) {
          gGame.markedCount--
          cell.isMarked = false
          elCell.innerText = minesCount
          countFlags()
        }
        elCell.classList.add('shown')
      }
    }
  }
}

function cellClicked(i, j, elCell) {
  var cell = gBoard[i][j]
  if (gGame.shownCount === 0) generateRandomMines(i, j)
  if (gGame.isOn && !gGame.secsPassed) {
    gGame.secsPassed = 1
    timer()
  }
  if (gGame.isOn && !cell.isMarked) {
    var minesAround = setMinesNegsCount(i, j, gBoard)
    if (gGame.hintClicked) {
      expandShown(i, j, elCell, true, false)
      gGame.hintClicked = false
      setTimeout(() => {
        expandShown(i, j, elCell, true, true)
        gGame.hints--
        renderHints()
      }, 1000)
      return
    }
    if (cell.isMine) {
      if (gGame.lives === 1) {
        elCell.style.backgroundColor = 'red'
        gameOver()
        return
      } else {
        gGame.lives--
        elCell.innerText = MINE
        elCell.classList.add('active')
        renderLives()
        setTimeout(() => {
          elCell.innerText = ''
          elCell.classList.remove('active')
        }, 1000)
      }
    } else if (!minesAround) {
      expandShown(i, j, elCell)
      cell.isShown = true
    } else {
      cell.minesAroundCount = minesAround
      elCell.innerText = minesAround
      colorNum(minesAround, elCell)
      cell.isShown = true
      elCell.classList.add('shown')
    }
  }
  checkVictory()
}

function flagCell(cellI, cellJ, elCell, ev) {
  ev.preventDefault()
  var cell = gBoard[cellI][cellJ]
  if (!cell.isShown && gGame.isOn) {
    if (!cell.isMarked) {
      if (gLevel.mines - gGame.markedCount > 0) {
        gGame.markedCount++
        cell.isMarked = true
        elCell.innerText = FLAG
      }
    } else {
      gGame.markedCount--
      cell.isMarked = false
      elCell.innerText = ''
    }
  }
  countFlags()
  checkVictory()
}

function restartGame() {
  gGame.isOn = false
  gGame.secsPassed = 1
  clearInterval(gTimerIntervalId)
  gGame.shownCount = 0
  gGame.markedCount = 0
  initGame()
}

function gameOver() {
  var elRestartBtn = document.querySelector('.restartBtn')
  elRestartBtn.innerText = SMILEY_LOSE
  gGame.isOn = false
  gGame.secsPassed = 1
  clearInterval(gTimerIntervalId)
  revealMines()
}

function checkVictory() {
  var count = 0
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var cell = gBoard[i][j]
      if (cell.isShown || (cell.isMarked && cell.isMine)) {
        count++
        var highScore = localStorage.getItem('highScore')
        if (!highScore || gGame.secsPassed < highScore) {
          localStorage.setItem('highScore', `${gGame.secsPassed}`)
        }
      }
    }
  }
  if (count === gBoard.length * gBoard.length) {
    var elRestartBtn = document.querySelector('.restartBtn')
    gGame.isOn = false
    elRestartBtn.innerText = SMILEY_WIN
    clearInterval(gTimerIntervalId)
    gGame.secsPassed = 1
  }
}

function changeDifficulty(size, mines) {
  gGame.secsPassed = 1
  clearInterval(gTimerIntervalId)
  gLevel.size = size
  gLevel.mines = mines
  gGame.shownCount = 0
  initGame()
}
