import User from "@/types/User";
import Match from "../Match";

type LeagueTournament = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  matches: Match[];
  players: string[];
  is_completed: boolean;
};

export default LeagueTournament;
