<template>
  <div class="human-player bg-secondary p-3">
    <Card
      v-for="card in sortedCards"
      :key="`human-card-${card.number}`"
      :card="card"
      draggable="true"
      :ondragstart="(event: DragEvent) => drag(event, card.number)"
    />
  </div>
  <button
    class=""
    :disabled="!isCurrentPlayer && !isAllowedToFinishMove"
    @click="() => humanFinishMove()"
  >
    Zug beenden
  </button>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import Card from "./Card/Card.vue";
import { PlayerBase } from "@/types/types";
import usePlayRounds from "@/composables/usePlayRounds";

const { playNextPlayers, setCurrentPlayerIndexHigher, givePlayerNewCards } =
  usePlayRounds();

interface HumanPlayerProps {
  player: PlayerBase;
  isCurrentPlayer: boolean;
  isAllowedToFinishMove: boolean;
}
const props = defineProps<HumanPlayerProps>();
const drag = (ev: DragEvent, cardNumber: number) => {
  console.log(cardNumber);
  ev.dataTransfer?.setData("cardNumber", cardNumber.toString());
};

const humanFinishMove = () => {
  console.log("Zug beendet");
  if (props.isAllowedToFinishMove) {
    givePlayerNewCards();
    setCurrentPlayerIndexHigher();
    playNextPlayers();
  }
  // is user allowed to finish his move?
};
const sortedCards = computed(() => {
  return props.player.cards.sort((a, b) => a.number - b.number);
});
</script>
<style lang="scss" scoped>
.human-player {
  display: flex;
  gap: 0.75rem;
}
</style>
