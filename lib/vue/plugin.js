import pluginStore from './store'

export default {
    install(Vue, { options, store }) {
        // make sure options and store exist
        if (!options || !store) {
            throw new Error('Please provide game options and a Vuex store.')
        }

        // register store module
        store.registerModule('boardgame', pluginStore, { preserveState: false })

        // initialize client
        store.commit('INIT_CLIENT', { options })
    }
}
