<template>
  <div>
    <h2>{{ message }}</h2>

    <label for="login">Login :&nbsp;</label>
    <input v-model="login" type="text" name="login" id="login" />
    <br />
    <label for="password">Password :&nbsp;</label>
    <input v-model="password" type="password" name="password" id="password" />
    <br />
    <button @click="handleLogin">Send</button>
  </div>
</template>

<script>
export default {
  name: "Login",
  props: {
    message: String,
  },
  data() {
    return {
      login: '',
      password: ''
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('http://localhost:8080/users_war_exploded/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Origin': window.location.origin
          },
          body: JSON.stringify({ login: this.login, password: this.password })
        });

        if (response.ok) {
          const data = await response.json();
          this.$emit('loginEvent', data);
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred');
      }
    }
  }
}
</script>

<style scoped>
input,
input[type="submit"],
select {
  color: grey;
  border: 1px solid;
}
</style>
