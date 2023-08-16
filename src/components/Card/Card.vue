<template>
  <div class="card">
    <NPCCard v-if="type === 'npc'" :card="card" />
    <HumanCard v-if="type === 'human'" :card="card" />

    {{ card.number }}
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
  background-color: sandybrown;
  border: 1px solid white;
}
</style>
