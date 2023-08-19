import { MoveTree, Recommendation } from "@/types/bestCardFinder";
import { Card, NPC, SingleCardStack, Stack } from "@/types/types";

import {
  generateSingleCardStacks,
  calcDistance,
  deepCloneArray,
  generateAllRecommendations,
  findBestRecommendation,
} from "@/helpers/cardfinder";

export default () => {
  const generateMoveTree = (
    playerCards: Card[],
    singleCardStacks: SingleCardStack[],
    deepness: number = 1,
    totalDistance: number = 0
  ): MoveTree[][] => {
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
              nextMoves: generateMoveTree(
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

  const generateAllPossibleMoves = (
    playerCards: Card[],
    stacks: Stack[],
    maxCardCount: number
  ) => {
    const singleCardStacks = generateSingleCardStacks(stacks, maxCardCount);
    return generateMoveTree(playerCards, singleCardStacks);
  };

  const findBestCardsToPlay = (
    currentPlayer: NPC,
    stacks: Stack[],
    maxCardCount: number,
    deck: number[]
  ): Recommendation => {
    const possibleMoves = generateAllPossibleMoves(
      currentPlayer.cards,
      stacks,
      maxCardCount
    ).flat();
    const allRecommendations = generateAllRecommendations(possibleMoves);
    const bestRecommendation = findBestRecommendation(
      allRecommendations,
      deck.length > 0
    );

    console.log(bestRecommendation);
    return {} as Recommendation;
  };
  return { findBestCardsToPlay };
};
