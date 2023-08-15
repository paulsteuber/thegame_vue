import { defineStore } from "pinia";
import { ref, reactive, computed } from "vue";
export const useGameStore = defineStore("gameStore", () => {
  const DECK = ref();
  const STACKS = reactive([
    { type: "upwards", cards: [] },
    { type: "upwards", cards: [] },
    { type: "downwards", cards: [] },
    { type: "downwards", cards: [] },
  ]);
  const PLAYERS = reactive<{}[]>([]);
  const CURRENT_PLAYER_INDEX = ref(0);
  const HUMAN_PLAYER_INDEX = ref(0);
  const UNDO_LAST_MOVE = ref({});

  const setPlayers = (count: number, humanPlayerIndex: number) => {
    PLAYERS.push({});
    PLAYERS.push({});
    PLAYERS.push({});
  };
  return {
    DECK,
    STACKS,
    PLAYERS,
    CURRENT_PLAYER_INDEX,
    HUMAN_PLAYER_INDEX,
    UNDO_LAST_MOVE,
    setPlayers,
  };
});
