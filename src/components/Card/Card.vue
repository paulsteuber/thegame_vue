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
  background: radial-gradient(
        farthest-side at -33.33% 50%,
        #0000 52%,
        #e95a89 54% 57%,
        #0000 59%
      )
      0 calc(56px / 2),
    radial-gradient(
        farthest-side at 50% 133.33%,
        #0000 52%,
        #e95a89 54% 57%,
        #0000 59%
      )
      calc(56px / 2) 0,
    radial-gradient(
      farthest-side at 133.33% 50%,
      #0000 52%,
      #e95a89 54% 57%,
      #0000 59%
    ),
    radial-gradient(
      farthest-side at 50% -33.33%,
      #0000 52%,
      #e95a89 54% 57%,
      #0000 59%
    ),
    rgba(232, 90, 138, 0.55);
  background-size: calc(56px / 4.667) 56px, 56px calc(56px / 4.667);
}
</style>
