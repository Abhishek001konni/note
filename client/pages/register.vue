<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const apiURL = useRuntimeConfig().public.apiBase;

const register = async () => {
    const response = await fetch(`${apiURL}api/auth/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email.value,
            password: password.value,
        })
    })
    const data = await response.json();
    console.log(data);

    authStore.setTokens(data.accessToken, data.refreshToken);
    
}

</script> 


<template>
<div>
    <h2>Register</h2>
    <form @submit.prevent="register">
        <input v-model="email" type="email" placeholder="Email" />
        <input v-model="password" type="password" placeholder="Password" />
        <button>Register</button>
    </form>
</div>

</template>
