<template>
  <div class="game-board">
    <div class="stacks">
      <Stack
        v-for="(initialValue, index) in initialStackValues"
        :key="index"
        :initialValue="initialValue"
        ref="stacks"
      />
    </div>
    <Player :cards="playerCards" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Stack from "./Stack.vue";
import { CardProps } from "../types/types";

const initialStackValues = [1, 1, 100, 100];
const playerCards = ref<CardProps[]>([]);

const stacks = ref<any[]>([]);
</script>

<style scoped></style>
