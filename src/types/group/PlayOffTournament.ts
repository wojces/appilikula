import Match from "@/types/Match";

type PlayOffTournament = {
  date: string;
  id: string;
  matches: {
    level1: Match[];
    level2: Match[];
    level3: Match[];
    level1IsCompleted: boolean;
    level2IsCompleted: boolean;
  };
  isCompleted: boolean;
  players: string[];
};

export default PlayOffTournament;
