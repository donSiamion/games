const common = require('./common')

function setSizePlace(size = 4) {
    this.sizePlace = size
}

function setLevelGame(level) {
    this.levelGame = level
}

function createNewPlace(gamePlace = []) {
    this.gamePlace = gamePlace
    for (let x = 0; x < this.sizePlace; x++) {
        let line = [];
        for (let y = 0; y < this.sizePlace; y++) {
            line.push(0)
        }
        this.gamePlace.push(line)
    }
}

function getGamePlace() {
    if (!this.gamePlace) {
        this.gamePlace = []
    }
    if (this.gamePlace.length === 0) {
        this.createNewPlace()
    }
    return this.gamePlace
}

function getIndexesFreePlce() {
    let freeIndexesArr = []
    for (let x = 0; x < this.sizePlace; x++) {
        for (let y = 0; y < this.sizePlace; y++) {
            if (this.gamePlace[x][y] === 0) {
                freeIndexesArr.push([x,y])
            }
        }
    }
    return freeIndexesArr
}

function addNewItems() {
    let indexFreePlaces = this.getIndexesFreePlce()
    for (let i = 0; i < this.levelGame && indexFreePlaces.length > 0; i++) {
        let numberIndexes = common.getRandomIntInclusive(0, indexFreePlaces.length - 1)
        let indexes = indexFreePlaces.splice(numberIndexes,1)[0]
        this.gamePlace[indexes[0]][indexes[1]] = 2
    }
}

function backToPrewiev() {
    this.gamePlace = JSON.parse(this.prevPlaces.pop()) || this.gamePlace
}

function saveToPrev() {
    this.prevPlaces.push(JSON.stringify(this.gamePlace))
}

function sumSameElements(arrayElments) {
    let index = 0;
    let retArr = JSON.parse(JSON.stringify(arrayElments))
    let allSums = false;
    do {
        if(retArr.length == 1 || index == retArr.length) {
            allSums = true
        }
        if(retArr[index + 1] && retArr[index] == retArr[index + 1]) {
            retArr[index] = retArr[index] + retArr[index + 1]
            retArr.splice(index + 1, 1)
            index = 0
        } else {
            index++
        }
    } while (!allSums);
    return retArr;
}

function addZerosItems(arrItems, size) {
    let retArr = JSON.parse(JSON.stringify(arrItems))
    let addedItems = size - retArr.length
    for(let i = 0; i <  addedItems; i++) {
        retArr.push(0)
    }
    return retArr;
}

function turnLeft() {
    for (let x = 0; x < this.sizePlace; x++) {
        let filteredElments = this.gamePlace[x].filter(el => el != 0)
        this.gamePlace[x] = addZerosItems(sumSameElements(filteredElments), this.sizePlace)
    }
}

function turnRight() {
    for (let x = 0; x < this.sizePlace; x++) {
        let filteredElments = (this.gamePlace[x].filter(el => el != 0)).reverse()
        this.gamePlace[x] = (addZerosItems(sumSameElements(filteredElments), this.sizePlace)).reverse()
    }
}

function turnUp() {
    for (let y = 0; y < this.sizePlace; y++) {
        let colum = []
        for (let x = 0; x < this.sizePlace; x++) {
            colum.push(this.gamePlace[x][y]);            
        }
        let filteredElments = colum.filter(el => el != 0)
        let newColum = addZerosItems(sumSameElements(filteredElments), this.sizePlace)
        for (let x = 0; x < this.sizePlace; x++) {
            this.gamePlace[x][y] = newColum[x];            
        }
    }
}

function turnDown() {
    for (let y = 0; y < this.sizePlace; y++) {
        let colum = []
        for (let x = 0; x < this.sizePlace; x++) {
            colum.push(this.gamePlace[x][y]);            
        }
        let filteredElments = colum.filter(el => el != 0).reverse()
        let newColum = (addZerosItems(sumSameElements(filteredElments), this.sizePlace)).reverse()
        for (let x = 0; x < this.sizePlace; x++) {
            this.gamePlace[x][y] = newColum[x];            
        }
    }
}

module.exports = {
    setSizePlace,
    setLevelGame,
    createNewPlace,
    getGamePlace,
    getIndexesFreePlce,
    addNewItems,
    backToPrewiev,
    saveToPrev,
    sumSameElements,
    addZerosItems,
    turnLeft,
    turnRight,
    turnUp,
    turnDown
}