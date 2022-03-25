function generateRandomMines(cellI, cellJ) {
  var emptySpots = []
  var currTile = {}
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      if (i === cellI && j === cellJ) continue
      emptySpots.push({ i, j })
    }
  }
  for (var i = 0; i < gLevel.mines; i++) {
    currTile = randomPick(emptySpots)
    gBoard[currTile.i][currTile.j].isMine = true
  }
}
function revealMines() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard.length; j++) {
      var elCell = document.querySelector(`.cell${i}-${j}`)
      var cell = gBoard[i][j]
      if (cell.isMine) {
        cell.isShown = true
        elCell.innerText = MINE
      }
    }
  }
}
