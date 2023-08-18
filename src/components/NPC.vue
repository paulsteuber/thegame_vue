<template>
  <div class="npc tile bg-background-light p-3">
    <div class="npc-head">
      <h2>{{ player.name }}</h2>
    </div>
    <div class="npc-cards">
      <Card v-for="card in player.cards" :card="card" type="npc" />
    </div>
  </div>
</template>

<script setup lang="ts">
//import { ref } from "vue";
import Card from "@/components/Card/Card.vue";
import { NPC } from "@/types/types";

interface NPCProps {
  player: NPC;
}
defineProps<NPCProps>();
</script>

<style scoped lang="scss">
.npc {
}
.npc-cards {
  display: flex;
  gap: 0.25rem;
}
</style>
