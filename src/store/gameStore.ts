import {
  generatePlayers,
  getRandomNumber,
  generateDeck,
  playerDrawsCards,
} from "@/helpers/start";
import { PlayedCard, PlayerBase, Stack } from "@/types/types";
import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
export const useGameStore = defineStore("gameStore", () => {
  const CARD_COUNT = ref<number>(99);
  const DECK = ref<number[]>([]);
  const STACKS = reactive<Stack[]>([
    { type: "upwards", cards: [{ number: 1 }] },
    { type: "upwards", cards: [{ number: 1 }] },
    { type: "downwards", cards: [{ number: CARD_COUNT.value + 1 }] },
    { type: "downwards", cards: [{ number: CARD_COUNT.value + 1 }] },
  ]);
  const PLAYERS = reactive<PlayerBase[]>([]);
  const OTHER_PLAYERS = computed(() => {
    const playersWithHigherIndex = PLAYERS.filter((_player, index) => index > HUMAN_PLAYER_INDEX.value);
    const playersWithLowerIndex = PLAYERS.filter((_player, index) => index < HUMAN_PLAYER_INDEX.value);
    return [
      ...playersWithHigherIndex,
      ...playersWithLowerIndex,
    ];
  }
  );
  const MAX_PLAYER_CARDS = ref(6);
  const CURRENT_PLAYER_INDEX = ref(0);
  const HUMAN_PLAYER_INDEX = ref(0);
  const HUMAN_PLAYER_PLAYED_CARDS = reactive<PlayedCard[]>([]);

  const HUMAN_PLAYER_PLAYED_ENOUGH_CARDS = computed(() => {
    console.log("DECK LENGTH", DECK.value.length);
    const minimumPlayedCards = DECK.value.length ? 2 : 1;
    return HUMAN_PLAYER_PLAYED_CARDS.length >= minimumPlayedCards;
  });
  const UNDO_LAST_MOVE = ref({});

  const setPlayers = (count: number) => {
    // set human player index
    HUMAN_PLAYER_INDEX.value = getRandomNumber(count);
    PLAYERS.push(...generatePlayers(count, HUMAN_PLAYER_INDEX.value));
  };
  const playersDrawCards = () => {
    PLAYERS.forEach((player) => {
      const count = MAX_PLAYER_CARDS.value - player.cards.length;
      const [drawnCards, remainingDeck] = playerDrawsCards(DECK.value, count);
      player.cards = drawnCards;

      DECK.value.length = 0;
      DECK.value.push(...remainingDeck);
    });
  };
  const startGame = (playerCount: number) => {
    clearGame();
    setPlayers(playerCount);
    DECK.value.push(...generateDeck(99));
    playersDrawCards();
  };

  const clearGame = () => {
    PLAYERS.length = 0;
    DECK.value.length = 0;
  };

  return {
    CARD_COUNT,
    DECK,
    STACKS,
    PLAYERS,
    OTHER_PLAYERS,
    CURRENT_PLAYER_INDEX,
    HUMAN_PLAYER_INDEX,
    UNDO_LAST_MOVE,
    MAX_PLAYER_CARDS,
    HUMAN_PLAYER_PLAYED_CARDS,
    HUMAN_PLAYER_PLAYED_ENOUGH_CARDS,
    startGame,
  };
});
