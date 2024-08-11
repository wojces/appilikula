<template>
  <div
    v-if="Object.keys(groupTournament) && Object.keys(groupTournament).length"
    class="container p-5 border">
    <div class="title">
      <div class="d-flex flex-row gap-3 description">
        <p>Data utworzenia: {{ groupTournament.date }}</p>
        <p>Utworzył: {{ groupTournament.user?.name }}</p>
        <p>
          Status:
          {{ groupTournament.isCompleted ? "Zakończony" : "Aktywny" }}
        </p>
      </div>
      <h1>Turniej: {{ groupTournament.name }}</h1>
      <div class="switch-stage-buttons btn-group">
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="{ active: groupStageIsActive }"
          @click="switchTournamentStage('group')">
          Faza grupowa
        </button>
        <button
          type="button"
          class="btn btn-outline-secondary"
          :class="{
            active: !groupStageIsActive,
            disabled: !groupTournament.groupStageIsCompleted,
          }"
          @click="switchTournamentStage('playoff')">
          Faza pucharowa
        </button>
      </div>
    </div>
    <div v-if="groupStageIsActive" class="group-stage">
      <div class="firstTablesRow row my-5">
        <div class="group1 col-6">
          <h5 class="fw-bold mb-4">Tabela - Grupa 1</h5>
          <table class="table table-league">
            <thead>
              <GroupTableHead></GroupTableHead>
            </thead>
            <tbody
              :class="tableColors(index)"
              v-for="(player, index) in group1TournamentPlayersScore"
              :key="index">
              <GroupTableBody
                :index="index"
                :player="player"
                @table-colors="tableColors(index)"></GroupTableBody>
            </tbody>
          </table>
        </div>
        <div class="group2 col-6">
          <h5 class="fw-bold mb-4">Tabela - Grupa 2</h5>
          <table class="table table-league">
            <thead>
              <GroupTableHead></GroupTableHead>
            </thead>
            <tbody
              :class="tableColors(index)"
              v-for="(player, index) in group2TournamentPlayersScore"
              :key="index">
              <GroupTableBody
                :index="index"
                :player="player"
                @table-colors="tableColors(index)"></GroupTableBody>
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="secondTablesRow row my-5"
        v-if="groupTournament.groupPlayers.group3.length !== 0">
        <div class="group3 col-6">
          <h5 class="fw-bold mb-4">Tabela - Grupa 3</h5>
          <table class="table table-league">
            <thead>
              <GroupTableHead></GroupTableHead>
            </thead>
            <tbody
              :class="tableColors(index)"
              v-for="(player, index) in group3TournamentPlayersScore"
              :key="index">
              <GroupTableBody
                :index="index"
                :player="player"
                @table-colors="tableColors(index)"></GroupTableBody>
            </tbody>
          </table>
        </div>
        <div class="group4 col-6">
          <h5 class="fw-bold mb-4">Tabela - Grupa 4</h5>
          <table class="table table-league">
            <thead>
              <GroupTableHead></GroupTableHead>
            </thead>
            <tbody
              :class="tableColors(index)"
              v-for="(player, index) in group4TournamentPlayersScore"
              :key="index">
              <GroupTableBody
                :index="index"
                :player="player"
                @table-colors="tableColors(index)"></GroupTableBody>
            </tbody>
          </table>
        </div>
      </div>
      <div class="firstMatchesRow row my-5">
        <div class="group1 col-6">
          <h5 class="fw-bold mb-4">Mecze - Grupa 1</h5>
          <GroupMatchesHead></GroupMatchesHead>
          <form
            class="row my-1"
            v-for="(match, index) in groupTournament.groupMatches.group1"
            :key="index">
            <GroupMatchesBody
              :index="index"
              :match="match"
              :is-completed="groupTournament.groupStageIsCompleted"
              :group="'group1'"
              @restore-match="restoreMatch(index, 'group1')"
              @update-match="updateGroupMatch(index, 'group1')"
              v-model:result-a="match.player_a_score"
              v-model:result-b="match.player_b_score"
              :player-a-result-is-valid="
                validationStateObject?.group1[index].playerAResultIsValid
              "
              :player-b-result-is-valid="
                validationStateObject?.group1[index].playerBResultIsValid
              "
              @clear-player-a-result-validation="
                clearPlayerAResultValidation(index, 'group1')
              "
              @clear-player-b-result-validation="
                clearPlayerBResultValidation(index, 'group1')
              "></GroupMatchesBody>
            <div
              v-if="
                !validationStateObject.group1[index].playerAResultIsValid ||
                !validationStateObject.group1[index].playerBResultIsValid
              "
              class="error-message col-12 my-1">
              <span class="text-danger">
                Wprowadzono niepoprawny wynik lub brak wyniku
              </span>
            </div>
          </form>
        </div>
        <div class="group2 col-6">
          <h5 class="fw-bold mb-4">Mecze - Grupa 2</h5>
          <GroupMatchesHead></GroupMatchesHead>
          <form
            class="row my-1"
            v-for="(match, index) in groupTournament.groupMatches.group2"
            :key="index">
            <GroupMatchesBody
              :index="index"
              :match="match"
              :is-completed="groupTournament.groupStageIsCompleted"
              :group="'group2'"
              @restore-match="restoreMatch(index, 'group2')"
              @update-match="updateGroupMatch(index, 'group2')"
              v-model:result-a="match.player_a_score"
              v-model:result-b="match.player_b_score"
              :player-a-result-is-valid="
                validationStateObject?.group2[index].playerAResultIsValid
              "
              :player-b-result-is-valid="
                validationStateObject?.group2[index].playerBResultIsValid
              "
              @clear-player-a-result-validation="
                clearPlayerAResultValidation(index, 'group2')
              "
              @clear-player-b-result-validation="
                clearPlayerBResultValidation(index, 'group2')
              "></GroupMatchesBody>
            <div
              v-if="
                !validationStateObject.group2[index].playerAResultIsValid ||
                !validationStateObject.group2[index].playerBResultIsValid
              "
              class="error-message col-12 my-1">
              <span class="text-danger">
                Wprowadzono niepoprawny wynik lub brak wyniku
              </span>
            </div>
          </form>
        </div>
      </div>
      <div
        class="secondMatchesRow row my-5"
        v-if="groupTournament.groupPlayers.group3.length !== 0">
        <div class="group3 col-6">
          <h5 class="fw-bold mb-4">Mecze - Grupa 3</h5>
          <GroupMatchesHead></GroupMatchesHead>
          <form
            class="row my-1"
            v-for="(match, index) in groupTournament.groupMatches.group3"
            :key="index">
            <GroupMatchesBody
              :index="index"
              :match="match"
              :is-completed="groupTournament.groupStageIsCompleted"
              :group="'group3'"
              @restore-match="restoreMatch(index, 'group3')"
              @update-match="updateGroupMatch(index, 'group3')"
              v-model:result-a="match.player_a_score"
              v-model:result-b="match.player_b_score"
              :player-a-result-is-valid="
                validationStateObject?.group3[index].playerAResultIsValid
              "
              :player-b-result-is-valid="
                validationStateObject?.group3[index].playerBResultIsValid
              "
              @clear-player-a-result-validation="
                clearPlayerAResultValidation(index, 'group3')
              "
              @clear-player-b-result-validation="
                clearPlayerBResultValidation(index, 'group3')
              "></GroupMatchesBody>
            <div
              v-if="
                !validationStateObject.group3[index].playerAResultIsValid ||
                !validationStateObject.group3[index].playerBResultIsValid
              "
              class="error-message col-12 my-1">
              <span class="text-danger">
                Wprowadzono niepoprawny wynik lub brak wyniku
              </span>
            </div>
          </form>
        </div>
        <div class="group4 col-6">
          <h5 class="fw-bold mb-4">Mecze - Grupa 4</h5>
          <GroupMatchesHead></GroupMatchesHead>
          <form
            class="row my-1"
            v-for="(match, index) in groupTournament.groupMatches.group4"
            :key="index">
            <GroupMatchesBody
              :index="index"
              :match="match"
              :is-completed="groupTournament.groupStageIsCompleted"
              :group="'group4'"
              @restore-match="restoreMatch(index, 'group4')"
              @update-match="updateGroupMatch(index, 'group4')"
              v-model:result-a="match.player_a_score"
              v-model:result-b="match.player_b_score"
              :player-a-result-is-valid="
                validationStateObject?.group4[index].playerAResultIsValid
              "
              :player-b-result-is-valid="
                validationStateObject?.group4[index].playerBResultIsValid
              "
              @clear-player-a-result-validation="
                clearPlayerAResultValidation(index, 'group4')
              "
              @clear-player-b-result-validation="
                clearPlayerBResultValidation(index, 'group4')
              "></GroupMatchesBody>
            <div
              v-if="
                !validationStateObject.group4[index].playerAResultIsValid ||
                !validationStateObject.group4[index].playerBResultIsValid
              "
              class="error-message col-12 my-1">
              <span class="text-danger">
                Wprowadzono niepoprawny wynik lub brak wyniku
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div v-else class="play-off">
      <PlayOffTournament></PlayOffTournament>
    </div>

    <div class="end-button">
      <button
        v-if="tournamentEndIsPossible"
        class="btn btn-secondary btn-lg"
        @click="endTournament()">
        Zakończ turniej
      </button>
      <button
        v-if="groupStageEndIsPossible"
        class="btn btn-secondary btn-lg"
        @click="endGroupStage()">
        Zakończ fazę grupową i przejdź do pucharowej
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import GroupTableHead from "./GroupTableHead.vue";
import GroupTableBody from "./GroupTableBody.vue";
import GroupMatchesHead from "./GroupMatchesHead.vue";
import GroupMatchesBody from "./GroupMatchesBody.vue";
import PlayOffTournament from "./PlayOffTournament.vue";
import ValidationState from "@/types/ValidationState";
import PlayerScores from "@/types/PlayerScores";
import GroupTournament from "@/types/group/GroupTournament";
import User from "@/types/User";
import Match from "@/types/Match";
import timestampToDate from "@/functions/timestampToDate";
import updateGroupTable from "@/functions/group/updateGroupTable";
import shuffle from "@/functions/shuffle";

import { useRoute } from "vue-router";
import { doc, onSnapshot, collection, updateDoc } from "firebase/firestore";
import { Ref, ref, onMounted } from "vue";
import db from "@/firebase/firebaseInit";

const groupCollectionRef = collection(db, "group-play-off");
const usersCollectionRef = collection(db, "users");

let id: string | string[] = "";
const route = useRoute();
let groupTournament = ref({} as GroupTournament);
let users: Ref<User[]> = ref([]);

let resultIsValid = ref(true);
let validationStateObject = ref({
  group1: [] as ValidationState[],
  group2: [] as ValidationState[],
  group3: [] as ValidationState[],
  group4: [] as ValidationState[],
});

let groupStageIsActive = ref(true);

function switchTournamentStage(stage: string) {
  if (stage === "group") groupStageIsActive.value = true;
  if (stage === "playoff") groupStageIsActive.value = false;
}

function tableColors(index: number) {
  if (index === 0 || index === 1) return "table-primary";
}

const defaultGroupPlayer: PlayerScores = {
  name: "",
  matches: 0,
  wins: 0,
  draws: 0,
  lost: 0,
  scoredGoals: 0,
  lostGoals: 0,
  aggregateScore: 0,
  points: 0,
};

let group1TournamentPlayersScore = ref([] as PlayerScores[]);
let group2TournamentPlayersScore = ref([] as PlayerScores[]);
let group3TournamentPlayersScore = ref([] as PlayerScores[]);
let group4TournamentPlayersScore = ref([] as PlayerScores[]);
let tournamentEndIsPossible = false;
let groupStageEndIsPossible = false;

let groupStageWinners = ref([] as string[]);
let groupStageSecondPlaces = ref([] as string[]);

function findGroupStageWinners(): void {
  groupStageWinners.value.push(
    group1TournamentPlayersScore.value[0].name,
    group2TournamentPlayersScore.value[0].name
  );
  if (groupTournament.value.groupMatches.group3.length !== 0) {
    groupStageWinners.value.push(group3TournamentPlayersScore.value[0].name);
  }
  if (groupTournament.value.groupMatches.group4.length !== 0) {
    groupStageWinners.value.push(group4TournamentPlayersScore.value[0].name);
  }
}
function findGroupStageSecondPlaces(): void {
  groupStageSecondPlaces.value.push(
    group1TournamentPlayersScore.value[1].name,
    group2TournamentPlayersScore.value[1].name
  );
  if (groupTournament.value.groupMatches.group3.length !== 0) {
    groupStageSecondPlaces.value.push(
      group3TournamentPlayersScore.value[1].name
    );
  }
  if (groupTournament.value.groupMatches.group4.length !== 0) {
    groupStageSecondPlaces.value.push(
      group4TournamentPlayersScore.value[1].name
    );
  }
}

function addPlayOffMatches(): void {
  groupTournament.value.playOffPlayers = groupStageWinners.value.concat(
    groupStageSecondPlaces.value
  );
  shuffle(groupStageWinners.value);
  shuffle(groupStageSecondPlaces.value);

  let matchesArray: Match[] = [];

  for (let i = 0; i < groupStageWinners.value.length; i++) {
    let match: Match = {
      player_a: groupStageWinners.value[i],
      player_b: groupStageSecondPlaces.value[i],
      player_a_score: NaN,
      player_b_score: NaN,
      is_played: false,
    };
    matchesArray.push(match);
  }
  if (groupStageWinners.value.length === 4) {
    groupTournament.value.playOffMatches.level1 = matchesArray;
  } else if (groupStageWinners.value.length === 2) {
    groupTournament.value.playOffMatches.level2 = matchesArray;
    groupTournament.value.playOffMatches.level1IsCompleted = true;
  }
}

function createTable(): void {
  let playersScore = [] as PlayerScores[];

  // Group 1
  groupTournament.value.groupPlayers.group1.forEach((player: string) => {
    let groupPlayer = { ...defaultGroupPlayer };
    groupPlayer.name = player;
    playersScore.push(groupPlayer);
  });
  group1TournamentPlayersScore.value = playersScore;
  playersScore = [];

  // Group 2
  groupTournament.value.groupPlayers.group2.forEach((player: string) => {
    let groupPlayer = { ...defaultGroupPlayer };
    groupPlayer.name = player;
    playersScore.push(groupPlayer);
  });
  group2TournamentPlayersScore.value = playersScore;
  playersScore = [];

  // Group 3
  groupTournament.value.groupPlayers.group3.forEach((player: string) => {
    let groupPlayer = { ...defaultGroupPlayer };
    groupPlayer.name = player;
    playersScore.push(groupPlayer);
  });
  group3TournamentPlayersScore.value = playersScore;
  playersScore = [];

  // Group 4
  groupTournament.value.groupPlayers.group4.forEach((player: string) => {
    let groupPlayer = { ...defaultGroupPlayer };
    groupPlayer.name = player;
    playersScore.push(groupPlayer);
  });
  group4TournamentPlayersScore.value = playersScore;
  playersScore = [];
}

function updateTable(): void {
  updateGroupTable(
    groupTournament.value.groupMatches.group1,
    group1TournamentPlayersScore.value
  );
  updateGroupTable(
    groupTournament.value.groupMatches.group2,
    group2TournamentPlayersScore.value
  );
  if (groupTournament.value.groupPlayers.group3.length !== 0) {
    updateGroupTable(
      groupTournament.value.groupMatches.group3,
      group3TournamentPlayersScore.value
    );
  }
  if (groupTournament.value.groupPlayers.group4.length !== 0) {
    updateGroupTable(
      groupTournament.value.groupMatches.group4,
      group4TournamentPlayersScore.value
    );
  }
}

function updateGroupMatch(index: number, group: string): void {
  matchResultsValidation(index, group);
  if (!resultIsValid.value) {
    return;
  }
  if (group === "group1") {
    groupTournament.value.groupMatches.group1[index].is_played = true;
  }
  if (group === "group2") {
    groupTournament.value.groupMatches.group2[index].is_played = true;
  }
  if (group === "group3") {
    groupTournament.value.groupMatches.group3[index].is_played = true;
  }
  if (group === "group4") {
    groupTournament.value.groupMatches.group4[index].is_played = true;
  }

  const group1EndIsPossible = groupTournament.value.groupMatches.group1.every(
    (match: Match) => match.is_played === true
  );
  const group2EndIsPossible = groupTournament.value.groupMatches.group2.every(
    (match: Match) => match.is_played === true
  );
  const group3EndIsPossible = groupTournament.value.groupMatches.group3.every(
    (match: Match) => match.is_played === true
  );
  const group4EndIsPossible = groupTournament.value.groupMatches.group4.every(
    (match: Match) => match.is_played === true
  );

  if (
    group1EndIsPossible &&
    group2EndIsPossible &&
    group3EndIsPossible &&
    group4EndIsPossible
  ) {
    groupStageEndIsPossible = true;
  }

  if (typeof id === "string") {
    updateTournament(id);
  }
}

function restoreMatch(index: number, groupName: string): void {
  if (groupName === "group1") {
    groupTournament.value.groupMatches.group1[index].is_played = false;
  }
  if (groupName === "group2") {
    groupTournament.value.groupMatches.group2[index].is_played = false;
  }
  if (groupName === "group3") {
    groupTournament.value.groupMatches.group3[index].is_played = false;
  }
  if (groupName === "group4") {
    groupTournament.value.groupMatches.group4[index].is_played = false;
  }
}

async function updateTournament(id: string): Promise<void> {
  await updateDoc(doc(groupCollectionRef, id), {
    is_completed: groupTournament.value.isCompleted,
    group_stage_is_completed: groupTournament.value.groupStageIsCompleted,
    group_matches: groupTournament.value.groupMatches,
    play_off_matches: groupTournament.value.playOffMatches,
    play_off_players: groupTournament.value.playOffPlayers,
  });
}

function endTournament(): void {
  groupTournament.value.isCompleted = true;
  if (typeof id === "string") {
    updateTournament(id);
  }
  tournamentEndIsPossible = false;
  window.scrollTo(0, 0);
}
function endGroupStage(): void {
  groupTournament.value.groupStageIsCompleted = true;
  findGroupStageWinners();
  findGroupStageSecondPlaces();
  addPlayOffMatches();
  if (typeof id === "string") {
    updateTournament(id);
  }
  groupStageEndIsPossible = false;
  groupStageIsActive.value = false;
  window.scrollTo(0, 0);
}

function createValidationState(): void {
  let group1ValidationState = [] as ValidationState[];
  let group2ValidationState = [] as ValidationState[];
  let group3ValidationState = [] as ValidationState[];
  let group4ValidationState = [] as ValidationState[];

  groupTournament.value.groupMatches.group1.forEach(() => {
    let matchResultIsValid = {
      playerAResultIsValid: true,
      playerBResultIsValid: true,
    };
    group1ValidationState.push(matchResultIsValid);
  });
  validationStateObject.value.group1 = group1ValidationState;

  groupTournament.value.groupMatches.group2.forEach(() => {
    let matchResultIsValid = {
      playerAResultIsValid: true,
      playerBResultIsValid: true,
    };
    group2ValidationState.push(matchResultIsValid);
  });
  validationStateObject.value.group2 = group2ValidationState;

  if (groupTournament.value.groupMatches.group3.length !== 0) {
    groupTournament.value.groupMatches.group3.forEach(() => {
      let matchResultIsValid = {
        playerAResultIsValid: true,
        playerBResultIsValid: true,
      };
      group3ValidationState.push(matchResultIsValid);
    });
    validationStateObject.value.group3 = group3ValidationState;
  }
  if (groupTournament.value.groupMatches.group4.length !== 0) {
    groupTournament.value.groupMatches.group4.forEach(() => {
      let matchResultIsValid = {
        playerAResultIsValid: true,
        playerBResultIsValid: true,
      };
      group4ValidationState.push(matchResultIsValid);
    });
    validationStateObject.value.group4 = group4ValidationState;
  }
}

function matchResultsValidation(index: number, group: string): void {
  resultIsValid.value = true;
  // group1 validation
  if (
    group === "group1" &&
    !Number.isInteger(
      groupTournament.value.groupMatches.group1[index].player_a_score
    )
  ) {
    resultIsValid.value = false;
    validationStateObject.value.group1[index].playerAResultIsValid = false;
  }
  if (
    group === "group1" &&
    !Number.isInteger(
      groupTournament.value.groupMatches.group1[index].player_b_score
    )
  ) {
    resultIsValid.value = false;
    validationStateObject.value.group1[index].playerBResultIsValid = false;
  }
  // group2 validation
  if (
    group === "group2" &&
    !Number.isInteger(
      groupTournament.value.groupMatches.group2[index].player_a_score
    )
  ) {
    resultIsValid.value = false;
    validationStateObject.value.group2[index].playerAResultIsValid = false;
  }
  if (
    group === "group2" &&
    !Number.isInteger(
      groupTournament.value.groupMatches.group2[index].player_b_score
    )
  ) {
    resultIsValid.value = false;
    validationStateObject.value.group2[index].playerBResultIsValid = false;
  }
  // group3 validation
  if (
    group === "group3" &&
    !Number.isInteger(
      groupTournament.value.groupMatches.group3[index].player_a_score
    )
  ) {
    resultIsValid.value = false;
    validationStateObject.value.group3[index].playerAResultIsValid = false;
  }
  if (
    group === "group3" &&
    !Number.isInteger(
      groupTournament.value.groupMatches.group3[index].player_b_score
    )
  ) {
    resultIsValid.value = false;
    validationStateObject.value.group3[index].playerBResultIsValid = false;
  }
  // group4 validation
  if (
    group === "group4" &&
    !Number.isInteger(
      groupTournament.value.groupMatches.group4[index].player_a_score
    )
  ) {
    resultIsValid.value = false;
    validationStateObject.value.group4[index].playerAResultIsValid = false;
  }
  if (
    group === "group4" &&
    !Number.isInteger(
      groupTournament.value.groupMatches.group4[index].player_b_score
    )
  ) {
    resultIsValid.value = false;
    validationStateObject.value.group4[index].playerBResultIsValid = false;
  }
}

function clearPlayerAResultValidation(index: number, group: string): void {
  if (group === "group1")
    validationStateObject.value.group1[index].playerAResultIsValid = true;
  if (group === "group2")
    validationStateObject.value.group2[index].playerAResultIsValid = true;
  if (group === "group3")
    validationStateObject.value.group3[index].playerAResultIsValid = true;
  if (group === "group4")
    validationStateObject.value.group4[index].playerAResultIsValid = true;
}
function clearPlayerBResultValidation(index: number, group: string): void {
  if (group === "group1")
    validationStateObject.value.group1[index].playerBResultIsValid = true;
  if (group === "group2")
    validationStateObject.value.group2[index].playerBResultIsValid = true;
  if (group === "group3")
    validationStateObject.value.group3[index].playerBResultIsValid = true;
  if (group === "group4")
    validationStateObject.value.group4[index].playerBResultIsValid = true;
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

function getGroupTournament(id: string): void {
  onSnapshot(doc(db, "group-play-off", id), (doc) => {
    groupTournament.value = {
      name: doc.data()?.name,
      date: timestampToDate(doc.data()?.date?.seconds),
      id: doc.id,
      user: users.value.find((user: User) => user.id === doc.data()?.user_uuid),
      players: doc.data()?.players,
      groupMatches: doc.data()?.group_matches,
      groupPlayers: doc.data()?.group_players,
      groupStageIsCompleted: doc.data()?.group_stage_is_completed,
      playOffMatches: doc.data()?.play_off_matches,
      playOffPlayers: doc.data()?.play_off_players,
      isCompleted: doc.data()?.is_completed,
    };
    createTable();
    createValidationState();
    updateTable();
  });
}

onMounted(async () => {
  id = route.params.id;
  getUsers();
  if (typeof id === "string") {
    getGroupTournament(id);
  }
});
</script>

<style lang="scss"></style>
