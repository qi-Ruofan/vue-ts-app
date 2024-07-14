import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import type { State } from '..'
import http from '@/utils/http'

interface Infos {
  [index: string]: unknown
}

export interface NewsState {
  info: Infos
}
const state: NewsState = {
  info: {}
}
const mutations: MutationTree<NewsState> = {
  updateInfo(state, payload) {
    state.info = payload
  }
}
const actions: ActionTree<NewsState, State> = {
  getRemind(context, payload) {
    return http.get('news/remind', payload)
  },
  putRemind(context, payload) {
    return http.put('news/remind', payload)
  }
}
const getters: GetterTree<NewsState, State> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
