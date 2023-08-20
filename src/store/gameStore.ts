import {
  generatePlayers,
  getRandomNumber,
  generateDeck,
  playerDrawsCards,
} from "@/helpers/start";
import { CardProps, PlayedCard, PlayerBase, Stack } from "@/types/types";
import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
export const useGameStore = defineStore("gameStore", () => {
  const CARD_COUNT = ref<number>(99);
  const DECK = reactive<number[]>([]);
  const STACKS = reactive<Stack[]>([
    { type: "upwards", cards: [{ number: 1 }] },
    { type: "upwards", cards: [{ number: 1 }] },
    { type: "downwards", cards: [{ number: CARD_COUNT.value + 1 }] },
    { type: "downwards", cards: [{ number: CARD_COUNT.value + 1 }] },
  ]);
  const PLAYERS = reactive<PlayerBase[]>([]);
  const OTHER_PLAYERS = computed(() =>
    PLAYERS.filter((_player, index) => index !== HUMAN_PLAYER_INDEX.value)
  );
  const MAX_PLAYER_CARDS = ref(6);
  const CURRENT_PLAYER_INDEX = ref(0);
  const HUMAN_PLAYER_INDEX = ref(0);
  const HUMAN_PLAYER_PLAYED_CARDS = reactive<PlayedCard[]>([]);

  const HUMAN_PLAYER_PLAYED_ENOUGH_CARDS = computed(() => {
    const minimumPlayedCards = DECK.length ? 2 : 1;
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
      const [drawnCards, remainingDeck] = playerDrawsCards(DECK, count);
      player.cards = drawnCards;

      DECK.length = 0;
      DECK.push(...remainingDeck);
    });
  };
  const startGame = (playerCount: number) => {
    clearGame();
    setPlayers(playerCount);
    DECK.push(...generateDeck(99));
    playersDrawCards();
  };

  const clearGame = () => {
    PLAYERS.length = 0;
    DECK.length = 0;
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
