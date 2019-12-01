// https://stackoverflow.com/a/8526029/3856675
function isNumber(n) {
    return typeof n == 'number' && !isNaN(n - n)
}

function getCell({ x, y, board = [], width = Math.Infinity } = {}) {
    const targetIndex = y * width + x

    if (!isNumber(targetIndex) || board.length <= targetIndex) {
        return null
    }

    return board[targetIndex]
}

function buildGrid({ board, width } = {}) {
    return function(x, y) {
        return getCell({
            x,
            y,
            board,
            width
        })
    }
}

function getCoordsFromIndex(index, width = 10) {
    return { x: index % width, y: Math.floor(index / width) }
}

function getIndexFromCoords({ x, y }, width = 10) {
    return y * width + x
}

export { getCell, buildGrid, getCoordsFromIndex, getIndexFromCoords }
