import {
  generatePlayers,
  getRandomNumber,
  generateDeck,
  playerDrawsCards,
} from "@/helpers/start";
import { CardProps, PlayerBase } from "@/types/types";
import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
export const useGameStore = defineStore("gameStore", () => {
  const DECK = reactive<number[]>([]);
  const STACKS = reactive([
    { type: "upwards", cards: [] },
    { type: "upwards", cards: [] },
    { type: "downwards", cards: [] },
    { type: "downwards", cards: [] },
  ]);
  const PLAYERS = reactive<PlayerBase[]>([]);
  const OTHER_PLAYERS = computed(() =>
    PLAYERS.filter((_player, index) => index !== HUMAN_PLAYER_INDEX.value)
  );
  const MAX_PLAYER_CARDS = ref(7);
  const CURRENT_PLAYER_INDEX = ref(0);
  const HUMAN_PLAYER_INDEX = ref(0);
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
      player.cards = drawnCards.map((cardNumber) => ({
        number: cardNumber,
      }));
      DECK.length = 0;
      DECK.push(...remainingDeck);
    });
  };
  const startGame = (playerCount: number) => {
    clearGame();
    setPlayers(playerCount);
    DECK.push(...generateDeck(99));
    playersDrawCards();
    //
  };

  const clearGame = () => {
    PLAYERS.length = 0;
    DECK.length = 0;
  };

  return {
    DECK,
    STACKS,
    PLAYERS,
    OTHER_PLAYERS,
    CURRENT_PLAYER_INDEX,
    HUMAN_PLAYER_INDEX,
    UNDO_LAST_MOVE,
    startGame,
  };
});
