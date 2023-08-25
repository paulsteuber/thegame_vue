<template>
  <div class="stack-wrapper">
    <div class="stack">
      <Card
        :class="`card-${index}`"
        v-for="(card, index) in visibleCards.reverse()"
        :key="`card-${card.number}`"
        :card="card"
      />
    </div>
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
  const sliceStartValue = stackLength < 3 ? 0 : stackLength - 3;
  return props.stack.cards.slice(sliceStartValue, stackLength);
});
</script>

<style lang="scss" scoped>
.stack-wrapper {
  perspective: 1000px;
  transition: all 0.2s ease-out;
  &:hover {
    transform: rotateX(5deg) rotateZ(-5deg);
  }
}
.stack {
  padding: 2.5rem;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  > [class^="card"] {
    grid-row: 1;
    grid-column: 1;
  }

  .card {
    position: relative;
    box-shadow: 0 0 2.4px rgba(0, 0, 0, 0.022), 0 0 5.9px rgba(0, 0, 0, 0.032),
      0 0 11px rgba(0, 0, 0, 0.04), 0 0 19.7px rgba(0, 0, 0, 0.048),
      0 0 36.8px rgba(0, 0, 0, 0.058), 0 0 88px rgba(0, 0, 0, 0.08);

    transition-duration: 0.4s;
    transition-timing-function: ease-out;
    transition-duration: 0.4s;
    transition-property: transform, top, left, right;
    &:hover ~ * {
      --top-offset: 15%;
      --horizontal-offset: 45%;
    }
    &.card-2 {
      opacity: 0.35;
      transform: rotate(-10deg) translateX(-0.5rem) translateY(1.5rem);
      z-index: 1;
      top: calc(-20% - var(--top-offset, 0%));
      left: calc(-10% - var(--horizontal-offset, 0%));
    }
    &.card-1 {
      opacity: 0.8;
      transform: rotate(10deg) translateX(0.5rem) translateY(0.75rem);
      z-index: 2;
      top: calc(-10% - var(--top-offset, 0%));
      right: calc(-10% - var(--horizontal-offset, 0%));
    }
    &.card-0 {
      transform: rotate(0);
      z-index: 3;
    }
  }
}
</style>
