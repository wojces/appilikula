import User from "@/types/User";
import SingleMatch from "../SingleMatch";

type LeagueTournament = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  matches: SingleMatch[];
  players: string[];
  completed: boolean;
};

export default LeagueTournament;
