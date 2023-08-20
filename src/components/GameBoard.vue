<template>
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

const { humanDroppedCard } = usePlayRounds();

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
