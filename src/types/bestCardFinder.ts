export interface Recommendation {
  weight: number;
  cardRecommendations: CardRecommendation[];
}

export interface CardRecommendation {
  cardNumber: number;
  weight: number;
  targetStackId: number;
}
