<template>
    <div>
      <h5>Game Page</h5>
      <MyMap />
    </div>
  </template>
  
  <script>
  import MyMap from '../components/MyMap.vue';
  
  export default {
    name: 'Game',
    components: {
      MyMap
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
  
  footer {
    background-color: #333;
    color: white;
    padding: 1rem;
    text-align: center;
  }
  </style>
  