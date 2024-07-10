// 1
import { createStore, useStore as baseUseStore } from 'vuex'
import users from './modules/users'
import news from './modules/news'
import checks from './modules/checks'
import signs from './modules/signs'
// 2
import type { InjectionKey } from 'vue'
import type { Store } from 'vuex'
import type { UsersState } from './modules/users'
import type { SignsState } from './modules/signs'
import type { ChecksState } from './modules/checks'
import type { NewsState } from './modules/news'

// 5
export interface State {}
// 6
interface StateAll extends State {
  users: UsersState
  news: NewsState
  signs: SignsState
  checks: ChecksState
}
// 4
export function useStore () {
  return baseUseStore(key)
}
// 3
export const key: InjectionKey<Store<StateAll>> = Symbol()
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users,
    signs,
    checks,
    news
  }
})
