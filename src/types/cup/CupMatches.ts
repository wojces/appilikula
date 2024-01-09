import Match from "../Match";

type CupMatches = {
  level1: Match[];
  level2: Match[];
  level3: Match[];
  level4: Match[];
  level1IsCompleted: boolean;
  level2IsCompleted: boolean;
  level3IsCompleted: boolean;
};

export default CupMatches;
