Utilities to make development in [boardgame.io](https://boardgame.io/) easier.

`npm install boardgame-utils`

You can then import any of the named modules below.

1. Modules
    1. [buildDeck](#buildDeck)
    1. [deck](#deck)
    1. [mixin](#mixin)
1. Misc
    1. [Misc Notes](#misc-notes)

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

### mixin

`import { mixin } from 'boardgame-utils'`

A Vue mixin to handle setting up a boardgame.io client.

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

### Misc notes

#### Recommended boardgame.io workflow

1. Prep `lib/game` dir
1. Files:
    - `index.js` passes args to pass to `options`
    - `phases.js` contains phases to pass to `index`, including 1 `start: true` phase
    - `moves.js` contains all moves to pass to `phases`
