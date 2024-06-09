<template>
  <div class="container">
    <div class="login-container">
      <h2 v-if="isLogin">Please login or create an account</h2>
      <h2 v-else>Create an Account</h2>
      <form @submit.prevent="handleConnection">
        <div class="form-group">
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="user.login" class="input-field">
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="user.password" class="input-field">
        </div>
        <div v-if="!isLogin" class="form-group">
          <label for="role">Role:</label>
          <select id="role" v-model="user.role" class="input-field">
            <option value="VILLAGEOIS">Villageois</option>
            <option value="PIRATE">Pirate</option>
          </select>
        </div>
        <Button type="submit" :label="isLogin ? 'Login' : 'Create Account'" class="submit-button" />
      </form>
      <div class="toggle-link">
        <span @click="toggleMode">{{ isLogin ? 'Create an Account' : 'Already have an account? Login' }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import Button from 'primevue/button';

export default {
  name: 'Login',
  components: {
    Button
  },
  data() {
    return {
      isLogin: true,
      user: {
        login: '',
        password: '',
        role: 'VILLAGEOIS'
      }
    };
  },
  methods: {
    toggleMode() {
      this.isLogin = !this.isLogin;
    },
    async handleLogin() {
      try {
        const response = await fetch('http://localhost:8080/users_war_exploded/users/login', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ login: this.user.login, password: this.user.password })
        });

        if (response.ok) {
          const data = await response.json();
          alert('Login successful');
          localStorage.setItem('token', data.token);
          this.user.role = data.species; // Assign the role from response
          localStorage.setItem('user', JSON.stringify(this.user));
          this.$emit('loginEvent', this.user);
          this.$router.push('/game');
        } else {
          alert('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    },
    async handleSubscribe() {
      try {
        const response = await fetch('http://localhost:8080/users_war_exploded/users', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({ login: this.user.login, password: this.user.password, species: this.user.role })
        });
        if (response.ok) {
          const data = await response.json();
          alert('Account created successfully');
          this.$emit('loginEvent', { login: this.user.login, role: this.user.role });
          this.toggleMode();
        } else {
          alert('Account creation failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    },
    handleConnection() {
      if (this.isLogin) {
        this.handleLogin();
      } else {
        this.handleSubscribe();
      }
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

.form-group {
  margin-bottom: 1rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
}

.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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

.toggle-link {
  margin-top: 1rem;
  text-align: center;
}

.toggle-link span {
  color: #007bff;
  cursor: pointer;
  text-decoration: underline;
}

.toggle-link span:hover {
  color: #0056b3;
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
</style>
