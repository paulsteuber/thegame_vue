import { Card } from "./types";

export interface Recommendation {
  weight: number;
  realDistance: number;
  cardRecommendations: CardRecommendation[];
}

export interface CardRecommendation {
  cardNumber: number;
  weight: number; // der Abstand aber inklusive berechneter Strafen
  realDistance: number; // der genaue Abstand von Karte zu Stack
  targetStackId: number;
}

export interface MoveTree {
  card: Card;
  weight: number;
  distance: number;
  targetStackId: number;
  nextMoves: MoveTree[][];
}
