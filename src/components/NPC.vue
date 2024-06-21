<template>
  <div
    class="npc tile bg-secondary p-3"
    :class="{ 'bg-background-light': isCurrentPlayer }"
  >
    <div class="npc-head">
      <h2>{{ player.name }}</h2>
      <span>{{ positionIndex + 1 }}</span>
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
  positionIndex: number;
  isCurrentPlayer: boolean;
}
defineProps<NPCProps>();
</script>

<style scoped lang="scss">
.npc {
}
.npc-cards {
  display: flex;
  justify-content: center;
  gap: 0.25rem;
}
</style>
