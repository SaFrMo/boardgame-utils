Utilities to make development in [boardgame.io](https://boardgame.io/) easier.

`npm install boardgame-utils`

You can then import any of the named modules below.

1. Cards
    1. [buildDeck](#buildDeck)
    1. [deck](#deck)
1. Grid
    1. [buildGrid](#buildGrid)
    1. [getCell](#getCell)
    1. [getCoordsFromIndex](#getCoordsFromIndex)
    1. [getIndexFromCoords](#getIndexFromCoords)
1. Vue
    1. [Vue mixin](#mixin)
    1. [Vue plugin](#plugin)
1. Misc
    1. [Misc Notes](#misc-notes)

## Cards

### buildDeck

`import { buildDeck } from 'boardgame-utils'`

Function to build a deck with options. Cards in the deck are objects in the same format as those in the [deck](#deck) function.

```
// defaults shown
buildDeck({
    low: 1, // lowest rank, inclusive
    high: 13, // highest rank, inclusive
    suits: ['hearts', 'diamonds', 'clubs', 'spades'] // each suit will receive
})

// build a deck of only red face cards
buildDeck({
    low: 11,
    high: 13,
    suits: ['hearts', 'diamonds']
})
```

### deck

`import { deck } from 'boardgame-utils'`

A standard 52-card, 4-suit deck. Contains ranks from 1-13 inclusive and suits `['hearts', 'diamonds', 'clubs', 'spades']`. Each card exists as an object with a `rank` and `suit` property - for example:

```
// ace of spades
{
    rank: 1,
    suit: 'spades'
}

// king of hearts
{
    rank: 13,
    suit: 'hearts'
}
```

It's left to the developer to handle face cards and aces high/low.

## Grid

### getCell

```js
import { grid } from 'boardgame-utils'
const { getCell } = grid

getCell({
    x,
    y,
    board = [],
    width = 10
})
```

Get coordinates `(x, y)` from one-dimensional array `board`, given that board's `width`. For example, on a 3x3 board:

```
const board = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
]

getCell(1, 1, board, 3) // = 4
getCell(2, 2, board, 3) // = 8
```

### getCoordsFromIndex

```js
import { grid } from 'boardgame-utils'
const { getCoordsFromIndex } = grid

getCoordsFromIndex(index, (width = 10))
```

Get `{ x, y }` coordinates from a given `index` on a board with the given `width`. For example, on a 3x3 board:

```
const board = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
]

getCoordsFromIndex(4, 3) // = { x: 1, y: 1 }
getCoordsFromIndex(8, 3) // = { x: 2, y: 2 }
```

### getIndexFromCoords

```js
import { grid } from 'boardgame-utils'
const { getIndexFromCoords } = grid

getIndexFromCoords({ x, y }, (width = 10))
```

Get index from given index `{ x, y }` coordinates on a board with the given `width`. For example, on a 3x3 board:

```
const board = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
]

getIndexFromCoords({x: 1, y: 1}, 3) // = 4
getIndexFromCoords({x: 2, y: 2}, 3) // = 8
```

### taxicabDistance

```js
import { grid } from 'boardgame-utils'
const { taxicabDistance } = grid

taxicabDistance(a, b)
```

Get [taxicab distance](https://en.wikipedia.org/wiki/Taxicab_geometry) from two vector2s For example:

```
const board = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
]

taxicabDistance({x: 0, y: 0}, {x: 1, y: 1}) // = 2
```

### taxicabDistanceFromIndices

```js
import { grid } from 'boardgame-utils'
const { taxicabDistanceFromIndices } = grid

taxicabDistanceFromIndices(a, b, (width = 10))
```

Get [taxicab distance](https://en.wikipedia.org/wiki/Taxicab_geometry) from two indices given a board of width `width`. For example:

```
const board = [
    0, 1, 2,
    3, 4, 5,
    6, 7, 8
]

taxicabDistanceFromIndices(0, 4, 3) // = 4
taxicabDistanceFromIndices(1, 4, 3) // = 1
```

## Vue

### mixin

`import { mixin } from 'boardgame-utils'`

A Vue mixin to handle setting up a boardgame.io client. This is suitable for small-scale games - larger ones should use the Vue [plugin](#plugin) below.

```
{
    data: {
        // the initialized boardgame.io client
        client: null,

        // the options to pass to the client
        options: null,

        // whether to automatically set up client on mounted().
        setupClient: true
    },
    methods: {
        // runs before the client is initialized
        beforeClientInit(){},

        // initializes and saves the boardgame.io client
        // run automatically if setupClient == true
        initClient(){},

        // run after client is initialized and started
        onClientReady(){}
    },
    computed: {
        // current game state, null if not initialized
        G,

        // current game ctx, null if not initialized
        ctx
    }
}
```

An example setup in a Vue single-file component:

```html
<template>
    <!-- only render if game is ready -->
    <section class="game" v-if="G">
        <!-- lets user play one of the cards defined in `data` -->
        <button v-for="(card, i) in cards" :key="i" @click="playCard(card)">
            Play {{ card }}
        </button>
    </section>
</template>

<script>
    import { mixin as boardgameMixin } from 'boardgame-utils'
    // options to pass to client (https://boardgame.io/documentation/#/api/Client?id=usage)
    import options from './your-game-options'

    export default {
        mixins: [boardgameMixin],
        data() {
            return {
                // use options imported above
                options: options,

                // example cards
                cards: [1, 2, 3]
            }
        },
        methods: {
            beforeClientInit() {
                // make sure we turn on the debug window
                this.options.debug = true
            },

            playCard(card) {
                // plays 1, 2, or 3
                // assumes we've defined a move called `playCard` in our game (https://boardgame.io/documentation/#/README?id=moves)
                this.client.moves.playCard(card)
            }
        }
    }
</script>
```

### plugin

A Vue plugin to handle boardgame.io + Vue boilerplate.

To register:

```js
import Vue from 'vue'
import { plugin as boardgamePlugin } from 'boardgame-utils'
// client options per https://boardgame.io/documentation/#/api/Client
import options from 'your-game-options'
// the plugin registers a vuex module called `boardgame` to handle state manipulation, so you'll also need to have your Vuex store ready to use
import store from 'your-vuex-store'

Vue.use(boardgamePlugin, {
    // client options (required)
    options: options,
    // Vuex store (required)
    store: store,
    // whether or not to initialize the client immediately (optional, default: true)
    initClient: true
})
```

The plugin adds the following in Vuex:

-   Store:
    -   `G` - G from boardgame.io state
    -   `ctx` - ctx from boardgame.io state
-   Mutations:

    -   `commit('UPDATE_STORE')` - Updates the store's G and ctx to match the state of the game. Used internally and does not take any arguments.

    _Since boardgame.io uses [Proxied](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) G and ctx objects, `UPDATE_STORE` is called to update the store's deep clones of those G and ctx objects. This keeps boardgame.io's internal state self-contained and the Vuex store reactive._

-   Actions:
    -   `dispatch('INIT_CLIENT', { options : {}})` - Creates a boardgame.io client with the given options. Called automatically unless `initClient` is set to `false`
    -   `dispatch('PLAY_MOVE', { move: 'moveName', options: {} })` - Runs a boardgame.io move with the (optional) given options.
    -   `dispatch('RESET_GAME')` - Reset the game to its starting state.
    -   `dispatch('RUN_CLIENT_METHOD', { method: 'methodName', options: {} })` - Runs a method on `client`. For example, to reset the game, you could dispatch `('RUN_CLIENT_METHOD', {method: 'reset'})` (although resetting using the `RESET_GAME` action is recommended).
    -   `dispatch('RUN_EVENT', { event: 'eventName', options: {} })` - Runs a boardgame.io [event](https://boardgame.io/documentation/#/events) with the (optional) given options.

The plugin also adds the following global mixin:

```js
{
    computed: {
        G() {
            // alias for this.$store.state.boardgame.G
        },
        ctx() {
            // alias for this.$store.state.boardgame.ctx
        }
    }
}
```

## Misc notes

### Recommended boardgame.io workflow

1. Prep `lib/game` dir
1. Files:
    - `index.js` passes args to pass to `options`
    - `phases.js` contains phases to pass to `index`, including 1 `start: true` phase
    - `moves.js` contains all moves to pass to `phases`

### Misc tips

-   Don't modify G nested properties (like `G.enemies[0].hp - 10`) directly in Vue events - call moves that include an index so the framework can do so (like `<button @click="client.moves.changeHp(i, 10)"</button>` in Vue and `(index, amount) => G.enemies[index].hp -= amount` in the relevant phase).
