<template>
    <div class="container">
      <div class="password-change-container">
        <h2>Change Password</h2>
        <form @submit.prevent="handleChangePassword">
          <div class="form-group">
            <label for="new-password">New Password:</label>
            <input type="password" id="new-password" v-model="newPassword" class="input-field">
          </div>
          <div class="form-group">
            <label for="confirm-password">Confirm New Password:</label>
            <input type="password" id="confirm-password" v-model="confirmPassword" class="input-field">
          </div>
          <Button type="submit" label="Change Password" class="submit-button" />
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import Button from 'primevue/button';
  
  export default {
    name: 'userview',
    components: {
      Button
    },
    data() {
      return {
        newPassword: '',
        confirmPassword: ''
      };
    },
    methods: {
      async handleChangePassword() {
        try {
          const response = await fetch(`http://localhost:8080/users_war_exploded/users/${this.login}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login: this.login, newPassword: this.newPassword })
          });
  
          if (response.ok) {
            alert('Password changed successfully');
          } else {
            alert('Failed to change password');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .password-change-container {
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
  </style>
  