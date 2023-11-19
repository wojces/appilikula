<template>
  <div
    v-if="Object.keys(leagueTournament) && Object.keys(leagueTournament).length"
    class="container my-5 p-5 border"
  >
    <div class="title">
      <div class="d-flex flex-row gap-3 description">
        <p>Data utworzenia: {{ leagueTournament.date }}</p>
        <p>Utworzył: {{ leagueTournament.user?.name }}</p>
        <p>
          Status: {{ leagueTournament.is_completed ? "Zakończony" : "Aktywny" }}
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
            :class="{
              'table-warning': index === 0,
              'table-secondary': index === 1,
              'table-danger': index === 2,
            }"
            v-for="(player, index) in leaguePlayersScore"
            :key="index"
          >
            <td scope="row">{{ index + 1 }}</td>
            <td>{{ player.name }}</td>
            <td>{{ player.matches }}</td>
            <td>{{ player.wins }}</td>
            <td>{{ player.draws }}</td>
            <td>{{ player.lost }}</td>
            <td>{{ player.scoredGoals }}:{{ player.lostGoals }}</td>
            <td>{{ player.aggregateScoreline }}</td>
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
        ref="form"
        class="row my-1"
        v-for="(match, index) in leagueTournament.matches"
        :key="index"
      >
        <div class="col-1">{{ index + 1 }}</div>
        <div class="col-3">{{ match.player_a }}</div>
        <div class="col-2">
          <input
            type="number"
            min="0"
            max="99"
            class="form-control"
            v-model="leagueTournament.matches[index].player_a_score"
            :disabled="leagueTournament.matches[index].is_played"
            required
          />
        </div>
        <div class="col-3">{{ match.player_b }}</div>
        <div class="col-2">
          <input
            type="number"
            min="0"
            max="99"
            class="form-control"
            v-model="leagueTournament.matches[index].player_b_score"
            :disabled="leagueTournament.matches[index].is_played"
            required
          />
        </div>
        <div class="col-1">
          <div v-if="leagueTournament.is_completed"></div>
          <button
            v-else-if="leagueTournament.matches[index].is_played"
            class="btn btn-outline-secondary btn-sm"
            @click="restoreMatch(index)"
          >
            Cofnij
          </button>
          <button
            v-else
            type="submit"
            class="btn btn-outline-success btn-sm"
            @click.prevent="updateMatch(index)"
          >
            Zatwierdź
          </button>
        </div>
      </form>
    </div>
    <div class="end-button">
      <button
        v-if="endPosibility"
        class="btn btn-secondary btn-lg"
        @click="endTournament()"
      >
        Zakończ turniej
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import LeagueScore from "@/types/league/LeagueScore";
import LeagueTournament from "@/types/league/LeagueTournament";
import User from "@/types/User";
import Match from "@/types/Match";

import { useRoute } from "vue-router";
import { doc, onSnapshot, collection, updateDoc } from "firebase/firestore";
import { Ref, ref, onMounted } from "vue";
import db from "@/firebase/firebaseInit";

const leaguesCollectionRef = collection(db, "league");
const usersCollectionRef = collection(db, "users");

let id: string | string[] = "";
const form = ref(null);
const route = useRoute();
let leagueTournament = ref({} as LeagueTournament);
let users: Ref<User[]> = ref([]);

let leaguePlayersScore = ref([] as LeagueScore[]);
let endPosibility = false;

function createTable(): void {
  const playersScore = [] as LeagueScore[];
  leagueTournament.value.players.forEach((player: string) => {
    const leaguePlayer = {
      name: player,
      matches: 0,
      wins: 0,
      draws: 0,
      lost: 0,
      scoredGoals: 0,
      lostGoals: 0,
      get aggregateScoreline() {
        return this.scoredGoals - this.lostGoals;
      },
      get points() {
        return this.wins * 3 + this.draws * 1;
      },
    };
    playersScore.push(leaguePlayer);
  });
  leaguePlayersScore.value = playersScore;
}

function updateTable(): void {
  leagueTournament.value.matches.forEach((match: Match) => {
    let playerAIndex = leaguePlayersScore.value.findIndex(
      (player: LeagueScore) => player.name === match.player_a
    );
    let playerBIndex = leaguePlayersScore.value.findIndex(
      (player: LeagueScore) => player.name === match.player_b
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
  });
  leaguePlayersScore.value.sort((a: LeagueScore, b: LeagueScore) => {
    if (a.points !== b.points) {
      return b.points - a.points;
    } else if (
      a.points === b.points &&
      a.aggregateScoreline === b.aggregateScoreline
    ) {
      return b.scoredGoals - a.scoredGoals;
    } else {
      return b.aggregateScoreline - a.aggregateScoreline;
    }
  });
}

function updateMatch(index: number): void {
  if (
    form.value &&
    form.value[index] &&
    !(form.value[index] as HTMLFormElement).checkValidity()
  ) {
    (form.value[index] as HTMLFormElement).reportValidity();
    return;
  }

  leagueTournament.value.matches[index].is_played = true;
  endPosibility = leagueTournament.value.matches.every(
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
    is_completed: leagueTournament.value.is_completed,
    matches: leagueTournament.value.matches,
  });
}

function endTournament(): void {
  leagueTournament.value.is_completed = true;
  if (typeof id === "string") {
    updateLeague(id);
  }
  endPosibility = false;
  window.scrollTo(0, 0);
}

function timestampToDate(timestamp: number): string {
  let unix_timestamp = timestamp;
  const date = new Date(unix_timestamp * 1000);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = date.getFullYear();
  let fullDate = day + "." + month + "." + year;

  return fullDate;
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
      is_completed: doc.data()?.is_completed,
    };
    createTable();
    updateTable();
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

<style lang="scss">
// Alternatywna opcja kolorowania tabeli
// .table-league {
//   tr:first-child td {
//     background-color: rgb(255, 255, 142);
//   }
//   tr:nth-child(2) td {
//     background-color: rgb(204, 204, 204);
//   }
//   tr:nth-child(3) td {
//     background-color: rgb(141, 47, 47);
//   }
// }
</style>
