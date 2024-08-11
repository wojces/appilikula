<template>
  <div
    v-if="Object.keys(leagueTournament) && Object.keys(leagueTournament).length"
    class="container p-5 border">
    <div class="title">
      <div class="d-flex flex-row gap-3 description">
        <p>Data utworzenia: {{ leagueTournament.date }}</p>
        <p>Utworzył: {{ leagueTournament.user?.name }}</p>
        <p>
          Status: {{ leagueTournament.isCompleted ? "Zakończony" : "Aktywny" }}
        </p>
      </div>
      <h1>Turniej: {{ leagueTournament.name }}</h1>
    </div>
    <div class="table my-5">
      <h5 class="fw-bold mb-4">Tabela</h5>
      <table class="table table-league">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Drużyna</th>
            <th scope="col">M</th>
            <th scope="col">W</th>
            <th scope="col">R</th>
            <th scope="col">P</th>
            <th scope="col">B</th>
            <th scope="col">RB</th>
            <th scope="col">P</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="tableColors(index)"
            v-for="(player, index) in leaguePlayersScore"
            :key="index">
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ player.name }}</td>
            <td>{{ player.matches }}</td>
            <td>{{ player.wins }}</td>
            <td>{{ player.draws }}</td>
            <td>{{ player.lost }}</td>
            <td>{{ player.scoredGoals }}:{{ player.lostGoals }}</td>
            <td>{{ player.aggregateScore }}</td>
            <td class="fw-bold">{{ player.points }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="matches my-5">
      <h5 class="fw-bold mb-4">Mecze</h5>
      <div class="row fw-bold my-3">
        <div class="col-1">#</div>
        <div class="col-3">Gracz A</div>
        <div class="col-2">Wynik Gracza A</div>
        <div class="col-3">Gracz B</div>
        <div class="col-2">Wynik Gracza B</div>
        <div class="col-1"></div>
      </div>
      <form
        class="row my-1"
        v-for="(match, index) in leagueTournament.matches"
        :key="index">
        <div class="col-1">{{ index + 1 }}</div>
        <div class="col-3">{{ match.player_a }}</div>
        <div class="col-2">
          <input
            type="number"
            min="0"
            max="99"
            class="form-control"
            :class="invalidResultPlayerA(index)"
            v-model="leagueTournament.matches[index].player_a_score"
            :disabled="leagueTournament.matches[index].is_played"
            @blur="clearPlayerAResultValidation(index)" />
        </div>
        <div class="col-3">{{ match.player_b }}</div>
        <div class="col-2">
          <input
            type="number"
            min="0"
            max="99"
            class="form-control"
            :class="invalidResultPlayerB(index)"
            v-model="leagueTournament.matches[index].player_b_score"
            :disabled="leagueTournament.matches[index].is_played"
            @blur="clearPlayerBResultValidation(index)" />
        </div>
        <div class="col-1">
          <div v-if="leagueTournament.isCompleted"></div>
          <button
            v-else-if="leagueTournament.matches[index].is_played"
            class="btn btn-outline-secondary btn-sm"
            @click="restoreMatch(index)">
            ←
          </button>
          <button
            v-else
            type="submit"
            class="btn btn-outline-success btn-sm"
            @click.prevent="updateMatch(index)">
            ✓
          </button>
        </div>
        <div
          v-if="
            !validationState[index].playerAResultIsValid ||
            !validationState[index].playerBResultIsValid
          "
          class="error-message col-12 my-1">
          <span class="text-danger">
            Nie wprowadzono wyniku lub wprowadzono niepoprawny wynik
          </span>
        </div>
      </form>
    </div>
    <div class="end-button">
      <button
        v-if="endIsPosible"
        class="btn btn-secondary btn-lg"
        @click="endTournament()">
        Zakończ turniej
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerScores from "@/types/PlayerScores";
import LeagueTournament from "@/types/league/LeagueTournament";
import User from "@/types/User";
import Match from "@/types/Match";
import ValidationState from "@/types/ValidationState";
import timestampToDate from "@/functions/timestampToDate";

import { useRoute } from "vue-router";
import { doc, onSnapshot, collection, updateDoc } from "firebase/firestore";
import { Ref, ref, onMounted } from "vue";
import db from "@/firebase/firebaseInit";

const leaguesCollectionRef = collection(db, "league");
const usersCollectionRef = collection(db, "users");

let id: string | string[] = "";
const route = useRoute();
let leagueTournament = ref({} as LeagueTournament);
let users: Ref<User[]> = ref([]);

let leaguePlayersScore = ref([] as PlayerScores[]);
let endIsPosible = ref(false);

let resultIsValid = ref(true);
let validationState = ref([] as ValidationState[]);

function createValidationState(): void {
  let validationStateArray = [] as ValidationState[];
  leagueTournament.value.matches.forEach(() => {
    let matchResultIsValid = {
      playerAResultIsValid: true,
      playerBResultIsValid: true,
    };
    validationStateArray.push(matchResultIsValid);
  });
  validationState.value = validationStateArray;
}

function invalidResultPlayerA(index: number): string {
  if (!validationState.value[index].playerAResultIsValid)
    return "border border-danger";
  else return "";
}
function invalidResultPlayerB(index: number): string {
  if (!validationState.value[index].playerBResultIsValid)
    return "border border-danger";
  else return "";
}

function matchResultsValidation(index: number): void {
  resultIsValid.value = true;
  if (!Number.isInteger(leagueTournament.value.matches[index].player_a_score)) {
    resultIsValid.value = false;
    validationState.value[index].playerAResultIsValid = false;
  }
  if (!Number.isInteger(leagueTournament.value.matches[index].player_b_score)) {
    resultIsValid.value = false;
    validationState.value[index].playerBResultIsValid = false;
  }
}

function clearPlayerAResultValidation(index: number): void {
  validationState.value[index].playerAResultIsValid = true;
}
function clearPlayerBResultValidation(index: number): void {
  validationState.value[index].playerBResultIsValid = true;
}

function tableColors(index: number): string | undefined {
  if (index === 0) return "table-warning";
  if (index === 1) return "table-secondary";
  if (index === 2) return "table-danger";
}

function createTable(): void {
  const playersScore = [] as PlayerScores[];
  leagueTournament.value.players.forEach((player: string) => {
    const leaguePlayer: PlayerScores = {
      name: player,
      matches: 0,
      wins: 0,
      draws: 0,
      lost: 0,
      scoredGoals: 0,
      lostGoals: 0,
      aggregateScore: 0,
      points: 0,
    };
    playersScore.push(leaguePlayer);
  });
  leaguePlayersScore.value = playersScore;
}

function updateTable(): void {
  leagueTournament.value.matches.forEach((match: Match) => {
    let playerAIndex = leaguePlayersScore.value.findIndex(
      (player: PlayerScores) => player.name === match.player_a
    );
    let playerBIndex = leaguePlayersScore.value.findIndex(
      (player: PlayerScores) => player.name === match.player_b
    );

    if (match.player_a_score > match.player_b_score) {
      leaguePlayersScore.value[playerAIndex].matches++;
      leaguePlayersScore.value[playerAIndex].wins++;
      leaguePlayersScore.value[playerAIndex].scoredGoals =
        leaguePlayersScore.value[playerAIndex].scoredGoals +
        match.player_a_score;
      leaguePlayersScore.value[playerAIndex].lostGoals =
        leaguePlayersScore.value[playerAIndex].lostGoals + match.player_b_score;

      leaguePlayersScore.value[playerBIndex].matches++;
      leaguePlayersScore.value[playerBIndex].lost++;
      leaguePlayersScore.value[playerBIndex].scoredGoals =
        leaguePlayersScore.value[playerBIndex].scoredGoals +
        match.player_b_score;
      leaguePlayersScore.value[playerBIndex].lostGoals =
        leaguePlayersScore.value[playerBIndex].lostGoals + match.player_a_score;
    } else if (match.player_a_score < match.player_b_score) {
      leaguePlayersScore.value[playerBIndex].matches++;
      leaguePlayersScore.value[playerBIndex].wins++;
      leaguePlayersScore.value[playerBIndex].scoredGoals =
        leaguePlayersScore.value[playerBIndex].scoredGoals +
        match.player_b_score;
      leaguePlayersScore.value[playerBIndex].lostGoals =
        leaguePlayersScore.value[playerBIndex].lostGoals + match.player_a_score;

      leaguePlayersScore.value[playerAIndex].matches++;
      leaguePlayersScore.value[playerAIndex].lost++;
      leaguePlayersScore.value[playerAIndex].scoredGoals =
        leaguePlayersScore.value[playerAIndex].scoredGoals +
        match.player_a_score;
      leaguePlayersScore.value[playerAIndex].lostGoals =
        leaguePlayersScore.value[playerAIndex].lostGoals + match.player_b_score;
    } else if (match.player_a_score === match.player_b_score) {
      leaguePlayersScore.value[playerAIndex].matches++;
      leaguePlayersScore.value[playerAIndex].draws++;
      leaguePlayersScore.value[playerAIndex].scoredGoals =
        leaguePlayersScore.value[playerAIndex].scoredGoals +
        match.player_a_score;
      leaguePlayersScore.value[playerAIndex].lostGoals =
        leaguePlayersScore.value[playerAIndex].lostGoals + match.player_b_score;

      leaguePlayersScore.value[playerBIndex].matches++;
      leaguePlayersScore.value[playerBIndex].draws++;
      leaguePlayersScore.value[playerBIndex].scoredGoals =
        leaguePlayersScore.value[playerBIndex].scoredGoals +
        match.player_b_score;
      leaguePlayersScore.value[playerBIndex].lostGoals =
        leaguePlayersScore.value[playerBIndex].lostGoals + match.player_a_score;
    }

    leaguePlayersScore.value[playerAIndex].aggregateScore =
      leaguePlayersScore.value[playerAIndex].scoredGoals -
      leaguePlayersScore.value[playerAIndex].lostGoals;
    leaguePlayersScore.value[playerAIndex].points =
      leaguePlayersScore.value[playerAIndex].wins * 3 +
      leaguePlayersScore.value[playerAIndex].draws * 1;

    leaguePlayersScore.value[playerBIndex].aggregateScore =
      leaguePlayersScore.value[playerBIndex].scoredGoals -
      leaguePlayersScore.value[playerBIndex].lostGoals;
    leaguePlayersScore.value[playerBIndex].points =
      leaguePlayersScore.value[playerBIndex].wins * 3 +
      leaguePlayersScore.value[playerAIndex].draws * 1;
  });
  leaguePlayersScore.value.sort((a: PlayerScores, b: PlayerScores) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    } else if (a.points === b.points && a.aggregateScore === b.aggregateScore) {
      return b.scoredGoals - a.scoredGoals;
    } else {
      return b.aggregateScore - a.aggregateScore;
    }
  });
}

function updateMatch(index: number): void {
  matchResultsValidation(index);
  if (!resultIsValid.value) {
    return;
  }

  leagueTournament.value.matches[index].is_played = true;
  endIsPosible.value = leagueTournament.value.matches.every(
    (match: Match) => match.is_played === true
  );
  if (typeof id === "string") {
    updateLeague(id);
  }
}

function restoreMatch(index: number): void {
  leagueTournament.value.matches[index].is_played = false;
}

async function updateLeague(id: string): Promise<void> {
  await updateDoc(doc(leaguesCollectionRef, id), {
    is_completed: leagueTournament.value.isCompleted,
    matches: leagueTournament.value.matches,
  });
}

function endTournament(): void {
  leagueTournament.value.isCompleted = true;
  if (typeof id === "string") {
    updateLeague(id);
  }
  endIsPosible.value = false;
  window.scrollTo(0, 0);
}

function getUsers(): void {
  onSnapshot(usersCollectionRef, (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const user = {
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
      };
      users.value.push(user as User);
    });
  });
}

function getLeagueTournament(id: string): void {
  onSnapshot(doc(db, "league", id), (doc) => {
    leagueTournament.value = {
      name: doc.data()?.name,
      date: timestampToDate(doc.data()?.date?.seconds),
      id: doc.id,
      user: users.value.find((user: User) => user.id === doc.data()?.user_uuid),
      matches: doc.data()?.matches,
      players: doc.data()?.players,
      isCompleted: doc.data()?.is_completed,
    };
    createTable();
    updateTable();
    createValidationState();
  });
}

onMounted(async () => {
  id = route.params.id;
  getUsers();
  if (typeof id === "string") {
    getLeagueTournament(id);
  }
});
</script>

<style lang="scss"></style>
