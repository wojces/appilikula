import User from "@/types/User";
import Match from "../Match";

type CupTournament = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  matches: {
    level1: Match[];
    level2: Match[];
    level3: Match[];
    level4: Match[];
    level1IsCompleted: boolean;
    level2IsCompleted: boolean;
    level3IsCompleted: boolean;
  };
  players: string[];
  is_completed: boolean;
};

export default CupTournament;
