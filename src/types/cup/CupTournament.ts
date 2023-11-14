import User from "@/types/User";
import Match from "../Match";

type CupTournament = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  matches: Match[];
  players: string[];
  is_completed: boolean;
  thirdPlaceMatch: boolean;
};

export default CupTournament;
