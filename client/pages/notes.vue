<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();
const apiURL = useRuntimeConfig().public.apiBase;
const notes = ref([]);
const errorMessage = ref('');


const fetchNotes = async () => {
    const response = await fetch(`${apiURL}api/notes`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.accessToken}`,
        }

    });

    const data = await response.json();

    if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch notes');
    }

    notes.value = data;
}

onMounted(fetchNotes);
</script>

<template>
    <div>
        <h1>Your notes</h1>
        <p v-if="errorMessage" class="error">{{ errorMessage }} </p>
        <ul v-if="notes.length">
            <li v-for="note in notes" :key="note.id">
                <h2>{{ note.title }}</h2>
                <p>{{ note.content }}</p>
            </li>
        </ul>
        <p v-else>No Notes Available</p>
    </div>
</template>