import pluginStore from './store'

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
            store.commit('INIT_CLIENT', { options })
        }

        // global property to get G and ctx
        Vue.prototype.$G = function() {
            if (!store || !store.client || !store.client.store) {
                return null
            }
            return store.boardgame.client().store.getState().G
        }
        Vue.prototype.$ctx = function() {
            if (!store || !store.client || !store.client.store) {
                return null
            }
            return store.boardgame.client().store.getState().ctx
        }

        Vue.mixin({
            computed: {
                G() {
                    if (
                        !this.$store ||
                        !this.$store.state ||
                        !this.$store.state.boardgame.client
                    ) {
                        return null
                    }

                    const c = this.$store.state.boardgame.client().log

                    return this.$store.state.boardgame.client().store.getState()
                        .G
                },
                client() {
                    const c = this.$store.state.boardgame.client().log

                    return this.$store.state.boardgame.client()
                },
                ctx() {
                    if (
                        !this.$store ||
                        !this.$store.state ||
                        !this.$store.state.boardgame.client
                    ) {
                        return null
                    }

                    const c = this.$store.state.boardgame.client.log

                    return this.$store.state.boardgame.client.store.getState()
                        .ctx
                }
            }
        })
    }
}
