import User from "@/types/User";
import CupMatches from "@/types/cup/CupMatches";

type CupTournament = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  matches: CupMatches;
  players: string[];
  isCompleted: boolean;
};

export default CupTournament;
