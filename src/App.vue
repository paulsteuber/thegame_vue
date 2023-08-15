<template>
  <div class="app">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/play">Play</router-link>
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
.app {
  /* Hier kannst du den CSS-Stil für die Hauptkomponente anpassen */
}
</style>
