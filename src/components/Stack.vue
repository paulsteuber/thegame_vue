<template>
  <div class="stack" @click="() => addCardToStack">
    <Card v-for="card in cards" :key="`card-${card.number}`" :card="card" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/Card/Card.vue";
import { CardProps } from "../types/types";
export interface StackProps {
  initialValue: number;
}
const props = defineProps<StackProps>();

const cards = ref<CardProps[]>([
  {
    number: props.initialValue,
  },
]);

const canAddCard = (cardNumber: number): boolean => {
  const topCardNumber = cards.value[cards.value.length - 1].number;
  if (props.initialValue === 1) {
    return cardNumber > topCardNumber || cardNumber === topCardNumber - 10;
  } else {
    return cardNumber < topCardNumber || cardNumber === topCardNumber + 10;
  }
};

const addCardToStack = (card: CardProps) => {
  if (canAddCard(card.number)) {
    cards.value.push(card);
  }
};
</script>

<style scoped></style>
