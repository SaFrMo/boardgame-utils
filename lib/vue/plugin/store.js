import { Client } from 'boardgame.io/client'
// import mutations from './mutations'
import Vue from 'vue'
import cloneDeep from 'lodash.clonedeep'

let client

export { client }

export default {
    store() {
        return {
            G: {},
            ctx: {}
        }
    },
    mutations: {
        UPDATE_STORE(state) {
            if (!client) return

            const gameState = client.store.getState()

            if (!state || !gameState) {
                throw new Error('Vuex state or game state not found')
            }

            Vue.set(state, 'G', cloneDeep(gameState.G))
            Vue.set(state, 'ctx', cloneDeep(gameState.ctx))
        }
    },
    actions: {
        INIT_CLIENT({ state, commit }, { options }) {
            client = new Client(options)
            client.start()
            commit('UPDATE_STORE')
        },

        async PLAY_MOVE({ state, commit }, { move, options = null }) {
            if (!move) {
                throw new Error('No move name defined')
            }
            if (!client.moves[move]) {
                throw new Error(`Move ${name} doesn't exist on client`)
            }

            await client.moves[move](options)
            commit('UPDATE_STORE')
        },

        async RUN_EVENT({ state, commit }, { event, options = null }) {
            if (!event) {
                throw new Error('No event name defined')
            }

            await client.events[event](options)
            commit('UPDATE_STORE')
        }
    }
}
