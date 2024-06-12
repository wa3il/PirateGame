<!-- Navbar.vue -->

<template>
  <header>
    <div class="title-container">
      <h1>Pirate's Curse</h1>
    </div>
    <nav>
      <router-link v-if="isLoggedIn" to="/user">Profil</router-link>
      <router-link v-if="isLoggedIn" to="/game">Game</router-link>
      <div v-if="isLoggedIn" class="user-info">
        <span>{{ user.login }} -- {{ user.role }}</span>
        <Button type="submit" @click="handleLogout" label="Logout" class="submit-button" />
      </div>
    </nav>
  </header>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import Button from 'primevue/button';

export default {
  name: 'Navbar',
  components: {
    Button
  },
  computed: {
    ...mapState('auth', ['isLoggedIn', 'user'])
  },
  methods: {
  ...mapActions('auth', ['logout']),
  async handleLogout() {
    try {
      await this.logout(); // Attendre que la méthode logout soit résolue
      localStorage.removeItem('user');
      this.$router.push('/'); // Naviguer vers la page d'accueil
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
},

  mounted() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.$store.dispatch('auth/login', user);
    }
  }
};
</script>

<style>
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
  }

  .title-container {
    display: flex;
    justify-content: center;
  }

  nav {
    display: flex;
    justify-content: space-between;
  }

  nav a {
    color: white;
    text-decoration: none;
  }

  .user-info {
    display: flex;
    align-items: center;
  }


</style>
