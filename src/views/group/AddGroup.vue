<template>
  <form ref="form" class="container p-5 border">
    <div class="title">
      <h1>Grupa + play-off</h1>
    </div>
    <div class="tournament-name text-start my-5">
      <label for="tournamentName" class="form-label fw-bold"
        >Nazwa turnieju</label
      >
      <input
        type="text"
        class="form-control my-3"
        id="tournamentName"
        placeholder="Podaj nazwę turnieju..."
        v-model="name"
        required />
    </div>
    <div class="players text-start">
      <label for="players" class="form-label fw-bold">Gracze</label>
      <ul class="player-input p-0 my-3">
        <li class="row my-2" v-for="(player, index) in players" :key="index">
          <div class="col-11">
            <input
              type="text"
              class="form-control"
              id="players"
              placeholder="Podaj imię gracza..."
              v-model="players[index]"
              required />
          </div>
          <div v-if="index <= 5" class="col-1"></div>
          <div v-else class="col-1">
            <button
              type="button"
              class="btn btn btn-secondary"
              @click="removePlayersInput(index)">
              X
            </button>
          </div>
        </li>
      </ul>
      <div class="add-plyer-input text-center">
        <button
          :disabled="addPlayerDisability"
          type="button"
          class="btn btn btn-secondary my-3"
          @click="addPlayersInput">
          Dodaj gracza
        </button>
      </div>
    </div>
    <div class="second-match form-check text-start my-3">
      <label class="form-check-label fw-bold" for="secondMatch">
        Dwumecz w fazie grupowej
      </label>
      <input
        class="form-check-input"
        type="checkbox"
        id="secondMatch"
        v-model="secondMatch" />
    </div>
    <div class="create-tournament">
      <button @click.prevent="addGroup" type="submit" class="btn btn-secondary">
        Utwórz turniej
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import Match from "@/types/Match";
import { ref, Ref, computed } from "vue";
import db from "@/firebase/firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import router from "@/router";
import shuffle from "@/functions/shuffle";

const groupCollectionRef = collection(db, "group-play-off");

const form = ref(null);
let name = ref("");
let secondMatch = ref(false);
let players: Ref<string[]> = ref(["", "", "", "", "", ""]);
let groupMatches = {
  group1: [] as Match[],
  group2: [] as Match[],
  group3: [] as Match[],
  group4: [] as Match[],
};
let playOffMatches = {
  level1: [] as Match[],
  level2: [] as Match[],
  level3: [] as Match[],
  level1IsCompleted: false as boolean,
  level2IsCompleted: false as boolean,
};
let groupPlayers = {
  group1: [] as string[],
  group2: [] as string[],
  group3: [] as string[],
  group4: [] as string[],
};

let userId = "tqH9guVSEhrST0syb5Q0";

const addPlayerDisability = computed(() => {
  return players.value.length == 16;
});

function addPlayersInput(): void {
  if (players.value.length < 16) {
    players.value.push("");
  }
}

function removePlayersInput(index: number): void {
  players.value.splice(index, 1);
}

function addMatches(): void {
  shuffle(players.value);

  let group1MatchesArray: Match[] = [];
  let group2MatchesArray: Match[] = [];
  let group3MatchesArray: Match[] = [];
  let group4MatchesArray: Match[] = [];
  let group1SecondMatchesArray: Match[] = [];
  let group2SecondMatchesArray: Match[] = [];
  let group3SecondMatchesArray: Match[] = [];
  let group4SecondMatchesArray: Match[] = [];

  if (players.value.length < 12) {
    groupPlayers.group1 = players.value.slice(0, players.value.length / 2);
    groupPlayers.group2 = players.value.slice(
      players.value.length / 2,
      players.value.length
    );

    groupPlayers.group1.forEach((player: string, index: number) => {
      for (let j = index + 1; j < groupPlayers.group1.length; j++) {
        let match: Match = {
          player_a: player,
          player_b: groupPlayers.group1[j],
          player_a_score: NaN,
          player_b_score: NaN,
          is_played: false,
        };
        group1MatchesArray.push(match);
      }
    });
    shuffle(group1MatchesArray);
    if (secondMatch.value === true) {
      for (let i = 0; i < group1MatchesArray.length; i++) {
        const currentMatch = group1MatchesArray[i];
        group1SecondMatchesArray.push({
          ...currentMatch,
          player_a: currentMatch.player_b,
          player_b: currentMatch.player_a,
        });
      }
    }
    groupMatches.group1 = group1MatchesArray.concat(group1SecondMatchesArray);

    groupPlayers.group2.forEach((player: string, index: number) => {
      for (let j = index + 1; j < groupPlayers.group2.length; j++) {
        let match: Match = {
          player_a: player,
          player_b: groupPlayers.group2[j],
          player_a_score: NaN,
          player_b_score: NaN,
          is_played: false,
        };
        group2MatchesArray.push(match);
      }
    });
    shuffle(group2MatchesArray);
    if (secondMatch.value === true) {
      for (let i = 0; i < group2MatchesArray.length; i++) {
        const currentMatch = group2MatchesArray[i];
        group2SecondMatchesArray.push({
          ...currentMatch,
          player_a: currentMatch.player_b,
          player_b: currentMatch.player_a,
        });
      }
    }
    groupMatches.group2 = group2MatchesArray.concat(group2SecondMatchesArray);
  } else if (players.value.length >= 12 && players.value.length <= 16) {
    groupPlayers.group1 = players.value.slice(0, players.value.length / 4);
    groupPlayers.group2 = players.value.slice(
      players.value.length / 4,
      players.value.length / 2
    );
    groupPlayers.group3 = players.value.slice(
      players.value.length / 2,
      players.value.length / 4 + players.value.length / 2
    );
    groupPlayers.group4 = players.value.slice(
      players.value.length / 4 + players.value.length / 2,
      players.value.length
    );

    groupPlayers.group1.forEach((player: string, index: number) => {
      for (let j = index + 1; j < groupPlayers.group1.length; j++) {
        let match: Match = {
          player_a: player,
          player_b: groupPlayers.group1[j],
          player_a_score: NaN,
          player_b_score: NaN,
          is_played: false,
        };
        group1MatchesArray.push(match);
      }
    });
    shuffle(group1MatchesArray);
    if (secondMatch.value === true) {
      for (let i = 0; i < group1MatchesArray.length; i++) {
        const currentMatch = group1MatchesArray[i];
        group1SecondMatchesArray.push({
          ...currentMatch,
          player_a: currentMatch.player_b,
          player_b: currentMatch.player_a,
        });
      }
    }
    groupMatches.group1 = group1MatchesArray.concat(group1SecondMatchesArray);

    groupPlayers.group2.forEach((player: string, index: number) => {
      for (let j = index + 1; j < groupPlayers.group2.length; j++) {
        let match: Match = {
          player_a: player,
          player_b: groupPlayers.group2[j],
          player_a_score: NaN,
          player_b_score: NaN,
          is_played: false,
        };
        group2MatchesArray.push(match);
      }
    });
    shuffle(group2MatchesArray);
    if (secondMatch.value === true) {
      for (let i = 0; i < group2MatchesArray.length; i++) {
        const currentMatch = group2MatchesArray[i];
        group2SecondMatchesArray.push({
          ...currentMatch,
          player_a: currentMatch.player_b,
          player_b: currentMatch.player_a,
        });
      }
    }
    groupMatches.group2 = group2MatchesArray.concat(group2SecondMatchesArray);

    groupPlayers.group3.forEach((player: string, index: number) => {
      for (let j = index + 1; j < groupPlayers.group3.length; j++) {
        let match: Match = {
          player_a: player,
          player_b: groupPlayers.group3[j],
          player_a_score: NaN,
          player_b_score: NaN,
          is_played: false,
        };
        group3MatchesArray.push(match);
      }
    });
    shuffle(group3MatchesArray);
    if (secondMatch.value === true) {
      for (let i = 0; i < group3MatchesArray.length; i++) {
        const currentMatch = group3MatchesArray[i];
        group3SecondMatchesArray.push({
          ...currentMatch,
          player_a: currentMatch.player_b,
          player_b: currentMatch.player_a,
        });
      }
    }
    groupMatches.group3 = group3MatchesArray.concat(group3SecondMatchesArray);

    groupPlayers.group4.forEach((player: string, index: number) => {
      for (let j = index + 1; j < groupPlayers.group4.length; j++) {
        let match: Match = {
          player_a: player,
          player_b: groupPlayers.group4[j],
          player_a_score: NaN,
          player_b_score: NaN,
          is_played: false,
        };
        group4MatchesArray.push(match);
      }
    });
    shuffle(group4MatchesArray);
    if (secondMatch.value === true) {
      for (let i = 0; i < group4MatchesArray.length; i++) {
        const currentMatch = group4MatchesArray[i];
        group4SecondMatchesArray.push({
          ...currentMatch,
          player_a: currentMatch.player_b,
          player_b: currentMatch.player_a,
        });
      }
    }
    groupMatches.group4 = group4MatchesArray.concat(group4SecondMatchesArray);
  }
}

async function addGroup(): Promise<void> {
  if (form.value && !(form.value as HTMLFormElement).checkValidity()) {
    (form.value as HTMLFormElement).reportValidity();
    return;
  }

  addMatches();
  const docRef = await addDoc(groupCollectionRef, {
    date: firebase.firestore.FieldValue.serverTimestamp(),
    name: name.value,
    second_match: secondMatch.value,
    group_matches: groupMatches,
    play_off_matches: playOffMatches,
    players: players.value,
    group_players: groupPlayers,
    play_off_players: [],
    user_uuid: userId,
    is_completed: false,
    group_stage_is_completed: false,
  });
  // console.log("Group written with ID: ", docRef.id);

  const tournamentId: string = docRef.id;
  router.push("/group-play-off/" + tournamentId);
}
</script>

<style lang="scss"></style>
