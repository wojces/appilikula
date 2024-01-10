import Match from "@/types/Match";
import PlayerScores from "@/types/PlayerScores";

function updateGroupTable(matches: Match[], playerScore: PlayerScores[]): void {
  matches.forEach((match: Match) => {
    const playerAIndex = playerScore.findIndex(
      (player: PlayerScores) => player.name === match.player_a
    );
    const playerBIndex = playerScore.findIndex(
      (player: PlayerScores) => player.name === match.player_b
    );

    if (match.player_a_score > match.player_b_score) {
      playerScore[playerAIndex].matches++;
      playerScore[playerAIndex].wins++;
      playerScore[playerAIndex].scoredGoals =
        playerScore[playerAIndex].scoredGoals + match.player_a_score;
      playerScore[playerAIndex].lostGoals =
        playerScore[playerAIndex].lostGoals + match.player_b_score;

      playerScore[playerBIndex].matches++;
      playerScore[playerBIndex].lost++;
      playerScore[playerBIndex].scoredGoals =
        playerScore[playerBIndex].scoredGoals + match.player_b_score;
      playerScore[playerBIndex].lostGoals =
        playerScore[playerBIndex].lostGoals + match.player_a_score;
    } else if (match.player_a_score < match.player_b_score) {
      playerScore[playerBIndex].matches++;
      playerScore[playerBIndex].wins++;
      playerScore[playerBIndex].scoredGoals =
        playerScore[playerBIndex].scoredGoals + match.player_b_score;
      playerScore[playerBIndex].lostGoals =
        playerScore[playerBIndex].lostGoals + match.player_a_score;

      playerScore[playerAIndex].matches++;
      playerScore[playerAIndex].lost++;
      playerScore[playerAIndex].scoredGoals =
        playerScore[playerAIndex].scoredGoals + match.player_a_score;
      playerScore[playerAIndex].lostGoals =
        playerScore[playerAIndex].lostGoals + match.player_b_score;
    } else if (match.player_a_score === match.player_b_score) {
      playerScore[playerAIndex].matches++;
      playerScore[playerAIndex].draws++;
      playerScore[playerAIndex].scoredGoals =
        playerScore[playerAIndex].scoredGoals + match.player_a_score;
      playerScore[playerAIndex].lostGoals =
        playerScore[playerAIndex].lostGoals + match.player_b_score;

      playerScore[playerBIndex].matches++;
      playerScore[playerBIndex].draws++;
      playerScore[playerBIndex].scoredGoals =
        playerScore[playerBIndex].scoredGoals + match.player_b_score;
      playerScore[playerBIndex].lostGoals =
        playerScore[playerBIndex].lostGoals + match.player_a_score;
    }

    playerScore[playerAIndex].aggregateScore =
      playerScore[playerAIndex].scoredGoals -
      playerScore[playerAIndex].lostGoals;
    playerScore[playerAIndex].points =
      playerScore[playerAIndex].wins * 3 + playerScore[playerAIndex].draws * 1;
    playerScore[playerBIndex].aggregateScore =
      playerScore[playerBIndex].scoredGoals -
      playerScore[playerBIndex].lostGoals;
    playerScore[playerBIndex].points =
      playerScore[playerBIndex].wins * 3 + playerScore[playerAIndex].draws * 1;
  });
  playerScore.sort((a: PlayerScores, b: PlayerScores) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    } else if (a.points === b.points && a.aggregateScore === b.aggregateScore) {
      return b.scoredGoals - a.scoredGoals;
    } else {
      return b.aggregateScore - a.aggregateScore;
    }
  });
}

export default updateGroupTable;
