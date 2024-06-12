// store/resources.js
import axios from 'axios';

const API_BASE_URL = 'https://192.168.75.124/api/game';

export default {
  state: () => ({
    resources: [],
  }),
  actions: {
    async fetchResources({ commit }) {
      try {
        const response = await axios.get(`${API_BASE_URL}/resources`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          mode: 'cors'
        });
        commit('setResources', response.data);
      } catch (error) {
        console.error('Failed to fetch resources:', error);
      }
    },
    async operateOnResource(_, { resourceId, operationType }) {
      try {
        await axios.post(`${API_BASE_URL}/resources/${resourceId}`, { operationType }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          mode: 'cors'
        });
      } catch (error) {
        console.error('Failed to operate on resource:', error);
      }
    },
    async updateUserPosition(_, { resourceId, position }) {
      try {
        await axios.put(`${API_BASE_URL}/resources/${resourceId}/position`, { position }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          mode: 'cors'
        });
      } catch (error) {
        console.error('Failed to update user position:', error);
      }
    },
  },
  mutations: {
    setResources(state, resources) {
      state.resources = resources;
    },
  },
  getters: {
    resources: (state) => state.resources,
  }
};
