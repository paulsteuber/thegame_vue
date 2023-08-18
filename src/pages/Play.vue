<template>
  <div class="npc-container">
    <NPC
      v-if="OTHER_PLAYERS.length"
      v-for="player in OTHER_PLAYERS"
      :key="`player-${player.name}`"
      :player="player"
      class="npc-card"
    />
  </div>
  <div class="game-board-container">
    <GameBoard />
  </div>
  <div class="human-player-container">
    <HumanPlayer :player="PLAYERS[HUMAN_PLAYER_INDEX]" />
  </div>
</template>
<script lang="ts" setup>
import { useGameStore } from "@/store/gameStore";
import usePlayRounds from "@/composables/usePlayRounds";
import GameBoard from "@/components/GameBoard.vue";
import NPC from "@/components/NPC.vue";
import HumanPlayer from "@/components/HumanPlayer.vue";
import { storeToRefs } from "pinia";

const { OTHER_PLAYERS, PLAYERS, HUMAN_PLAYER_INDEX } = storeToRefs(
  useGameStore()
);
const { startGame } = useGameStore();
const { letNextPlayerPlay } = usePlayRounds();
// Start the game
startGame(5);
// Start playing
setTimeout(() => {
  letNextPlayerPlay();
}, 3000);
</script>

<style lang="scss" scoped>
.npc-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
