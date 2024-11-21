<template>
    <div class="login-page">
        <h1>Login</h1>
        <form @submit.prevent="handleSubmit">
            <div>
                <label for="username">username:</label>
                <input type="username" id="username" v-model="username" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            <button type="submit">Login</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie'; // Import js-cookie
import  API_URL  from '../../constants.js';

const username = ref('');
const password = ref('');

console.log('API_URL:', API_URL);

const handleSubmit = async () => {
    try {        
        const response = await axios.post(`${API_URL}login/`, {
            username: username.value,
            password: password.value
        });

        const accessToken = response.data.access;
        const refreshToken = response.data.refresh;
        Cookies.set('access_token', accessToken, { expires: 7 });
        Cookies.set('refresh_token', refreshToken, { expires: 7 });
        alert('Login successful');

        console.log('Response data:', response.data);

    } catch (error) {
        // Handle errors
        if (error.response) {

            console.error('Error response:', error.response.data);
            alert('Login failed: ' + error.response.data.detail);
        } else if (error.request) {

            console.error('No response received:', error.request);
            alert('No response from server.');
        } else {
            // Something else caused the error
            console.error('Error:', error.message);
            alert('An error occurred.');
        }
    }
};
</script>

<style scoped>
.login-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.login-page h1 {
    text-align: center;
}

.login-page form {
    display: flex;
    flex-direction: column;
}

.login-page form div {
    margin-bottom: 1rem;
}

.login-page form label {
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.login-page form input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.login-page form button {
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
}

.login-page form button:hover {
    background-color: #0056b3;
}
</style>
