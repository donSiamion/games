const readline = require('readline')
const game = require('./game')

game.setSizePlace(4)
game.setLevelGame(1)
game.createNewPlace()

game.addNewItems()
drowGame()

readline.emitKeypressEvents(process.stdin)

if (process.stdin.isTTY) {
  process.stdin.setRawMode(true)
}

process.stdin.on('keypress', (str, key) => {
  if (key.ctrl == true) {
    switch (key.name) {
      case 'c':
        process.exit()
      case 'r':
        game.createNewPlace()
        return
    }
  } else {
    switch (key.name) {
      case 'a':
      case 'left':
        game.turnLeft()        
        break;
      case 'w':
      case 'up':
        game.turnUp()        
        break;
      case 'd':
      case 'right':
        game.turnRight()        
        break;
      case 's':
      case 'down':
        game.turnDown()        
        break;
      default:
        return
    }

    game.addNewItems()
  }

  drowGame()
})

function drowGame() {
  console.clear()
  consoleDrow(game.getGamePlace())
  console.log('Ctrl+R - restart game')
  console.log('Ctrl+C - exit')
}

function consoleDrow(arr) {
  let consoleLine = ''
  for(let i = 0; i < (arr[0].length * 5 + 1); i++) {
    consoleLine += '—'
  }
  console.log(consoleLine)
  for (let x = 0; x < arr.length; x++) {
    const line = arr[x];
    consoleLine = '|'
    for (let y = 0; y < line.length; y++) {
      const element = line[y];
      switch (true) {
        case element < 10:
          consoleLine += '  \x1b[33m' + element + '\x1b[0m |'
          break;
        case element < 100:
          consoleLine += ' \x1b[33m' + element + '\x1b[0m |'
          break;
        case element < 1000:
          consoleLine += ' \x1b[33m' + element + '\x1b[0m|'
          break;
        case element > 1000:
          consoleLine += '\x1b[33m' + element + '\x1b[0m|'
          break;
        default:
          break;
      }      
    }
    console.log(consoleLine)
    consoleLine = ''
    for(let i = 0; i < (line.length * 5 + 1); i++) {
      consoleLine += '—'
    }
    console.log(consoleLine)
  }
}