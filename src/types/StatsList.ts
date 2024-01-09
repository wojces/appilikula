import User from "@/types/User";

type StatsList = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  playersNumber: number;
  isCompleted: boolean;
};

export default StatsList;
