<template>
  <form ref="form" class="container p-5 border">
    <div class="title">
      <h1>Liga</h1>
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
          <div v-if="index <= 2" class="col-1"></div>
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
        Dwumecz
      </label>
      <input
        class="form-check-input"
        type="checkbox"
        id="secondMatch"
        v-model="secondMatch" />
    </div>
    <div class="create-tournament">
      <button
        @click.prevent="addLeague"
        type="submit"
        class="btn btn-secondary">
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

const leagueCollectionRef = collection(db, "league");

const form = ref(null);
let name = ref("");
let secondMatch = ref(false);
let players: Ref<string[]> = ref(["", "", ""]);
let matches: Ref<Match[]> = ref([]);
let userId = "tqH9guVSEhrST0syb5Q0";

let addPlayerDisability = computed(() => {
  return players.value.length == 20;
});

function addPlayersInput(): void {
  if (players.value.length < 20) {
    players.value.push("");
  }
}

function removePlayersInput(index: number): void {
  players.value.splice(index, 1);
}

function addMatches(): void {
  let matchesArray: Match[] = [];
  let secondMatchesArray: Match[] = [];

  players.value.forEach((player: string, index: number) => {
    for (let j = index + 1; j < players.value.length; j++) {
      let match: Match = {
        player_a: player,
        player_b: players.value[j],
        player_a_score: NaN,
        player_b_score: NaN,
        is_played: false,
      };
      matchesArray.push(match);
    }
  });
  shuffle(matchesArray);
  if (secondMatch.value === true) {
    for (let i = 0; i < matchesArray.length; i++) {
      const currentMatch = matchesArray[i];
      secondMatchesArray.push({
        ...currentMatch,
        player_a: currentMatch.player_b,
        player_b: currentMatch.player_a,
      });
    }
  }
  matches.value = matchesArray.concat(secondMatchesArray);
}

async function addLeague(): Promise<void> {
  if (form.value && !(form.value as HTMLFormElement).checkValidity()) {
    (form.value as HTMLFormElement).reportValidity();
    return;
  }

  addMatches();
  const docRef = await addDoc(leagueCollectionRef, {
    date: firebase.firestore.FieldValue.serverTimestamp(),
    name: name.value,
    second_match: secondMatch.value,
    matches: matches.value,
    players: players.value,
    user_uuid: userId,
    is_completed: false,
  });
  // console.log("League written with ID: ", docRef.id);

  const tournamentId: string = docRef.id;
  router.push("/league/" + tournamentId);
}
</script>

<style lang="scss"></style>
