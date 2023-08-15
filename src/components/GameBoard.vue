<template>
  <div class="game-board">
    <div class="npcs">
      <div class="npc" v-for="(player, index) in PLAYERS" :key="index">
        <h1>NPC {{ player }}</h1>
      </div>
    </div>
    <div class="stacks">
      <Stack
        v-for="(initialValue, index) in initialStackValues"
        :key="index"
        :initialValue="initialValue"
        ref="stacks"
      />
    </div>
    <Player :cards="playerCards" @playCard="handlePlayCard" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Stack from "./Stack.vue";
import Player from "./Player.vue";
import { CardProps } from "../types/types";
import {
  shuffleDeck,
  generateDeck,
  initialCardsForPlayer,
} from "../composables/start";
import { useGameStore } from "@/store/gameStore";

const { PLAYERS } = useGameStore();
const initialStackValues = [1, 1, 100, 100];
const playerCards = ref<CardProps[]>([]);

const handlePlayCard = (card: CardProps) => {
  for (const stack of stacks.value) {
    if (stack.canAddCard(card.number)) {
      stack.addCardToStack(card);
      break;
    }
  }
};

onMounted(() => {
  const deck = generateDeck();
  shuffleDeck(deck);
  playerCards.value = initialCardsForPlayer(deck, 6);
});

const stacks = ref<any[]>([]);
</script>

<style scoped></style>
