import { MoveTree, Recommendation } from "@/types/bestCardFinder";
import {
  Card,
  NPC,
  SingleCardStack,
  Stack,
  StackCard,
  StackType,
} from "@/types/types";

import {
  generateSingleCardStacks,
  calcDistance,
  deepCloneArray,
} from "@/helpers/cardfinder";

export default () => {
  const recursiveSearch = (
    playerCards: Card[],
    singleCardStacks: SingleCardStack[],
    deepness: number = 1,
    totalDistance: number = 0
  ): MoveTree[][] => {
    console.log("recursive");
    const possibleMoves: MoveTree[][] = playerCards.map((card) => {
      const restCards = playerCards.filter(
        (restCard) => restCard.number !== card.number
      );

      const nextPossibleMoves: MoveTree[] = singleCardStacks
        .map((stack, stackIndex) => {
          const distance = calcDistance(card.number, stack);

          if (distance > 0 || distance === -10) {
            if (deepness > 2 && distance > 5) return null;
            const updatedStacks = deepCloneArray(singleCardStacks);
            updatedStacks[stackIndex].lastCard = card;
            return {
              card: card,
              weight: distance,
              distance: distance,
              targetStackId: stackIndex,
              nextMoves: recursiveSearch(
                restCards,
                updatedStacks,
                deepness + 1,
                totalDistance + distance
              ),
            };
          }
          return null;
        })
        .filter(Boolean) as MoveTree[];

      return nextPossibleMoves;
    });
    return possibleMoves;
  };

  const collectAllPossibleMoves = (
    playerCards: Card[],
    stacks: Stack[],
    maxCardCount: number
  ) => {
    const singleCardStacks = generateSingleCardStacks(stacks, maxCardCount);

    console.log("before recursive");
    return recursiveSearch(playerCards, singleCardStacks);
  };

  const findBestCardsToPlay = (
    currentPlayer: NPC,
    stacks: Stack[],
    maxCardCount: number
  ): Recommendation => {
    console.log(
      collectAllPossibleMoves(currentPlayer.cards, stacks, maxCardCount)
    );
    return {} as Recommendation;
  };
  return { findBestCardsToPlay };
};
