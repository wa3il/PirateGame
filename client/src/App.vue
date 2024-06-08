<template>
  <div id="app">
    <header>
      <div class="title-container">
        <!--<img src="@/assets/icon.png" alt="App Icon" class="app-icon" />-->
        <h1>Pirate's Curse</h1>
      </div>
      <nav>
        <router-link v-if="!isLoggedIn" to="/">Home</router-link>
        <router-link v-if="isLoggedIn" to="/game">Game</router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <p>&copy; 2024 Pirate's Curse</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isLoggedIn: false // Change this to true to simulate a logged-in user
    };
  }
};
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
