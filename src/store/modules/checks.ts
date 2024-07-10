import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import type { State } from '..'

export interface ChecksState {}
const state: ChecksState = {}
const mutations: MutationTree<ChecksState> = {}
const actions: ActionTree<ChecksState, State> = {}
const getters: GetterTree<ChecksState, State> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
