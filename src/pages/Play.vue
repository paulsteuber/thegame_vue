<template>
  <div class="npc-container">
    <NPC
      v-if="OTHER_PLAYERS.length"
      v-for="(player) in OTHER_PLAYERS"
      :key="`player-${player.name}`"
      :player="player"
      :is-current-player="player.name === PLAYERS[CURRENT_PLAYER_INDEX].name"
      :positionIndex="player.positionIndex"
      class="npc-card"
    />
  </div>
  <div class="game-board-container">
    <GameBoard :stacks="STACKS" />
  </div>
  <div class="human-player-container">
    <HumanPlayer
      :player="PLAYERS[HUMAN_PLAYER_INDEX]"
      :is-current-player="CURRENT_PLAYER_INDEX === HUMAN_PLAYER_INDEX"
      :is-allowed-to-finish-move="HUMAN_PLAYER_PLAYED_ENOUGH_CARDS"
    />
  </div>
</template>
<script lang="ts" setup>
import { useGameStore } from "@/store/gameStore";
import usePlayRounds from "@/composables/usePlayRounds";
import GameBoard from "@/components/GameBoard.vue";
import NPC from "@/components/NPC.vue";
import HumanPlayer from "@/components/HumanPlayer.vue";
import { storeToRefs } from "pinia";

const {
  OTHER_PLAYERS,
  PLAYERS,
  CURRENT_PLAYER_INDEX,
  HUMAN_PLAYER_INDEX,
  STACKS,
  HUMAN_PLAYER_PLAYED_ENOUGH_CARDS,
} = storeToRefs(useGameStore());
const { startGame } = useGameStore();

/**
 *  PLAY LOGIC
 */
const { playNextPlayers } = usePlayRounds();
// Start the game
startGame(5);
// Start playing

playNextPlayers();
</script>

<style lang="scss" scoped>
.npc-container {
  display: flex;
  flex-wrap: wrap;
}
</style>
