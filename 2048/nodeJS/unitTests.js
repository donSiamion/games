const main = require('./game.js')

function testCreatePlaceSize3() {
    main.setSizePlace(3)    
    main.createNewPlace()
    return JSON.stringify(main.getGamePlace()) == '[[0,0,0],[0,0,0],[0,0,0]]'
}

function testCreatePlaceSize4() {
    main.setSizePlace(4)
    main.createNewPlace()
    return JSON.stringify(main.getGamePlace()) == '[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]'
}

function createTestPlase() {
    main.setSizePlace(3)
    main.gamePlace = JSON.parse('[[2,2,2],[2,2,2],[2,2,2]]')
}

function testTurnLeft() {
    createTestPlase()
    main.turnLeft()
    return JSON.stringify(main.getGamePlace()) == '[[4,2,0],[4,2,0],[4,2,0]]'
}

function testTurnRight() {
    createTestPlase()
    main.turnRight()
    return JSON.stringify(main.getGamePlace()) == '[[0,2,4],[0,2,4],[0,2,4]]'
}

function testTurnUp() {
    createTestPlase()
    main.turnUp()
    return JSON.stringify(main.getGamePlace()) == '[[4,4,4],[2,2,2],[0,0,0]]'
}

function testTurnDown() {
    createTestPlase()
    main.turnDown()
    return JSON.stringify(main.getGamePlace()) == '[[0,0,0],[2,2,2],[4,4,4]]'
}

function testAddNewElements() {
    main.setLevelGame(1)
    createTestPlase()
    for (let index = 0; index < 60; index++) {
        main.addNewItems()
        main.turnLeft()
        main.turnUp()
        console.table(main.getGamePlace())
    }
}


// //create
// console.log('testCreatePlaceSize3 - ', testCreatePlaceSize3() ? 'OK' : 'FAIL')
// console.log('testCreatePlaceSize4 - ', testCreatePlaceSize4() ? 'OK' : 'FAIL')
// //turn
// console.log('testTurnLeft - ', testTurnLeft() ? 'OK' : 'FAIL')
// console.log('testTurnRight - ', testTurnRight() ? 'OK' : 'FAIL')
// console.log('testTurnUp - ', testTurnUp() ? 'OK' : 'FAIL')
// console.log('testTurnDown - ', testTurnDown() ? 'OK' : 'FAIL')
// //add new elements
// testAddNewElements()