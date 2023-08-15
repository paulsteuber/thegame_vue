<template>
  <div class="card" :class="{ 'card-selected': isSelected }">
    {{ number }}
  </div>
</template>

<script setup lang="ts">
export interface CardProps {
  number: number;
  isSelected?: boolean;
}
const props = defineProps<CardProps>();
</script>

<style scoped lang="scss">
.card {
  background-color: sandybrown;
  border: 1px solid white;
}
</style>
