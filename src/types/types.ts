export interface StackProps {
  initialValue: number;
}
export interface Stack {
  type: StackType;
  cards: StackCard[];
}
export interface SingleCardStack {
  type: StackType;
  lastCard: StackCard;
  fillState: number;
}
export interface CardProps {
  number: number;
}
export interface Card {
  number: number;
}
export type StackType = "upwards" | "downwards";

export interface StackCard {
  number: number;
}
export interface PlayerBase {
  name: string;
  cards: Card[];
}
export interface NPC extends PlayerBase {}

export interface PlayedCard {
  cardNumber: number;
  stackId: number;
}