<template>
  <div id="app">
    <header>
<<<<<<< HEAD
      <Navbar />
=======
      <div class="title-container">
        <h1>Pirate's Curse</h1>
      </div>
      <nav>
        <router-link v-if="isLoggedIn" to="/user">Profil</router-link>
        <router-link v-if="isLoggedIn" to="/game">Game</router-link>
        <div v-if="isLoggedIn" class="user-info">
          <span>{{ user.login }} -- {{ user.role }}</span>
          <PrimeButton type="submit"  @click="handleLogout" label="Logout" class="submit-button" />
        </div>
      </nav>
>>>>>>> 808133299135fbc234889de899804f289e7e182b
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <Footer />
    </footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue'; // Ajout de l'importation du composant Footer

export default {
  name: 'App',
  components: {
    Navbar,
    Footer // Ajout du composant Footer dans la section components
  }
}
</script>


<style>
/* Reset default margin and padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-image: url('assets/pirates-bg.jpg'); 
  background-size: cover; 
  background-position: center; 
  background-repeat: no-repeat; 
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; 
}


#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  flex-grow: 1;
  width: 100%; /* Ensure the app takes the full width */
}

header {
  background-color: #333;
  color: white;
  padding: 1rem;
  width: 100%; /* Ensure header takes the full width */
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-container {
  display: flex;
  align-items: center;
}

.app-icon {
  width: 40px;
  height: 40px;
  margin-right: 1rem;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
h1 {
  font-size: 2rem;
}

nav {
  display: flex;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
}

nav a:hover {
  text-decoration: underline;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  margin-right: 1rem;
}
main {
  flex: 1;
  padding: 1rem;
  width: 100%; /* Ensure main takes the full width */
}

footer {
  background-color: #333;
  color: white;
  padding: 1rem;
  text-align: center;
  width: 100%; /* Ensure footer takes the full width */
}
</style>
