import pluginStore, { client } from './store'
import { Client } from 'boardgame.io/client'

export default {
    install(Vue, { options, store, initClient = true }) {
        // make sure options and store exist
        if (!options || !store) {
            throw new Error('Please provide game options and a Vuex store.')
        }

        // register store module
        store.registerModule('boardgame', pluginStore, { preserveState: false })

        if (initClient) {
            // initialize client if desired
            store.dispatch('INIT_CLIENT', { options })
        }

        Vue.mixin({
            computed: {
                G() {
                    // const c = this.$store.state.boardgame.log.length
                    return this.$store.state.boardgame.G
                },
                ctx() {
                    // const c = this.$store.state.boardgame.log.length
                    return this.$store.state.boardgame.ctx
                }
            }
        })
    }
}
