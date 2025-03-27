<template>
    <nav class="bg-red-500 p-4">
      <ul class="flex space-x-6 text-white">
        <li><NuxtLink to="/" class="hover:underline">Home</NuxtLink></li>
        <li><NuxtLink to="/notes" class="hover:underline">Notes</NuxtLink></li>
        <li><NuxtLink to="/todo" class="hover:underline">Todos</NuxtLink></li>
        <li><NuxtLink to="/paste" class="hover:underline">Pastes</NuxtLink></li>
      </ul>
    </nav>
  </template>