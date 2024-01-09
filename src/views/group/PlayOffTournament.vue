<template>
  <div class="tournament-bracket my-5" v-if="tournament.matches">
    <h5 class="fw-bold mb-4">Drabinka</h5>
    <div class="heading row fw-bold my-3">
      <div
        v-if="tournament.level1 && tournament.level1.length === 4"
        class="col-4"
        :class="numberOfLevels"
      >
        ćwierćfinał
      </div>
      <div class="col-4" :class="numberOfLevels">półfinał</div>
      <div class="col-4" :class="numberOfLevels">finał</div>
    </div>
    <div class="row my-3">
      <!-- quarter-final competition -->
      <div
        class="quarter-final col-3 d-flex flex-column justify-content-around"
        v-if="tournament.level1 && tournament.level1.length === 4"
        :class="numberOfLevels"
      >
        <form
          class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
          v-for="(match, index) in playOffTournament.matches.level1"
          :key="index"
        >
          <PlayOffCupCompetition
            :index="index"
            :match="match"
            :is-completed="playOffTournament.matches.level1IsCompleted"
            :level="'quarterFinal'"
            @restore-match="restoreMatch"
            @update-match="updateMatch(index, 'quarterFinal')"
            v-model:result-a="match.player_a_score"
            v-model:result-b="match.player_b_score"
            :player-a-result-is-valid="
              validationStateObject?.level1[index].playerAResultIsValid
            "
            :player-b-result-is-valid="
              validationStateObject?.level1[index].playerBResultIsValid
            "
            @clear-player-a-result-validation="
              clearPlayerAResultValidation(index, 'quarterFinal')
            "
            @clear-player-b-result-validation="
              clearPlayerBResultValidation(index, 'quarterFinal')
            "
          ></PlayOffCupCompetition>
          <div
            v-if="
              !validationStateObject.level1[index].playerAResultIsValid ||
              !validationStateObject.level1[index].playerBResultIsValid
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
        v-if="tournament.level2"
        :class="numberOfLevels"
      >
        <form
          class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
          v-for="(match, index) in playOffTournament.matches.level2"
          :key="index"
        >
          <PlayOffCupCompetition
            :index="index"
            :match="match"
            :is-completed="playOffTournament.matches.level2IsCompleted"
            :level="'semiFinal'"
            @restore-match="restoreMatch"
            @update-match="updateMatch(index, 'semiFinal')"
            v-model:result-a="match.player_a_score"
            v-model:result-b="match.player_b_score"
            :player-a-result-is-valid="
              validationStateObject?.level2[index].playerAResultIsValid
            "
            :player-b-result-is-valid="
              validationStateObject?.level2[index].playerBResultIsValid
            "
            @clear-player-a-result-validation="
              clearPlayerAResultValidation(index, 'semiFinal')
            "
            @clear-player-b-result-validation="
              clearPlayerBResultValidation(index, 'semiFinal')
            "
          ></PlayOffCupCompetition>
          <div
            v-if="
              !validationStateObject.level2[index].playerAResultIsValid ||
              !validationStateObject.level2[index].playerBResultIsValid
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
        v-if="tournament.level3"
        :class="numberOfLevels"
      >
        <form
          class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
          v-for="(match, index) in playOffTournament.matches.level3"
          :key="index"
        >
          <PlayOffCupCompetition
            :index="index"
            :match="match"
            :is-completed="playOffTournament.isCompleted"
            :level="'final'"
            @restore-match="restoreMatch"
            @update-match="updateMatch(index, 'final')"
            v-model:result-a="match.player_a_score"
            v-model:result-b="match.player_b_score"
            :player-a-result-is-valid="
              validationStateObject?.level3[index].playerAResultIsValid
            "
            :player-b-result-is-valid="
              validationStateObject?.level3[index].playerBResultIsValid
            "
            @clear-player-a-result-validation="
              clearPlayerAResultValidation(index, 'final')
            "
            @clear-player-b-result-validation="
              clearPlayerBResultValidation(index, 'final')
            "
          ></PlayOffCupCompetition>
          <div
            v-if="
              !validationStateObject.level3[index].playerAResultIsValid ||
              !validationStateObject.level3[index].playerBResultIsValid
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
</template>

<script setup lang="ts">
import PlayOffCupCompetition from "@/views/group/PlayOffCupCompetition.vue";
import timestampToDate from "@/functions/timestampToDate";
import { useRoute } from "vue-router";
import { doc, onSnapshot, collection, updateDoc } from "firebase/firestore";
import { ref, onMounted, computed } from "vue";
import db from "@/firebase/firebaseInit";
import ValidationState from "@/types/ValidationState";
import Match from "@/types/Match";
import PlayOffTournament from "@/types/group/PlayOffTournament";

const numberOfLevels = computed(() => ({
  "col-4": playOffTournament.value?.players?.length === 8,
  "col-6": playOffTournament.value?.players?.length === 4,
}));

const tournament = computed(() => ({
  matches: playOffTournament.value?.matches,
  level1: playOffTournament.value.matches?.level1,
  level2: playOffTournament.value.matches?.level2,
  level3: playOffTournament.value.matches?.level3,
}));

const groupCollectionRef = collection(db, "group-play-off");
let id: string | string[] = "";
const route = useRoute();
let playOffTournament = ref({} as PlayOffTournament);

let quarterFinalsEndPosibility = false;
let semiFinalsEndPosibility = false;
let endPosibility = false;

let resultIsValid = ref(true);
let validationStateObject = ref({
  level1: [] as ValidationState[],
  level2: [] as ValidationState[],
  level3: [] as ValidationState[],
});

function createValidationState() {
  let level1ValidationState = [] as ValidationState[];
  let level2ValidationState = [] as ValidationState[];
  let level3ValidationState = [] as ValidationState[];

  if (playOffTournament.value.matches.level1.length !== 0) {
    playOffTournament.value.matches.level1.forEach(() => {
      let matchResultIsValid = {
        playerAResultIsValid: true,
        playerBResultIsValid: true,
      };
      level1ValidationState.push(matchResultIsValid);
    });
    validationStateObject.value.level1 = level1ValidationState;
  }
  if (playOffTournament.value.matches.level2.length !== 0) {
    playOffTournament.value.matches.level2.forEach(() => {
      let matchResultIsValid = {
        playerAResultIsValid: true,
        playerBResultIsValid: true,
      };
      level2ValidationState.push(matchResultIsValid);
    });
    validationStateObject.value.level2 = level2ValidationState;
  }
  if (playOffTournament.value.matches.level3.length !== 0) {
    playOffTournament.value.matches.level3.forEach(() => {
      let matchResultIsValid = {
        playerAResultIsValid: true,
        playerBResultIsValid: true,
      };
      level3ValidationState.push(matchResultIsValid);
    });
    validationStateObject.value.level3 = level3ValidationState;
  }
}

function matchResultsValidation(index: number, level: string): void {
  resultIsValid.value = true;
  // quarterFinal validation
  if (
    level === "quarterFinal" &&
    (!Number.isInteger(
      playOffTournament.value.matches.level1[index].player_a_score
    ) ||
      playOffTournament.value.matches.level1[index].player_a_score ===
        playOffTournament.value.matches.level1[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level1[index].playerAResultIsValid = false;
  }
  if (
    level === "quarterFinal" &&
    (!Number.isInteger(
      playOffTournament.value.matches.level1[index].player_b_score
    ) ||
      playOffTournament.value.matches.level1[index].player_a_score ===
        playOffTournament.value.matches.level1[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level1[index].playerBResultIsValid = false;
  }
  // semiFinal validation
  if (
    level === "semiFinal" &&
    (!Number.isInteger(
      playOffTournament.value.matches.level2[index].player_a_score
    ) ||
      playOffTournament.value.matches.level2[index].player_a_score ===
        playOffTournament.value.matches.level2[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level2[index].playerAResultIsValid = false;
  }
  if (
    level === "semiFinal" &&
    (!Number.isInteger(
      playOffTournament.value.matches.level2[index].player_b_score
    ) ||
      playOffTournament.value.matches.level2[index].player_a_score ===
        playOffTournament.value.matches.level2[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level2[index].playerBResultIsValid = false;
  }
  // final validation
  if (
    level === "final" &&
    (!Number.isInteger(
      playOffTournament.value.matches.level3[index].player_a_score
    ) ||
      playOffTournament.value.matches.level3[index].player_a_score ===
        playOffTournament.value.matches.level3[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level3[index].playerAResultIsValid = false;
  }
  if (
    level === "final" &&
    (!Number.isInteger(
      playOffTournament.value.matches.level3[index].player_b_score
    ) ||
      playOffTournament.value.matches.level3[index].player_a_score ===
        playOffTournament.value.matches.level3[index].player_b_score)
  ) {
    resultIsValid.value = false;
    validationStateObject.value.level3[index].playerBResultIsValid = false;
  }
}

function clearPlayerAResultValidation(index: number, level: string): void {
  if (level === "quarterFinal") {
    validationStateObject.value.level1[index].playerAResultIsValid = true;
  }
  if (level === "semiFinal") {
    validationStateObject.value.level2[index].playerAResultIsValid = true;
  }
  if (level === "final") {
    validationStateObject.value.level3[index].playerAResultIsValid = true;
  }
}
function clearPlayerBResultValidation(index: number, level: string): void {
  if (level === "quarterFinal") {
    validationStateObject.value.level1[index].playerBResultIsValid = true;
  }
  if (level === "semiFinal") {
    validationStateObject.value.level2[index].playerBResultIsValid = true;
  }
  if (level === "final") {
    validationStateObject.value.level3[index].playerBResultIsValid = true;
  }
}

function finishQuarterFinals() {
  playOffTournament.value.matches.level1IsCompleted = true;

  let quarterFinalsWinners: string[] = [];
  let level2Matches: Match[] = [];

  playOffTournament.value.matches.level1.forEach((match: Match) => {
    if (match.player_a_score > match.player_b_score) {
      quarterFinalsWinners.push(match.player_a);
    } else if (match.player_a_score < match.player_b_score) {
      quarterFinalsWinners.push(match.player_b);
    }
  });

  for (let i = 0; i < playOffTournament.value.matches.level1.length; i += 2) {
    let match: Match = {
      player_a: quarterFinalsWinners[i],
      player_b: quarterFinalsWinners[i + 1],
      player_a_score: NaN,
      player_b_score: NaN,
      is_played: false,
    };
    level2Matches.push(match);
  }
  playOffTournament.value.matches.level2 = level2Matches;
  createValidationState();

  if (typeof id === "string") {
    updateTournament(id);
  }
  quarterFinalsEndPosibility = false;
}
function finishSemiFinals() {
  playOffTournament.value.matches.level2IsCompleted = true;

  let semiFinalsWinners: string[] = [];
  let level3Matches: Match[] = [];

  playOffTournament.value.matches.level2.forEach((match: Match) => {
    if (match.player_a_score > match.player_b_score) {
      semiFinalsWinners.push(match.player_a);
    } else if (match.player_a_score < match.player_b_score) {
      semiFinalsWinners.push(match.player_b);
    }
  });

  for (let i = 0; i < playOffTournament.value.matches.level2.length; i += 2) {
    let match: Match = {
      player_a: semiFinalsWinners[i],
      player_b: semiFinalsWinners[i + 1],
      player_a_score: NaN,
      player_b_score: NaN,
      is_played: false,
    };
    level3Matches.push(match);
  }
  playOffTournament.value.matches.level3 = level3Matches;
  createValidationState();

  if (typeof id === "string") {
    updateTournament(id);
  }
  semiFinalsEndPosibility = false;
}

function endTournament(): void {
  playOffTournament.value.isCompleted = true;
  if (typeof id === "string") {
    updateTournament(id);
  }
  endPosibility = false;
  window.scrollTo(0, 0);
}

function updateMatch(index: number, level: string): void {
  matchResultsValidation(index, level);
  if (!resultIsValid.value) {
    return;
  }
  if (level === "quarterFinal") {
    playOffTournament.value.matches.level1[index].is_played = true;
    quarterFinalsEndPosibility = playOffTournament.value.matches.level1.every(
      (match: Match) => match.is_played === true
    );
  }
  if (level === "semiFinal") {
    playOffTournament.value.matches.level2[index].is_played = true;
    semiFinalsEndPosibility = playOffTournament.value.matches.level2.every(
      (match: Match) => match.is_played === true
    );
  }
  if (level === "final") {
    playOffTournament.value.matches.level3[index].is_played = true;
    endPosibility = playOffTournament.value.matches.level3.every(
      (match: Match) => match.is_played === true
    );
  }

  if (typeof id === "string") {
    updateTournament(id);
  }
}

function restoreMatch(index: number): void {
  if (!playOffTournament.value.matches.level1IsCompleted) {
    playOffTournament.value.matches.level1[index].is_played = false;
  } else if (!playOffTournament.value.matches.level2IsCompleted) {
    playOffTournament.value.matches.level2[index].is_played = false;
  } else !playOffTournament.value.isCompleted;
  playOffTournament.value.matches.level3[index].is_played = false;
}

async function updateTournament(id: string): Promise<void> {
  await updateDoc(doc(groupCollectionRef, id), {
    is_completed: playOffTournament.value.isCompleted,
    play_off_matches: playOffTournament.value.matches,
  });
}

function getPlayOffTournament(id: string): void {
  onSnapshot(doc(db, "group-play-off", id), (doc) => {
    playOffTournament.value = {
      date: timestampToDate(doc.data()?.date?.seconds),
      id: doc.id,
      matches: doc.data()?.play_off_matches,
      isCompleted: doc.data()?.is_completed,
      players: doc.data()?.play_off_players,
    };
    createValidationState();
  });
}

onMounted(async () => {
  id = route.params.id;
  if (typeof id === "string") {
    getPlayOffTournament(id);
  }
});
</script>

<style lang="scss"></style>
