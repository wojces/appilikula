import User from "@/types/User";

type League = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  playersNumber: number;
  is_completed: boolean;
};

export default League;
