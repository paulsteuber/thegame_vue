<template>
  <div class="npc-container">
    <NPC
      v-if="OTHER_PLAYERS.length"
      v-for="player in OTHER_PLAYERS"
      :key="`player-${player.name}`"
      :player="player"
    />
  </div>
  <div class="game-board-container">
    <GameBoard />
  </div>
</template>
<script lang="ts" setup>
import { useGameStore } from "@/store/gameStore";
import GameBoard from "@/components/GameBoard.vue";
import NPC from "@/components/NPC.vue";

const { startGame } = useGameStore();
startGame(5);
const { OTHER_PLAYERS } = useGameStore();
</script>
