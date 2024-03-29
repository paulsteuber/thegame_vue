import { useGameStore } from "@/store/gameStore";
import useBestCardFinder from "@/composables/useBestCardFinder";
import { Recommendation } from "@/types/bestCardFinder";
import { storeToRefs } from "pinia";
import { playerDrawsCards } from "@/helpers/start";
import { Stack } from "@/types/types";

export default () => {
  const { findBestCardsToPlay } = useBestCardFinder();
  const {
    STACKS,
    PLAYERS,
    HUMAN_PLAYER_INDEX,
    CURRENT_PLAYER_INDEX,
    CARD_COUNT,
    DECK,
    MAX_PLAYER_CARDS,
    HUMAN_PLAYER_PLAYED_CARDS,
  } = storeToRefs(useGameStore());

  const setCurrentPlayerIndexHigher = () => {
    const currentIndex = CURRENT_PLAYER_INDEX.value;
    console.log(currentIndex);
    if (currentIndex === PLAYERS.value.length - 1) {
      CURRENT_PLAYER_INDEX.value = 0;
      return;
    }
    CURRENT_PLAYER_INDEX.value = currentIndex + 1;
  };

  const letPlayerPlay = () => {
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

  const isCardAllowedOnStack = (stack: Stack, cardNumber: number): boolean => {
    const stackLastCardNumber = stack.cards[stack.cards.length - 1].number;

    const distance =
      stack.type === "upwards"
        ? cardNumber - stackLastCardNumber
        : stackLastCardNumber - cardNumber;
    return distance > 0 || distance === -10;
  };

  const givePlayerNewCards = () => {
    const currentPlayer = PLAYERS.value[CURRENT_PLAYER_INDEX.value];
    const [drawnCards, remainingDeck] = playerDrawsCards(
      DECK.value,
      MAX_PLAYER_CARDS.value - currentPlayer.cards.length
    );
    currentPlayer.cards = [...currentPlayer.cards, ...drawnCards];
    console.log("Remaining Deck", remainingDeck.length);
    DECK.value = remainingDeck;
  };

  const humanDroppedCard = (event: DragEvent, stackId: number) => {
    event.preventDefault();
    const droppedCardNumberData = event.dataTransfer?.getData("cardNumber");
    if (!droppedCardNumberData) return;
    const droppedCardNumber = parseInt(droppedCardNumberData);

    // check if dropping is allowed
    const targetStack = STACKS.value[stackId];
    if (!isCardAllowedOnStack(targetStack, droppedCardNumber)) return;

    // remove card from players hand
    const humanPlayer = PLAYERS.value[HUMAN_PLAYER_INDEX.value];
    humanPlayer.cards = humanPlayer.cards.filter(
      (card) => card.number !== droppedCardNumber
    );
    // add card to stack
    targetStack.cards.push({ number: droppedCardNumber });
    HUMAN_PLAYER_PLAYED_CARDS.value.push({
      cardNumber: droppedCardNumber,
      stackId: stackId,
    });
  };
  const playNextPlayers = () => {
    if (HUMAN_PLAYER_INDEX.value === CURRENT_PLAYER_INDEX.value) {
      HUMAN_PLAYER_PLAYED_CARDS.value.length = 0;
      return;
    }
    setTimeout(() => {
      console.log("Start");
      letPlayerPlay();
      givePlayerNewCards();
      setCurrentPlayerIndexHigher();
      playNextPlayers();
    }, 500);
  };
  return {
    letPlayerPlay,
    setCurrentPlayerIndexHigher,
    givePlayerNewCards,
    humanDroppedCard,
    playNextPlayers,
  };
};
