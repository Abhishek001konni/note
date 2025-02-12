<script setup>
import { ref} from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

const apiURL  = useRuntimeConfig().public.apiBase;
const email = ref('');
const password = ref('');
const accessToken = computed(() => authStore.accessToken);

const login = async () => {
        const response = await fetch (`${apiURL}api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken.value}`,
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
        <h1>Login</h1>
        <form @submit.prevent="login">
            <input v-model="email" type="email" placeholder="Email" />
            <input v-model="password" type="password" placeholder="Password" />
            <button>Login</button>
        </form>
    </div>
</template>
