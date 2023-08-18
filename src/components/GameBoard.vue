<template>
  <div class="game-board py-8">
    <div class="stacks">
      <Stack
        v-for="(initialValue, index) in initialStackValues"
        :key="index"
        :initialValue="initialValue"
        ref="stacks"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Stack from "./Stack.vue";

const initialStackValues = [1, 1, 100, 100];

const stacks = ref<any[]>([]);
</script>

<style scoped lang="scss">
.game-board {
  display: grid;
  place-items: center;
}
.stacks {
  display: flex;
}
</style>
