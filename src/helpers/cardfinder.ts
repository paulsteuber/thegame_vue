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
