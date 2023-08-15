import { CardProps } from "../types/types";

export const shuffleDeck = (deck: CardProps[]) => {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
};

export const generateDeck = (): CardProps[] => {
  const deck: CardProps[] = [];
  for (let i = 2; i <= 99; i++) {
    deck.push({ number: i });
  }
  return deck;
};

export const initialCardsForPlayer = (
  deck: CardProps[],
  numberOfCards: number
): CardProps[] => {
  return deck.slice(0, numberOfCards);
};
