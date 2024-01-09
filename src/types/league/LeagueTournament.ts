import User from "@/types/User";
import Match from "../Match";

type LeagueTournament = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  matches: Match[];
  players: string[];
  isCompleted: boolean;
};

export default LeagueTournament;
