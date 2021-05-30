const state = {
  count: 100
}
const actions = {
}
const mutations = {
  ['increaseCount'](res) {
    state.count ++;
  }
}
const getters = {
  count: state => state.count
}
export default {
  state,
  actions,
  mutations,
  getters
}
