import User from "@/types/User";
import Match from "../Match";

type GroupPlayOffTournament = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  groupMatches: {
    group1: Match[];
    group2: Match[];
    group3: Match[];
    group4: Match[];
  };
  playOffMatches: {
    level1: Match[];
    level2: Match[];
    level3: Match[];
    level1IsCompleted: boolean;
    level2IsCompleted: boolean;
  };
  players: string[];
  playOffPlayers: string[];
  groupPlayers: {
    group1: string[];
    group2: string[];
    group3: string[];
    group4: string[];
  };
  isCompleted: boolean;
  groupStageIsCompleted: boolean;
};

export default GroupPlayOffTournament;
