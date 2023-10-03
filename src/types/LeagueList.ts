import User from "@/types/User";

type LeagueList = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  playersNumber: number;
};

export default LeagueList;
