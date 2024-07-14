import type { MutationTree, ActionTree, GetterTree } from 'vuex'
import type { State } from '..'
import http from '@/utils/http';
import { update } from 'lodash';

interface Infos {
  [index: string]: unknown
}

export interface ChecksState {
  applyList: Infos[],
  checkList: Infos[]
}
const state: ChecksState = {
  applyList: [],
  checkList: []
}
const mutations: MutationTree<ChecksState> = {
  updateApplyList(state, payload) {
    state.applyList = payload
  },
  updateCheckList(state, payload) {
    state.checkList = payload
  }
}
const actions: ActionTree<ChecksState, State> = {
  getApplyList(context, payload) {
    return http.get('/checks/apply', payload)
  },
  postApply(context, payload) {
    return http.post('checks/apply', payload)
  },
  putApply(context, payload) {
    return http.put('checks/apply', payload)
  }
}
const getters: GetterTree<ChecksState, State> = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
