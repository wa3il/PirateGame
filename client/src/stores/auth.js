// store/auth.js
const state = {
    token : null,
    user: null,
    isLoggedIn: false
  };
  
  const mutations = {
    setUser(state, user) {
      state.user = user;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    }
  };
  
  const actions = {
    login({ commit }, user) {
      commit('setUser', user);
    },
    logout({ commit }) {
      commit('logout');
    }
  };
  
  const getters = {
    user: (state) => state.user,
    isLoggedIn: (state) => state.isLoggedIn
  };
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  };
  