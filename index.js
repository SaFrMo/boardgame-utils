import mixin from './lib/vue/mixin'
import plugin from './lib/vue/plugin'
import { buildDeck, deck } from './lib/buildDeck'
import { getCell, buildGrid } from './lib/grid'

export {
    // Vue mixin
    mixin,
    // Vue plugin
    plugin,
    // Deck of cards
    deck,
    buildDeck,
    // 2d square grid
    getCell,
    buildGrid
}
