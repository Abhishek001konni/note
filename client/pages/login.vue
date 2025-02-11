<script setup>
import { ref} from 'vue';
const runtimeConfig = useRuntimeConfig();
const apiURL  = runtimeConfig.public.apiBase;
const email = ref('');
const password = ref('');

const login = async () => {
        const response = await fetch (`${apiURL}api/auth/login`, {
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
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <button>Login</button>
        </form>
    </div>
</template>
