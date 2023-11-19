<template>
  <div
    v-if="Object.keys(cupTournament) && Object.keys(cupTournament).length"
    class="container my-5 p-5 border"
  >
    <div class="title">
      <div class="d-flex flex-row gap-3 description">
        <p>Data utworzenia: {{ cupTournament.date }}</p>
        <p>Utworzył: {{ cupTournament.user?.name }}</p>
        <p>
          Status: {{ cupTournament.is_completed ? "Zakończony" : "Aktywny" }}
        </p>
      </div>
      <h1>Turniej: {{ cupTournament.name }}</h1>
    </div>

    <div class="tournament-bracket my-5">
      <h5 class="fw-bold mb-4">Drabinka</h5>
      <div class="heading row fw-bold my-3">
        <div
          v-if="cupTournament.matches.level1.length === 8"
          class="col-3"
          :class="numberOfPlayersObject"
        >
          1/16
        </div>
        <div
          v-if="
            cupTournament.matches.level2.length === 4 ||
            cupTournament.matches.level1.length === 8
          "
          class="col-3"
          :class="numberOfPlayersObject"
        >
          ćwierćfinał
        </div>
        <div class="col-3" :class="numberOfPlayersObject">półfinał</div>
        <div class="col-3" :class="numberOfPlayersObject">finał</div>
      </div>

      <div class="row my-3">
        <div
          class="a-sixteen col-3"
          v-if="cupTournament.matches.level1.length === 8"
          :class="numberOfPlayersObject"
        >
          <form
            ref="form1"
            class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
            v-for="(match, index) in cupTournament.matches.level1"
            :key="index"
          >
            <div class="player-names col-2">
              <div class="row my-3">
                {{ match.player_a }}
              </div>
              <div class="row my-3">
                {{ match.player_b }}
              </div>
            </div>
            <div class="score-inputs col-3">
              <div class="row my-1">
                <input
                  :id="match.player_a"
                  type="number"
                  min="0"
                  max="99"
                  class="form-control text-center"
                  v-model="cupTournament.matches.level1[index].player_a_score"
                  :disabled="cupTournament.matches.level1[index].is_played"
                  required
                />
              </div>
              <div class="row my-1">
                <input
                  :id="match.player_b"
                  type="number"
                  min="0"
                  max="99"
                  class="form-control text-center"
                  v-model="cupTournament.matches.level1[index].player_b_score"
                  :disabled="cupTournament.matches.level1[index].is_played"
                  required
                />
              </div>
            </div>
            <div class="buttons col-1">
              <div class="row my-2">
                <div v-if="cupTournament.matches.level1IsCompleted"></div>
                <button
                  v-else-if="cupTournament.matches.level1[index].is_played"
                  class="btn btn-outline-secondary btn-sm d-flex justify-content-center"
                  @click="restoreMatch(index)"
                >
                  ←
                </button>
                <button
                  v-else
                  type="submit"
                  class="btn btn-outline-success btn-sm d-flex justify-content-center"
                  @click.prevent="updateMatch(index)"
                >
                  ✓
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          class="quarter-final col-3 d-flex flex-column justify-content-around"
          v-if="
            cupTournament.matches.level2.length === 4 ||
            cupTournament.matches.level1.length === 8
          "
          :class="numberOfPlayersObject"
        >
          <form
            ref="form2"
            class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
            v-for="(match, index) in cupTournament.matches.level2"
            :key="index"
          >
            <div class="player-names col-2">
              <div class="row my-3">{{ match.player_a }}</div>
              <div class="row my-3">{{ match.player_b }}</div>
            </div>
            <div class="score-inputs col-3">
              <div class="row my-1">
                <input
                  :id="match.player_a"
                  type="number"
                  min="0"
                  max="99"
                  class="form-control text-center"
                  v-model="cupTournament.matches.level2[index].player_a_score"
                  :disabled="cupTournament.matches.level2[index].is_played"
                  required
                />
              </div>
              <div class="row my-1">
                <input
                  :id="match.player_b"
                  type="number"
                  min="0"
                  max="99"
                  class="form-control text-center"
                  v-model="cupTournament.matches.level2[index].player_b_score"
                  :disabled="cupTournament.matches.level2[index].is_played"
                  required
                />
              </div>
            </div>
            <div class="buttons col-1">
              <div class="row my-2">
                <div v-if="cupTournament.matches.level2IsCompleted"></div>
                <button
                  v-else-if="cupTournament.matches.level2[index].is_played"
                  class="btn btn-outline-secondary btn-sm d-flex justify-content-center"
                  @click="restoreMatch(index)"
                >
                  ←
                </button>
                <button
                  v-else
                  type="submit"
                  class="btn btn-outline-success btn-sm d-flex justify-content-center"
                  @click.prevent="updateMatch(index)"
                >
                  ✓
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          class="semi-final col-3 d-flex flex-column justify-content-around"
          :class="numberOfPlayersObject"
        >
          <form
            ref="form3"
            class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
            v-for="(match, index) in cupTournament.matches.level3"
            :key="index"
          >
            <div class="player-names col-2">
              <div class="row my-3">{{ match.player_a }}</div>
              <div class="row my-3">{{ match.player_b }}</div>
            </div>
            <div class="score-inputs col-3">
              <div class="row my-1">
                <input
                  :id="match.player_a"
                  type="number"
                  min="0"
                  max="99"
                  class="form-control text-center"
                  v-model="cupTournament.matches.level3[index].player_a_score"
                  :disabled="cupTournament.matches.level3[index].is_played"
                  required
                />
              </div>
              <div class="row my-1">
                <input
                  :id="match.player_b"
                  type="number"
                  min="0"
                  max="99"
                  class="form-control text-center"
                  v-model="cupTournament.matches.level3[index].player_b_score"
                  :disabled="cupTournament.matches.level3[index].is_played"
                  required
                />
              </div>
            </div>
            <div class="buttons col-1">
              <div class="row my-2">
                <div v-if="cupTournament.matches.level3IsCompleted"></div>
                <button
                  v-else-if="cupTournament.matches.level3[index].is_played"
                  class="btn btn-outline-secondary btn-sm d-flex justify-content-center"
                  @click="restoreMatch(index)"
                >
                  ←
                </button>
                <button
                  v-else
                  type="submit"
                  class="btn btn-outline-success btn-sm d-flex justify-content-center"
                  @click.prevent="updateMatch(index)"
                >
                  ✓
                </button>
              </div>
            </div>
          </form>
        </div>
        <div
          class="final col-3 d-flex flex-column justify-content-center"
          :class="numberOfPlayersObject"
        >
          <form
            ref="form4"
            class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
            v-for="(match, index) in cupTournament.matches.level4"
            :key="index"
          >
            <div class="player-names col-2">
              <div class="row my-3">{{ match.player_a }}</div>
              <div class="row my-3">{{ match.player_b }}</div>
            </div>
            <div class="score-inputs col-3">
              <div class="row my-1">
                <input
                  :id="match.player_a"
                  type="number"
                  min="0"
                  max="99"
                  class="form-control text-center"
                  v-model="cupTournament.matches.level4[index].player_a_score"
                  :disabled="cupTournament.matches.level4[index].is_played"
                  required
                />
              </div>
              <div class="row my-1">
                <input
                  :id="match.player_b"
                  type="number"
                  min="0"
                  max="99"
                  class="form-control text-center"
                  v-model="cupTournament.matches.level4[index].player_b_score"
                  :disabled="cupTournament.matches.level4[index].is_played"
                  required
                />
              </div>
            </div>
            <div class="buttons col-1">
              <div v-if="!cupTournament.is_completed" class="row my-2">
                <button
                  v-if="cupTournament.matches.level4[index].is_played"
                  class="btn btn-outline-secondary btn-sm d-flex justify-content-center"
                  @click="restoreMatch(index)"
                >
                  ←
                </button>
                <button
                  v-else
                  type="submit"
                  class="btn btn-outline-success btn-sm d-flex justify-content-center"
                  @click.prevent="updateMatch(index)"
                >
                  ✓
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="end-button">
      <button
        v-if="aSixteenEndPosibility"
        class="btn btn-secondary btn-lg"
        @click="goToQuarterFinals"
      >
        Przejdź do ćwierćfinałów
      </button>
      <button
        v-if="quarterFinalsEndPosibility"
        class="btn btn-secondary btn-lg"
        @click="goToSemiFinals()"
      >
        Przejdź do półfinałów
      </button>
      <button
        v-if="semiFinalsEndPosibility"
        class="btn btn-secondary btn-lg"
        @click="goToFinals()"
      >
        Przejdź do finału
      </button>
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
import CupTournament from "@/types/cup/CupTournament";
import Match from "@/types/Match";
import User from "@/types/User";

import { useRoute } from "vue-router";
import { doc, onSnapshot, collection, updateDoc } from "firebase/firestore";
import { Ref, ref, onMounted, computed } from "vue";
import db from "@/firebase/firebaseInit";

const numberOfPlayersObject = computed(() => ({
  "col-3": cupTournament.value.players.length === 16,
  "col-4": cupTournament.value.players.length === 8,
  "col-6": cupTournament.value.players.length === 4,
}));

const cupsCollectionRef = collection(db, "cup");
const usersCollectionRef = collection(db, "users");

let id: string | string[] = "";

const form1 = ref(null);
const form2 = ref(null);
const form3 = ref(null);
const form4 = ref(null);

const route = useRoute();
let cupTournament = ref({} as CupTournament);
let users: Ref<User[]> = ref([]);

let aSixteenEndPosibility = false;
let quarterFinalsEndPosibility = false;
let semiFinalsEndPosibility = false;
let endPosibility = false;

function goToQuarterFinals() {
  cupTournament.value.matches.level1IsCompleted = true;

  let aSixteenWinners: string[] = [];
  let level2Matches: Match[] = [];

  cupTournament.value.matches.level1.forEach((match: Match) => {
    if (match.player_a_score > match.player_b_score) {
      aSixteenWinners.push(match.player_a);
    } else if (match.player_a_score < match.player_b_score) {
      aSixteenWinners.push(match.player_b);
    }
  });

  for (let i = 0; i < cupTournament.value.matches.level1.length; i += 2) {
    let match: Match = {
      player_a: aSixteenWinners[i],
      player_b: aSixteenWinners[i + 1],
      player_a_score: NaN,
      player_b_score: NaN,
      is_played: false,
    };
    level2Matches.push(match);
  }
  cupTournament.value.matches.level2 = level2Matches;

  if (typeof id === "string") {
    updateCup(id);
  }
  aSixteenEndPosibility = false;
}
function goToSemiFinals() {
  cupTournament.value.matches.level2IsCompleted = true;

  let quarterFinalsWinners: string[] = [];
  let level3Matches: Match[] = [];

  cupTournament.value.matches.level2.forEach((match: Match) => {
    if (match.player_a_score > match.player_b_score) {
      quarterFinalsWinners.push(match.player_a);
    } else if (match.player_a_score < match.player_b_score) {
      quarterFinalsWinners.push(match.player_b);
    }
  });

  for (let i = 0; i < cupTournament.value.matches.level2.length; i += 2) {
    let match: Match = {
      player_a: quarterFinalsWinners[i],
      player_b: quarterFinalsWinners[i + 1],
      player_a_score: NaN,
      player_b_score: NaN,
      is_played: false,
    };
    level3Matches.push(match);
  }
  cupTournament.value.matches.level3 = level3Matches;

  if (typeof id === "string") {
    updateCup(id);
  }
  quarterFinalsEndPosibility = false;
}
function goToFinals() {
  cupTournament.value.matches.level3IsCompleted = true;

  let semiFinalsWinners: string[] = [];
  let level4Matches: Match[] = [];

  cupTournament.value.matches.level3.forEach((match: Match) => {
    if (match.player_a_score > match.player_b_score) {
      semiFinalsWinners.push(match.player_a);
    } else if (match.player_a_score < match.player_b_score) {
      semiFinalsWinners.push(match.player_b);
    }
  });

  for (let i = 0; i < cupTournament.value.matches.level3.length; i += 2) {
    let match: Match = {
      player_a: semiFinalsWinners[i],
      player_b: semiFinalsWinners[i + 1],
      player_a_score: NaN,
      player_b_score: NaN,
      is_played: false,
    };
    level4Matches.push(match);
  }
  cupTournament.value.matches.level4 = level4Matches;

  if (typeof id === "string") {
    updateCup(id);
  }
  semiFinalsEndPosibility = false;
}
function endTournament(): void {
  cupTournament.value.is_completed = true;
  if (typeof id === "string") {
    updateCup(id);
  }
  endPosibility = false;
}

function updateASixteen(index: number) {
  if (
    cupTournament.value.matches.level1[index].player_a_score !==
    cupTournament.value.matches.level1[index].player_b_score
  ) {
    cupTournament.value.matches.level1[index].is_played = true;
    aSixteenEndPosibility = cupTournament.value.matches.level1.every(
      (match: Match) => match.is_played === true
    );
  }
}

function updateQuarterFinal(index: number) {
  if (
    cupTournament.value.matches.level2[index].player_a_score !==
    cupTournament.value.matches.level2[index].player_b_score
  ) {
    cupTournament.value.matches.level2[index].is_played = true;
    quarterFinalsEndPosibility = cupTournament.value.matches.level2.every(
      (match: Match) => match.is_played === true
    );
  }
}

function updateSemiFinal(index: number) {
  if (
    cupTournament.value.matches.level3[index].player_a_score !==
    cupTournament.value.matches.level3[index].player_b_score
  ) {
    cupTournament.value.matches.level3[index].is_played = true;
    semiFinalsEndPosibility = cupTournament.value.matches.level3.every(
      (match: Match) => match.is_played === true
    );
  }
}

function updateFinal(index: number) {
  if (
    cupTournament.value.matches.level4[index].player_a_score !==
    cupTournament.value.matches.level4[index].player_b_score
  ) {
    cupTournament.value.matches.level4[index].is_played = true;
    endPosibility = cupTournament.value.matches.level4.every(
      (match: Match) => match.is_played === true
    );
  }
}

function updateMatch(index: number): void {
  if (
    form1.value &&
    form1.value[index] &&
    !(form1.value[index] as HTMLFormElement).checkValidity()
  ) {
    (form1.value[index] as HTMLFormElement).reportValidity();
    return;
  } else if (
    form2.value &&
    form2.value[index] &&
    !(form2.value[index] as HTMLFormElement).checkValidity()
  ) {
    (form2.value[index] as HTMLFormElement).reportValidity();
    return;
  } else if (
    form3.value &&
    form3.value[index] &&
    !(form3.value[index] as HTMLFormElement).checkValidity()
  ) {
    (form3.value[index] as HTMLFormElement).reportValidity();
    return;
  } else if (
    form4.value &&
    form4.value[index] &&
    !(form4.value[index] as HTMLFormElement).checkValidity()
  ) {
    (form4.value[index] as HTMLFormElement).reportValidity();
    return;
  }

  if (!cupTournament.value.matches.level1IsCompleted) {
    updateASixteen(index);
  } else if (!cupTournament.value.matches.level2IsCompleted) {
    updateQuarterFinal(index);
  } else if (!cupTournament.value.matches.level3IsCompleted) {
    updateSemiFinal(index);
  } else {
    updateFinal(index);
  }
  if (typeof id === "string") {
    updateCup(id);
  }
}

function restoreMatch(index: number): void {
  if (!cupTournament.value.matches.level1IsCompleted) {
    cupTournament.value.matches.level1[index].is_played = false;
  } else if (!cupTournament.value.matches.level2IsCompleted) {
    cupTournament.value.matches.level2[index].is_played = false;
  } else if (!cupTournament.value.matches.level3IsCompleted) {
    cupTournament.value.matches.level3[index].is_played = false;
  } else {
    cupTournament.value.matches.level4[index].is_played = false;
  }
}

async function updateCup(id: string): Promise<void> {
  await updateDoc(doc(cupsCollectionRef, id), {
    is_completed: cupTournament.value.is_completed,
    matches: cupTournament.value.matches,
  });
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

function getCupTournament(id: string): void {
  onSnapshot(doc(db, "cup", id), (doc) => {
    cupTournament.value = {
      name: doc.data()?.name,
      date: timestampToDate(doc.data()?.date?.seconds),
      id: doc.id,
      user: users.value.find((user: User) => user.id === doc.data()?.user_uuid),
      matches: doc.data()?.matches,
      players: doc.data()?.players,
      is_completed: doc.data()?.is_completed,
    };
  });
}

onMounted(async () => {
  id = route.params.id;
  getUsers();
  if (typeof id === "string") {
    getCupTournament(id);
  }
});
</script>

<style lang="scss"></style>
