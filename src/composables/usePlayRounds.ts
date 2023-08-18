import { useGameStore } from "@/store/gameStore";
export default () => {
  const { OTHER_PLAYERS, PLAYERS, HUMAN_PLAYER_INDEX, CURRENT_PLAYER_INDEX } =
    useGameStore();
  const letNextPlayerPlay = () => {};
  return { letNextPlayerPlay };
};
