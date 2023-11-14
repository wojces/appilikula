import User from "@/types/User";

type Cup = {
  name: string;
  date: string;
  id: string;
  user: User | undefined;
  playersNumber: number;
  is_completed: boolean;
};

export default Cup;
