import { PlayerBase } from "../types/types";
import { PLAYERNAMES } from "../../playernames";

const shuffleDeck = (deck: number[]): number[] => {
  const shuffled = deck;
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return shuffled;
};

export const generateDeck = (max: number): number[] => {
  const deck: number[] = [];
  for (let i = 2; i <= max; i++) {
    deck.push(i);
  }
  return shuffleDeck(deck);
};

export const getRandomNumber = (max: number) => {
  return Math.floor(Math.random() * max);
};

export const generateNewPlayer = (name: string, positionIndex: number): PlayerBase => {
  return {
    name: name,
    positionIndex,
    cards: [],
  };
};

export const generatePlayers = (
  count: number,
  humanPlayerIndex: number
): PlayerBase[] => {
  const generatedPlayers = [];
  let playerNames = [...PLAYERNAMES];

  for (let i = 0; i < count; i++) {
    if (humanPlayerIndex === i) {
      generatedPlayers.push(generateNewPlayer("Du", i));
    } else {
      const newPlayerName = playerNames[getRandomNumber(playerNames.length)];

      playerNames = playerNames.filter((name) => name !== newPlayerName);

      generatedPlayers.push(generateNewPlayer(newPlayerName, i));
    }
  }
  return generatedPlayers;
};

export const playerDrawsCards = (
  deck: number[],
  count: number
): [{ number: number }[], number[]] => {
  return [
    deck.slice(0, count).map((cardNumber) => ({
      number: cardNumber,
    })),
    deck.slice(count),
  ];
};
