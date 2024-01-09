import PlayerScores from "@/types/PlayerScores";

// parametr 1: groupTournament.value.groupPlayers.group1
// parametr 2: group1TournamentPlayersScore.value

function createTable(players: string[], score: PlayerScores[]): void {
  const playersScore = [] as PlayerScores[];

  players.forEach((player: string) => {
    const groupPlayer = {
      name: player,
      matches: 0,
      wins: 0,
      draws: 0,
      lost: 0,
      scoredGoals: 0,
      lostGoals: 0,
      get aggregateScore() {
        return this.scoredGoals - this.lostGoals;
      },
      get points() {
        return this.wins * 3 + this.draws * 1;
      },
    };
    playersScore.push(groupPlayer);
  });
  score = playersScore;
}

export default createTable;
