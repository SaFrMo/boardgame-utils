import { Client } from 'boardgame.io/client'
// import mutations from './mutations'

let client

export default {
    store() {
        return {
            client: null
        }
    },
    mutations: {
        INIT_CLIENT(state, { options }) {
            client = new Client(options)
            client.start()
            state.client = () => client
        }
    }
}
