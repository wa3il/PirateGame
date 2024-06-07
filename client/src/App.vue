<script setup>
import { ref, onMounted } from 'vue';
import Login from './components/Login.vue';
import HelloWorld from './components/HelloWorld.vue';

let logged = ref(false);
const loginMessage = ref("");

onMounted(() => {
  const token = localStorage.getItem('jwt');
  if (token) {
    logged.value = true;
  }
});

const toggleLogin = () => {
  logged.value = !logged.value;
};

const getHelloWorldMsg = () => {
  return logged.value ? "Welcome to the App!" : "Please log in to continue.";
};

const handleLoginEvent = (data) => {
  localStorage.setItem('jwt', data.token);
  logged.value = true;
  loginMessage.value = "Login successful!";
};

const handleLogout = () => {
  logged.value = false;
  localStorage.removeItem('jwt');
};


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld :msg="getHelloWorldMsg()" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <button v-if="logged" @click="handleLogout">Logout</button>
    </div>
  </header>

  <template v-if="logged">
    <RouterView />
  </template>
  <template v-else>
    <Login :message="loginMessage" @loginEvent="handleLoginEvent" />
  </template>
</template>

<script>
import { ref } from 'vue';
import Login from './components/Login.vue';
import HelloWorld from './components/HelloWorld.vue';

export default {
  components: {
    Login,
    HelloWorld,
  },
  setup() {
    const logged = ref(false);
    const loginMessage = ref(""); // Message d'erreur ou de succès de login

    const login = () => {
      logged.value = true;
      loginMessage.value = "Login successful!";
    };

    return {
      logged,
      login,
      loginMessage,
    };
  },
};
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
