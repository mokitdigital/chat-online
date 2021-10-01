import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: {},
    mensagens: [],
    persons: []
  },
  mutations: {
    setInfo (state, payload) {
      state.info.nome = payload.nome
      state.info.sala = payload.sala
      state.info.mensagem = payload.mensagem
    },
    clearInfo (state) {
      state.info = {}
    },
    setMensagem (state, payload) {
      state.info.mensagem = payload
    },
    setPerson (state, payload) {
      state.persons = []
      for (const iterator of payload) {
        if (state.info.nome !== iterator.nome && state.info.sala === iterator.sala) {
          state.persons.push(iterator)
        }
      }
    }
  },
  actions: {
    setInfo ({ commit }, payload) {
      commit('setInfo', payload)
    },
    setMensagem ({ commit }, payload) {
      commit('setMensagem', payload)
    },
    setPerson ({ commit }, payload) {
      commit('setPerson', payload)
    },
    clearInfo ({ commit }) {
      commit('clearInfo')
    }
  },
  getters: {
    getInfo (state) {
      return state.info
    },
    getMensagens (state) {
      return state.mensagens
    },
    getPersons (state) {
      return state.persons
    }
  },
  modules: {
  }
})
