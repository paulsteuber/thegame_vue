<template>
  <div class="stack">
    <Card
      :class="`card-${index}`"
      v-for="(card, index) in visibleCards"
      :key="`card-${card.number}`"
      :card="card"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Card from "@/components/Card/Card.vue";
import { Stack } from "@/types/types";
export interface StackProps {
  stack: Stack;
}

const props = defineProps<StackProps>();

const visibleCards = computed(() => {
  const stackLength = props.stack.cards.length;
  return props.stack.cards.slice(stackLength - 3, stackLength);
});
</script>

<style lang="scss" scoped>
.stack {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  > [class^="card"] {
    grid-row: 1;
    grid-column: 1;
  }
}
</style>
