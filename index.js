import mixin from './lib/vue/mixin'
import plugin from './lib/vue/plugin'
import { buildDeck, deck } from './lib/buildDeck'
import {
    getCell,
    buildGrid,
    getCoordsFromIndex,
    getIndexFromCoords
} from './lib/grid'

const grid = { getCell, buildGrid, getCoordsFromIndex, getIndexFromCoords }

export {
    // Vue mixin
    mixin,
    // Vue plugin
    plugin,
    // Deck of cards
    deck,
    buildDeck,
    // 2d square grid
    grid
}
