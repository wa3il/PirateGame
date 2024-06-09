<template>
    <div>
      <h5>Home Page</h5>
      <div class="welcome-container">
      <h1 class="welcome-title">Are you ready for adventure?</h1>
      <p class="welcome-text">
        Welcome to Nautibus Island! You're either a brave villager protecting the village or a daring pirate scavenging and attacking. Enjoy the thrilling journey and may the best team win!
      </p>
    </div>
        if !login
      <Login />
      else <Profil />
    </div>
  </template>
  
  <script>
  import Login from '../components/Login.vue';
  import Button from 'primevue/button';
  
  export default {
    name: 'Home',
    components: {
      Login
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
  
  /* Global styles */
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
  }
  
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
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
  }

  .welcome-container {
  text-align: center;
  margin-bottom: 2rem;
  color: white;
}

.welcome-title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.welcome-text {
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}
  
  footer {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
  }
  </style>
  
  