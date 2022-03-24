'use strict'

function getRandomIntInclusive(min, max) {
  // random number inclusive
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getRandomColor() {
  // Random color picker
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function createBoard(num) {
  var board = []
  for (var i = 0; i < num; i++) {
    board[i] = []
    for (var j = 0; j < num; j++) {
      board[i][j] // = enter values here
    }
  }
  return board
}

function copyMat(mat) {
  // returns a copy of matrix
  var newMat = []
  for (var i = 0; i < mat.length; i++) {
    newMat[i] = []
    for (var j = 0; j < mat[0].length; j++) {
      newMat[i][j] = mat[i][j]
    }
  }
  return newMat
}

let gNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
function randomPick(numbers) {
  //NOTICE: WE NEED GLOBAL NUMBERS ARRAY - gNumbers
  const idx = getRandomIntInclusive(0, numbers.length - 1)
  return numbers.splice(idx, 1)[0]
}

//** TIMER */

function pad(val) {
  let valString = val + ''
  if (valString.length < 2) return '0' + valString
  return valString
}

// gStartTime = Date.now()
function timer() {
  //NOTICE: WE NEED GLOBAL START TIME - gStartTime
  var timeDiff = Date.now() - gStartTime
  //   var currTime = new Date(timeDiff)

  //   return currTime //shows in milliseconds

  //OR
  currTime = new Date(timeDiff)
  var timeStr = pad(currTime.getMinutes()) //pad make it 01, 02 and so on
  timeStr += ':' + pad(currTime.getSeconds())
  return timeStr
}

function countNeighbors(cellI, cellJ, mat) {
  var neighborsCount = 0
  for (var i = cellI - 1; i <= cellI + 1; i++) {
    if (i < 0 || i >= mat.length) continue
    for (var j = cellJ - 1; j <= cellJ + 1; j++) {
      if (i === cellI && j === cellJ) continue
      if (j < 0 || j >= mat[i].length) continue
      // if (mat[i][j] === LIFE || mat[i][j] === SUPER_LIFE)
      if (mat[i][j]) neighborsCount++
    }
  }
  return neighborsCount
}

function renderCars() {
  var strHTML = ''
  for (var i = 0; i < gCars.length; i++) {
    strHTML +=
      '<div class="car car' + (i + 1) + '"onclick="speedUp(' + i + ')"></div>'
  }
  // console.log('strHTML', strHTML);
  var elRoad = document.querySelector('.road')
  elRoad.innerHTML = strHTML
}

function renderBoard(board) {
  var strHTML = ''
  for (var i = 0; i < board.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < board[0].length; j++) {
      // var className = board[i][j] ? 'occupied' : '';
      // strHTML += `<td data-i="${i}" data-j="${j}" onclick="cellClicked(${i},${j},this)" class="${className}">${board[i][j]}</td>`;
    }
    strHTML += '</tr>'
  }
  // var elTable = document.querySelector('.board');
  // elTable.innerHTML = strHTML;
}
function getTime() {
  return new Date().toString().split(' ')[4]
}
