const state = {
  modalWindowStatus: false
}
const getters = {
  getModalWindowStatus (state) {
    return state.modalWindowStatus
  }
}
const mutations = {
  setModalWindowStatus (state, setModalStatus) {
    state.modalWindowStatus = setModalStatus
  }
}
const actions = {
  onModalStatusChanged ({
    commit
  }, setModalStatus) {
    let modalStatus = setModalStatus
    commit('setModalWindowStatus', modalStatus)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
