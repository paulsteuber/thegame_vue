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
    DECK,
  } = storeToRefs(useGameStore());

  const letNextPlayerPlay = () => {
    console.log("letNextPlayerPlay");
    if (HUMAN_PLAYER_INDEX.value === CURRENT_PLAYER_INDEX.value) return;
    const currentPlayer = PLAYERS.value[CURRENT_PLAYER_INDEX.value];
    const recommendation: Recommendation = findBestCardsToPlay(
      currentPlayer,
      STACKS.value,
      CARD_COUNT.value,
      DECK.value
    );
    console.log("RECO", recommendation);

    recommendation.cardRecommendations.forEach((cardReco) => {
      // add card from recommendation list to stack
      STACKS.value[cardReco.targetStackId].cards.push({
        number: cardReco.cardNumber,
      });
      // and remove the card from players hand
      currentPlayer.cards = currentPlayer.cards.filter(
        (c) => c.number !== cardReco.cardNumber
      );
    });
  };
  return { letNextPlayerPlay };
};
