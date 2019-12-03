// https://stackoverflow.com/a/8526029/3856675
function isNumber(n) {
    return typeof n == 'number' && !isNaN(n - n)
}

// get cell at coordinates (x, y) on one-dimensional array `board` of width `width`
// (0, 0) is top left
// null if invalid
function getCell({ x, y, board = [], width = Math.Infinity } = {}) {
    const targetIndex = getIndexFromCoords({ x, y }, width)

    if (
        !isNumber(targetIndex) ||
        board.length <= targetIndex ||
        targetIndex < 0
    ) {
        return null
    }

    return board[targetIndex]
}

// get (x, y) coordinates from `index` given one-dimensional array board of width `width`
function getCoordsFromIndex(index, width = 10) {
    return { x: index % width, y: Math.floor(index / width) }
}

// get index of coordinates (x, y) given one-dimensional array board of width `width`
function getIndexFromCoords({ x, y }, width = 10) {
    return y * width + x
}

// get taxicab distance between two vector2s
// https://en.wikipedia.org/wiki/Taxicab_geometry
function taxicabDistance(a, b) {
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y)
}

// get taxicab distance between two indices, given a one-dimensional array board of width `width`
// https://en.wikipedia.org/wiki/Taxicab_geometry
function taxicabDistanceFromIndices(index1, index2, width = 10) {
    const a = getCoordsFromIndex(index1, width)
    const b = getCoordsFromIndex(index2, width)
    return taxicabDistance(a, b)
}

export {
    getCell,
    getCoordsFromIndex,
    getIndexFromCoords,
    taxicabDistance,
    taxicabDistanceFromIndices
}
