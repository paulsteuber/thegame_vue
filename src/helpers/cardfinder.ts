import {
  CardRecommendation,
  MoveTree,
  Recommendation,
} from "@/types/bestCardFinder";
import { SingleCardStack, Stack, StackCard, StackType } from "@/types/types";

const getStackFillState = (
  lastStackCard: StackCard,
  stackType: StackType,
  cardCount: number
) => {
  return stackType === "downwards"
    ? (cardCount - 1 - lastStackCard.number) / cardCount
    : lastStackCard.number / cardCount - 1;
};

export const generateSingleCardStacks = (
  stacks: Stack[],
  maxCardCount: number
): SingleCardStack[] =>
  stacks.map((stack) => {
    const lastStackCard = stack.cards.slice(-1)[0];
    return {
      type: stack.type,
      lastCard: lastStackCard,
      fillState:
        stack.cards.length > 1
          ? getStackFillState(lastStackCard, stack.type, maxCardCount)
          : 0,
    };
  });

export const calcDistance = (
  cardNumber: number,
  stack: SingleCardStack
): number => {
  if (stack.type === "upwards") {
    return cardNumber - stack.lastCard.number;
  }
  return stack.lastCard.number - cardNumber;
};

export const deepCloneArray = (arr: Array<any>) => {
  return arr.map((elem) => ({ ...elem }));
};

export const generateAllRecommendations = (
  moveTrees: MoveTree[]
): Recommendation[] => {
  const allRecommendations: Recommendation[] = [];

  const recursiveRecommendations = (
    nextMoveTrees: MoveTree[],
    previousRecommendation?: Recommendation
  ) => {
    nextMoveTrees.forEach((moveTree) => {
      const currentCardRecommendation: CardRecommendation = {
        cardNumber: moveTree.card.number,
        weight: moveTree.weight,
        realDistance: moveTree.distance,
        targetStackId: moveTree.targetStackId,
      };
      const previousCardRecommendations =
        previousRecommendation?.cardRecommendations ?? [];
      const nextRecommendation: Recommendation = {
        weight: moveTree.weight + (previousRecommendation?.weight ?? 0),
        realDistance:
          moveTree.distance + (previousRecommendation?.realDistance ?? 0),
        cardRecommendations: [
          ...previousCardRecommendations,
          currentCardRecommendation,
        ],
      };
      allRecommendations.push(nextRecommendation);
      if (moveTree.nextMoves.length) {
        recursiveRecommendations(moveTree.nextMoves.flat(), nextRecommendation);
      }
    });
  };
  // initial recursive call
  recursiveRecommendations(moveTrees);
  return allRecommendations;
};

export const findBestRecommendation = (
  recommendations: Recommendation[],
  deckIsFilled: boolean
): Recommendation => {
  const filterRecommendations = deckIsFilled
    ? recommendations.filter(
        (recommendation) => recommendation.cardRecommendations.length >= 2
      )
    : recommendations;

  const sortRecommendations = filterRecommendations.sort(
    (a, b) => a.weight - b.weight
  );
  return sortRecommendations[0];
};
