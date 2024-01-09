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
          Status: {{ cupTournament.isCompleted ? "Zakończony" : "Aktywny" }}
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
          :class="numberOfLevels"
        >
          1/16
        </div>
        <div
          v-if="
            cupTournament.matches.level2.length === 4 ||
            cupTournament.matches.level1.length === 8
          "
          class="col-3"
          :class="numberOfLevels"
        >
          ćwierćfinał
        </div>
        <div class="col-3" :class="numberOfLevels">półfinał</div>
        <div class="col-3" :class="numberOfLevels">finał</div>
      </div>

      <div class="row my-3">
        <!-- a-sixteen competition -->
        <div
          class="a-sixteen col-3"
          v-if="cupTournament.matches.level1.length === 8"
          :class="numberOfLevels"
        >
          <form
            class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
            v-for="(match, index) in cupTournament.matches.level1"
            :key="index"
          >
            <CupCompetition
              :index="index"
              :match="match"
              :is-completed="cupTournament.matches.level1IsCompleted"
              :level="'aSixteen'"
              :player-a-result-is-valid="
                validationStateObject.level1[index]?.playerAResultIsValid
              "
              :player-b-result-is-valid="
                validationStateObject.level1[index]?.playerBResultIsValid
              "
              @restore-match="restoreMatch"
              @update-match="updateMatch(index, 'aSixteen')"
              @clear-player-a-result-validation="
                clearPlayerAResultValidation(index, 'aSixteen')
              "
              @clear-player-b-result-validation="
                clearPlayerBResultValidation(index, 'aSixteen')
              "
              v-model:result-a="match.player_a_score"
              v-model:result-b="match.player_b_score"
            ></CupCompetition>
            <div
              v-if="
                !validationStateObject.level1[index]?.playerAResultIsValid ||
                !validationStateObject.level1[index]?.playerBResultIsValid
              "
              class="error-message col-12 my-1"
            >
              <span class="text-danger">
                Wprowadzono niepoprawny wynik, remis lub brak wyniku
              </span>
            </div>
          </form>
        </div>
        <!-- quarter-final competition -->
        <div
          class="quarter-final col-3 d-flex flex-column justify-content-around"
          v-if="
            cupTournament.matches.level2.length === 4 ||
            cupTournament.matches.level1.length === 8
          "
          :class="numberOfLevels"
        >
          <form
            class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
            v-for="(match, index) in cupTournament.matches.level2"
            :key="index"
          >
            <CupCompetition
              :index="index"
              :match="match"
              :is-completed="cupTournament.matches.level2IsCompleted"
              :level="'quarterFinal'"
              :player-a-result-is-valid="
                validationStateObject.level2[index]?.playerAResultIsValid
              "
              :player-b-result-is-valid="
                validationStateObject.level2[index]?.playerBResultIsValid
              "
              @restore-match="restoreMatch"
              @update-match="updateMatch(index, 'quarterFinal')"
              @clear-player-a-result-validation="
                clearPlayerAResultValidation(index, 'quarterFinal')
              "
              @clear-player-b-result-validation="
                clearPlayerBResultValidation(index, 'quarterFinal')
              "
              v-model:result-a="match.player_a_score"
              v-model:result-b="match.player_b_score"
            ></CupCompetition>
            <div
              v-if="
                !validationStateObject.level2[index]?.playerAResultIsValid ||
                !validationStateObject.level2[index]?.playerBResultIsValid
              "
              class="error-message col-12 my-1"
            >
              <span class="text-danger">
                Wprowadzono niepoprawny wynik, remis lub brak wyniku
              </span>
            </div>
          </form>
        </div>
        <!-- semi-final competition -->
        <div
          class="semi-final col-3 d-flex flex-column justify-content-around"
          :class="numberOfLevels"
        >
          <form
            class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
            v-for="(match, index) in cupTournament.matches.level3"
            :key="index"
          >
            <CupCompetition
              :index="index"
              :match="match"
              :is-completed="cupTournament.matches.level3IsCompleted"
              :level="'semiFinal'"
              :player-a-result-is-valid="
                validationStateObject.level3[index]?.playerAResultIsValid
              "
              :player-b-result-is-valid="
                validationStateObject.level3[index]?.playerBResultIsValid
              "
              @restore-match="restoreMatch"
              @update-match="updateMatch(index, 'semiFinal')"
              @clear-player-a-result-validation="
                clearPlayerAResultValidation(index, 'semiFinal')
              "
              @clear-player-b-result-validation="
                clearPlayerBResultValidation(index, 'semiFinal')
              "
              v-model:result-a="match.player_a_score"
              v-model:result-b="match.player_b_score"
            ></CupCompetition>
            <div
              v-if="
                !validationStateObject.level3[index]?.playerAResultIsValid ||
                !validationStateObject.level3[index]?.playerBResultIsValid
              "
              class="error-message col-12 my-1"
            >
              <span class="text-danger">
                Wprowadzono niepoprawny wynik, remis lub brak wyniku
              </span>
            </div>
          </form>
        </div>
        <!-- final competition -->
        <div
          class="final col-3 d-flex flex-column justify-content-center"
          :class="numberOfLevels"
        >
          <form
            class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
            v-for="(match, index) in cupTournament.matches.level4"
            :key="index"
          >
            <CupCompetition
              :index="index"
              :match="match"
              :is-completed="cupTournament.isCompleted"
              :level="'final'"
              :player-a-result-is-valid="
                validationStateObject.level4[index]?.playerAResultIsValid
              "
              :player-b-result-is-valid="
                validationStateObject.level4[index]?.playerBResultIsValid
              "
              @restore-match="restoreMatch"
              @update-match="updateMatch(index, 'final')"
              @clear-player-a-result-validation="
                clearPlayerAResultValidation(index, 'final')
              "
              @clear-player-b-result-validation="
                clearPlayerBResultValidation(index, 'final')
              "
              v-model:result-a="match.player_a_score"
              v-model:result-b="match.player_b_score"
            ></CupCompetition>
            <div
              v-if="
                !validationStateObject.level4[index]?.playerAResultIsValid ||
                !validationStateObject.level4[index]?.playerBResultIsValid
              "
              class="error-message col-12 my-1"
            >
              <span class="text-danger">
                Wprowadzono niepoprawny wynik, remis lub brak wyniku
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="end-button">
      <button
        v-if="aSixteenEndPosibility"
        class="btn btn-secondary btn-lg"
        @click="finishASixteen"
      >
        Przejdź do ćwierćfinałów
      </button>
      <button
        v-if="quarterFinalsEndPosibility"
        class="btn btn-secondary btn-lg"
        @click="finishQuarterFinals"
      >
        Przejdź do półfinałów
      </button>
      <button
        v-if="semiFinalsEndPosibility"
        class="btn btn-secondary btn-lg"
        @click="finishSemiFinals"
      >
        Przejdź do finału
      </button>
      <button
        v-if="endPosibility"
        class="btn btn-secondary btn-lg"
        @click="endTournament"
      >
        Zakończ turniej
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import CupCompetition from "./CupCompetition.vue";
import CupTournament from "@/types/cup/CupTournament";
import Match from "@/types/Match";
import User from "@/types/User";
import timestampToDate from "@/functions/timestampToDate";
import ValidationState from "@/types/ValidationState";

import { useRoute } from "vue-router";
import { doc, onSnapshot, collection, updateDoc } from "firebase/firestore";
import { Ref, ref, onMounted, computed } from "vue";
import db from "@/firebase/firebaseInit";

const numberOfLevels = computed(() => ({
  "col-3": cupTournament.value.players.length === 16,
  "col-4": cupTournament.value.players.length === 8,
  "col-6": cupTournament.value.players.length === 4,
}));

const cupsCollectionRef = collection(db, "cup");
const usersCollectionRef = collection(db, "users");

let id: string | string[] = "";

const route = useRoute();
let cupTournament = ref({} as CupTournament);
let users: Ref<User[]> = ref([]);

let aSixteenEndPosibility = false;
let quarterFinalsEndPosibility = false;
let semiFinalsEndPosibility = false;
let endPosibility = false;

let resultIsValid = ref(true);
let validationStateObject = ref({
  level1: [] as ValidationState[],
  level2: [] as ValidationState[],
  level3: [] as ValidationState[],
  level4: [] as ValidationState[],
});

function createValidationState() {
  let level1ValidationState = [] as ValidationState[];
  let level2ValidationState = [] as ValidationState[];
  let level3ValidationState = [] as ValidationState[];
  let level4ValidationState = [] as ValidationState[];
  if (cupTournament.value.matches.level1.length !== 0) {
    cupTournament.value.matches.level1.forEach(() => {
      let matchResultIsValid = {
        playerAResultIsValid: true,
        playerBResultIsValid: true,
      };
      level1ValidationState.push(matchResultIsValid);
    });
    validationStateObject.value.level1 = level1ValidationState;
  }
  if (cupTournament.value.matches.level2.length !== 0) {
    cupTournament.value.matches.level2.forEach(() => {
      let matchResultIsValid = {
        playerAResultIsValid: true,
        playerBResultIsValid: true,
      };
      level2ValidationState.push(matchResultIsValid);
    });
    validationStateObject.value.level2 = level2ValidationState;
  }
  if (cupTournament.value.matches.level3.length !== 0) {
    cupTournament.value.matches.level3.forEach(() => {
      let matchResultIsValid = {
        playerAResultIsValid: true,
        playerBResultIsValid: true,
      };
      level3ValidationState.push(matchResultIsValid);
    });
    validationStateObject.value.level3 = level3ValidationState;
  }
  if (cupTournament.value.matches.level4.length !== 0) {
    cupTournament.value.matches.level4.forEach(() => {
      let matchResultIsValid = {
        playerAResultIsValid: true,
        playerBResultIsValid: true,
      };
      level4ValidationState.push(matchResultIsValid);
    });
    validationStateObject.value.level4 = level4ValidationState;
  }
}

function matchResultsValidation(index: number, level: string): void {
  resultIsValid.value = true;
  // aSixteen validation
  if (
    level === "aSixteen" &&
    (!Number.isInteger(
      cupTournament.value.matches.level1[index].player_a_score
    ) ||
      cupTournament.value.matches.level1[index].player_a_score ===
        cupTournament.value.matches.level1[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level1[index].playerAResultIsValid = false;
  }
  if (
    level === "aSixteen" &&
    (!Number.isInteger(
      cupTournament.value.matches.level1[index].player_b_score
    ) ||
      cupTournament.value.matches.level1[index].player_a_score ===
        cupTournament.value.matches.level1[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level1[index].playerBResultIsValid = false;
  }
  // quarterFinal validation
  if (
    level === "quarterFinal" &&
    (!Number.isInteger(
      cupTournament.value.matches.level2[index].player_a_score
    ) ||
      cupTournament.value.matches.level2[index].player_a_score ===
        cupTournament.value.matches.level2[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level2[index].playerAResultIsValid = false;
  }
  if (
    level === "quarterFinal" &&
    (!Number.isInteger(
      cupTournament.value.matches.level2[index].player_b_score
    ) ||
      cupTournament.value.matches.level2[index].player_a_score ===
        cupTournament.value.matches.level2[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level2[index].playerBResultIsValid = false;
  }
  // semiFinal validation
  if (
    level === "semiFinal" &&
    (!Number.isInteger(
      cupTournament.value.matches.level3[index].player_a_score
    ) ||
      cupTournament.value.matches.level3[index].player_a_score ===
        cupTournament.value.matches.level3[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level3[index].playerAResultIsValid = false;
  }
  if (
    level === "semiFinal" &&
    (!Number.isInteger(
      cupTournament.value.matches.level3[index].player_b_score
    ) ||
      cupTournament.value.matches.level3[index].player_a_score ===
        cupTournament.value.matches.level3[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level3[index].playerBResultIsValid = false;
  }
  // final validation
  if (
    level === "final" &&
    (!Number.isInteger(
      cupTournament.value.matches.level4[index].player_a_score
    ) ||
      cupTournament.value.matches.level4[index].player_a_score ===
        cupTournament.value.matches.level4[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level4[index].playerAResultIsValid = false;
  }
  if (
    level === "final" &&
    (!Number.isInteger(
      cupTournament.value.matches.level4[index].player_b_score
    ) ||
      cupTournament.value.matches.level4[index].player_a_score ===
        cupTournament.value.matches.level4[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level4[index].playerBResultIsValid = false;
  }
}

function clearPlayerAResultValidation(index: number, level: string): void {
  if (level === "aSixteen") {
    validationStateObject.value.level1[index].playerAResultIsValid = true;
  }
  if (level === "quarterFinal") {
    validationStateObject.value.level2[index].playerAResultIsValid = true;
  }
  if (level === "semiFinal") {
    validationStateObject.value.level3[index].playerAResultIsValid = true;
  }
  if (level === "final") {
    validationStateObject.value.level4[index].playerAResultIsValid = true;
  }
}
function clearPlayerBResultValidation(index: number, level: string): void {
  if (level === "aSixteen") {
    validationStateObject.value.level1[index].playerBResultIsValid = true;
  }
  if (level === "quarterFinal") {
    validationStateObject.value.level2[index].playerBResultIsValid = true;
  }
  if (level === "semiFinal") {
    validationStateObject.value.level3[index].playerBResultIsValid = true;
  }
  if (level === "final") {
    validationStateObject.value.level4[index].playerBResultIsValid = true;
  }
}

function finishASixteen() {
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

  createValidationState();

  if (typeof id === "string") {
    updateCup(id);
  }
  aSixteenEndPosibility = false;
}
function finishQuarterFinals() {
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
  createValidationState();

  if (typeof id === "string") {
    updateCup(id);
  }
  quarterFinalsEndPosibility = false;
}
function finishSemiFinals() {
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
  createValidationState();

  if (typeof id === "string") {
    updateCup(id);
  }
  semiFinalsEndPosibility = false;
}
function endTournament(): void {
  cupTournament.value.isCompleted = true;
  if (typeof id === "string") {
    updateCup(id);
  }
  endPosibility = false;
}

function updateMatch(index: number, level: string): void {
  matchResultsValidation(index, level);
  if (!resultIsValid.value) {
    return;
  }
  if (level === "aSixteen") {
    cupTournament.value.matches.level1[index].is_played = true;
    aSixteenEndPosibility = cupTournament.value.matches.level1.every(
      (match: Match) => match.is_played === true
    );
  }
  if (level === "quarterFinal") {
    cupTournament.value.matches.level2[index].is_played = true;
    quarterFinalsEndPosibility = cupTournament.value.matches.level2.every(
      (match: Match) => match.is_played === true
    );
  }
  if (level === "semiFinal") {
    cupTournament.value.matches.level3[index].is_played = true;
    semiFinalsEndPosibility = cupTournament.value.matches.level3.every(
      (match: Match) => match.is_played === true
    );
  }
  if (level === "final") {
    cupTournament.value.matches.level4[index].is_played = true;
    endPosibility = cupTournament.value.matches.level4.every(
      (match: Match) => match.is_played === true
    );
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
    is_completed: cupTournament.value.isCompleted,
    matches: cupTournament.value.matches,
  });
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
      isCompleted: doc.data()?.is_completed,
    };
    createValidationState();
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
