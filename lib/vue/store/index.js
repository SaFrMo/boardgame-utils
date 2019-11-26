import { Client } from 'boardgame.io/client'
// import mutations from './mutations'

export default {
    store() {
        return {
            client: null
        }
    },
    mutations: {
        INIT_CLIENT(state, { options }) {
            state.client = new Client(options)
            state.client.start()
        }
    }
}
