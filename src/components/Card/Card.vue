<template>
  <div class="card tile bg-primary grid-center">
    <NPCCard v-if="type === 'npc'" :card="card" />
    <HumanCard v-if="type === 'human'" :card="card" />
    <h3>{{ card.number }}</h3>
  </div>
</template>

<script setup lang="ts">
import { Card } from "@/types/types";
import NPCCard from "@/components/Card/NPCCard.vue";
import HumanCard from "@/components/Card/HumanCard.vue";

interface CardProps {
  card: Card;
  type?: "npc" | "human";
}
const props = defineProps<CardProps>();
</script>

<style scoped lang="scss">
.card {
  width: clamp(3rem, 6rem, 12rem);
  aspect-ratio: 3/4;
}
</style>
