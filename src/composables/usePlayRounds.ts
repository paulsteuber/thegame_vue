import { useGameStore } from "@/store/gameStore";
import useBestCardFinder from "@/composables/useBestCardFinder";
import { Recommendation } from "@/types/bestCardFinder";

export default () => {
  const { findBestCardsToPlay } = useBestCardFinder();
  const { STACKS, PLAYERS, HUMAN_PLAYER_INDEX, CURRENT_PLAYER_INDEX } =
    useGameStore();

  const letNextPlayerPlay = () => {
    if (HUMAN_PLAYER_INDEX === CURRENT_PLAYER_INDEX) return;
    const currentPlayer = PLAYERS[CURRENT_PLAYER_INDEX];
    const recommendation: Recommendation = findBestCardsToPlay(
      currentPlayer,
      STACKS
    );
  };
  return { letNextPlayerPlay };
};
