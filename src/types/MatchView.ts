import User from "@/types/User";
type Match = {
  match_id: string;
  date: string;
  player_a_uuid: string;
  player_b_uuid: string;
  player_a_score: number;
  player_b_score: number;
  playerA: User | undefined;
  playerB: User | undefined;
};

export default Match;
