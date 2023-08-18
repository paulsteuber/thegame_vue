<template>
  <div class="app">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/play">Play</router-link>
      <router-view></router-view>
    </div>
    <div class="developer-content">
      <div class="flex-x">
        <h3>DECK:</h3>
        <span>{{ DECK }}</span>
      </div>
      <div class="flex-x">
        <h3>PLAYER:</h3>
      </div>
      <div class="flex-y">
        <div v-if="PLAYERS.length" v-for="player in PLAYERS" class="flex-x">
          <h4>{{ player.name }}:</h4>
          <span>{{ player.cards.map((card) => card.number) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "@/store/gameStore";
const { DECK, PLAYERS } = useGameStore();
</script>

<style lang="scss">
@import "./src/assets/styles/main.scss";
.app {
  /* Hier kannst du den CSS-Stil für die Hauptkomponente anpassen */
}
.flex-x {
  display: flex;
}
.flex-y {
  display: flex;
  flex-direction: column;
}
</style>
