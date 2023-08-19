import { useGameStore } from "@/store/gameStore";
import useBestCardFinder from "@/composables/useBestCardFinder";
import { Recommendation } from "@/types/bestCardFinder";
import { storeToRefs } from "pinia";

export default () => {
  const { findBestCardsToPlay } = useBestCardFinder();
  const {
    STACKS,
    PLAYERS,
    HUMAN_PLAYER_INDEX,
    CURRENT_PLAYER_INDEX,
    CARD_COUNT,
  } = storeToRefs(useGameStore());

  const letNextPlayerPlay = () => {
    console.log("letNextPlayerPlay");
    if (HUMAN_PLAYER_INDEX.value === CURRENT_PLAYER_INDEX.value) return;
    const currentPlayer = PLAYERS.value[CURRENT_PLAYER_INDEX.value];
    const recommendation: Recommendation = findBestCardsToPlay(
      currentPlayer,
      STACKS.value,
      CARD_COUNT.value
    );
  };
  return { letNextPlayerPlay };
};
