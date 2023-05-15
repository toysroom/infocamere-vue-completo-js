<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container">
    <header>
      <nav>
        <RouterLink to="/">Login</RouterLink> |
        <RouterLink to="/register">Register</RouterLink> |
        <RouterLink to="/dashboard">Dahboard</RouterLink>
      </nav>
    </header>

    <RouterView />

    <footer>
      Footer
    </footer>
  </div>
</template>