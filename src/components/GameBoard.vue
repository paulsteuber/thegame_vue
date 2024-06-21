<template>
  <div v-if="GAME_STATE !== 'playing'" class="game-state-message">
    <h1>{{ GAME_STATE }}</h1>
  </div>
  <div class="game-board py-8">
    <div class="stacks">
      <DiscardStack
        v-for="(stack, index) in stacks"
        :key="`board-stack-${index}`"
        :stack="stack"
        ref="stacks"
        :ondrop="(event:DragEvent) => humanDroppedCard(event, index)"
        :ondragover="(event:DragEvent) => event.preventDefault()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DiscardStack from "@/components/DiscardStack.vue";
import { Stack } from "@/types/types";
import usePlayRounds from "@/composables/usePlayRounds";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/store/gameStore";

const { humanDroppedCard } = usePlayRounds();
const { GAME_STATE } = storeToRefs(useGameStore());

interface GameBoardProps {
  stacks: Stack[];
}
defineProps<GameBoardProps>();
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
