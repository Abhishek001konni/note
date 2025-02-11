<script setup>
import { ref } from 'vue';
const email = ref('');
const password = ref('');
const runtimeConfig = useRuntimeConfig();
const apiURL = runtimeConfig.public.apiBase;

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
