<template>
  <div class="player">
    <div class="player-cards">
      <Card
        v-for="card in playerCards"
        :key="card.number"
        :number="card.number"
        @click.native="selectCard(card)"
      />
    </div>
    <div class="player-actions">
      <button @click="playSelectedCard" :disabled="!selectedCard">
        Karte spielen
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "./Card.vue";
import { CardProps } from "../types/types";

const props = defineProps<{
  cards: CardProps[];
  onPlayCard: (card: CardProps) => void;
}>();

const playerCards = ref<CardProps[]>(props.cards);
const selectedCard = ref<CardProps | null>(null);

const selectCard = (card: CardProps) => {
  selectedCard.value = card;
};

const playSelectedCard = () => {
  if (selectedCard.value) {
    props.onPlayCard(selectedCard.value);
    const cardIndex = playerCards.value.findIndex(
      (card) => card.number === selectedCard.value?.number
    );
    if (cardIndex >= 0) {
      playerCards.value.splice(cardIndex, 1);
    }
    selectedCard.value = null;
  }
};
</script>

<style scoped></style>
