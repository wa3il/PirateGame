// store/index.js
import { createStore } from 'vuex';
import auth from './auth';
import resources from './resources';

const store = createStore({
  modules: {
    auth,
    resources
  }
});

export default store;
