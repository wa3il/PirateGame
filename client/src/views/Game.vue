<template>
  <div>
    <h5 class="title">Game Page</h5>
    <MyMap />
    <div v-if="resources && resources.length > 0">
      <h6 class="subtitle">Liste des ressources :</h6>
      <ul>
        <li v-for="resource in resources" :key="resource.id" class="resource-item">
          {{ resource.id }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="no-resources">Aucune ressource disponible.</p>
    </div>
  </div>
</template>

<script>
import MyMap from '../components/MyMap.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Game',
  components: {
    MyMap
  },
  computed: {
    ...mapState( ['resources'])
  },
  methods: {
    ...mapActions(['fetchResources'])
  },
  mounted() {
    this.fetchResources();
  }
};
</script>

<style scoped>
/* Ajout de styles personnalisés */
.title {
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.subtitle {
  color: white;
  font-size: 1.2rem;
}

.resource-item {
  color: white;
}

.no-resources {
  color: white;
  font-style: italic;
}
</style>
