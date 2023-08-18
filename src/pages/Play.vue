<template>
  <div class="npc-container grid-center">
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
import GameBoard from "@/components/GameBoard.vue";
import NPC from "@/components/NPC.vue";
import HumanPlayer from "@/components/HumanPlayer.vue";

const { startGame } = useGameStore();
startGame(5);
const { OTHER_PLAYERS, PLAYERS, HUMAN_PLAYER_INDEX } = useGameStore();
</script>

<style lang="scss" scoped>
.npc-container {
  grid-gap: 0.25rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
</style>
