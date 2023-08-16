export interface StackProps {
  initialValue: number;
}
export interface CardProps {
  number: number;
}
export interface Card {
  number: number;
}
export interface PlayerBase {
  name: string;
  cards: Card[];
}
export interface NPC extends PlayerBase {}
