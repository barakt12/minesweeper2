function renderBoard(board) {
  var boardHTML = document.querySelector('.board-body')

  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      strHTML += `<td onclick="cellClicked(${i},${j},this)" oncontextmenu="flagCell(${i},${j},this,event)" class="cell cell${i}-${j}"></td>`
    }
    strHTML += '</tr>'
  }

  boardHTML.innerHTML = strHTML
}

function renderDisplay() {
  var elContainer = document.querySelector('.restartBtn-container')
  elContainer.innerHTML = ''
  elContainer.innerHTML += `<div class="flag-emoji">${FLAG}</div>`
  elContainer.innerHTML += `<div class="flag-count">${gLevel.mines}</div>`
  elContainer.innerHTML += `<div onclick='restartGame()' class='restartBtn'></div>`
  elContainer.innerHTML += `<div class="timer">0</div>`
  elContainer.innerHTML += `<div class="timer-emoji">⏳</div>`
  var elRestartBtn = document.querySelector('.restartBtn')
  elRestartBtn.innerText = SMILEY
}
function renderLives() {
  var elLifeDiv = document.querySelector('.life-container')
  elLifeDiv.innerHTML = ''
  for (var i = 0; i < gGame.lives; i++) {
    elLifeDiv.innerHTML += `\n<img class="life life${
      i + 1
    }" src="images/life.png" alt=""/>\n`
  }
}

function renderHighScore() {
  var elHighscore = document.querySelector('.highscore')
  elHighscore.innerText = `Best Time: \n\n00:${pad(
    localStorage.getItem('highScore') ? localStorage.getItem('highScore') : '00'
  )}`
}

function renderSafePicks() {
  var elSafesDiv = document.querySelector('.safe-container')
  elSafesDiv.innerHTML = ''
  for (var i = 0; i < gGame.safePicks; i++) {
    elSafesDiv.innerHTML += `<img onclick="clickedSafe()"src="images/lock2.png" class="safe safe${
      i + 1
    }"></div>`
  }
}

function renderHints() {
  var elHintsDiv = document.querySelector('.hints-container')
  elHintsDiv.innerHTML = ''
  for (var i = 0; i < gGame.hints; i++) {
    elHintsDiv.innerHTML += `<img onclick="clickedHint(this)"class="hint hint${
      i + 1
    }" src="images/hint2.png" alt=""/>\n`
  }
}

function countFlags() {
  document.querySelector('.flag-count').innerText =
    gLevel.mines - gGame.markedCount
}

function colorNum(num, elCell) {
  switch (num) {
    case 1:
      elCell.style.color = 'blue'
      break
    case 2:
      elCell.style.color = 'green'
      break
    case 3:
      elCell.style.color = 'red'
      break
    case 4:
      elCell.style.color = 'purple'
      break
    case 5:
      elCell.style.color = 'maroon'
      break
    case 6:
      elCell.style.color = 'turqoise'
      break
    case 7:
      elCell.style.color = 'black'
      break
    case 8:
      elCell.style.color = 'cyan'
    default:
      return null
  }
}
