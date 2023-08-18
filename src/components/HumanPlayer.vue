<template>
  <div class="human-player bg-secondary p-3">
    <Card
      v-for="card in player.cards"
      :key="`human-card-${card.number}`"
      :card="card"
    />
  </div>
</template>
<script lang="ts" setup>
import Card from "./Card/Card.vue";
import { PlayerBase } from "@/types/types";

interface HumanPlayerProps {
  player: PlayerBase;
}

defineProps<HumanPlayerProps>();
</script>
<style lang="scss" scoped>
.human-player {
  display: flex;
  gap: 0.75rem;
}
</style>
