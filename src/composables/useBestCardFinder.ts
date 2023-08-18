import { Recommendation } from "@/types/bestCardFinder";
import {
  Card,
  NPC,
  SingleCardStack,
  Stack,
  StackCard,
  StackType,
} from "@/types/types";
import { storeToRefs } from "pinia";
import { useGameStore } from "@/store/gameStore";

export default () => {
  const { CARD_COUNT } = storeToRefs(useGameStore());
  const recursiveSearch = () => {};
  //const calculateWeight = (cardValue: number, lastStackCard) => {};

  const getStackFillState = (
    lastStackCard: StackCard,
    stackType: StackType
  ) => {
    return stackType === "downwards"
      ? (CARD_COUNT.value - 1 - lastStackCard.number) / CARD_COUNT.value
      : lastStackCard.number / CARD_COUNT.value - 1;
  };

  const collectAllPossibleMoves = (playerCards: Card[], stacks: Stack[]) => {
    const singleCardStacks: SingleCardStack[] = stacks.map((stack) => {
      const lastStackCard = stack.cards.slice(-1)[0];
      return {
        type: stack.type,
        lastCard: lastStackCard,
        fillState:
          stack.cards.length > 1
            ? getStackFillState(lastStackCard, stack.type)
            : 0,
      };
    });
    console.log("🔥", singleCardStacks);
    const possibleMoves = playerCards.map((card) => {
      //
    });
  };

  const findBestCardsToPlay = (
    currentPlayer: NPC,
    stacks: Stack[]
  ): Recommendation => {
    collectAllPossibleMoves(currentPlayer.cards, stacks);
    return {} as Recommendation;
  };
  return { findBestCardsToPlay };
};
