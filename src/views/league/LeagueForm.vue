<template>
  <div class="container my-5 p-5 border">
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
      />
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
            />
          </div>
          <div v-if="index <= 2" class="col-1"></div>
          <div v-else class="col-1">
            <button
              type="button"
              class="btn btn btn-secondary"
              @click="removePlayerInput(index)"
            >
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
          @click="addPlayerInput"
        >
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
        v-model="secondMatch"
      />
    </div>
    <div class="create-tournament">
      <button type="submit" class="btn btn-secondary" @click="addLeague">
        Utwórz turniej
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import SingleMatch from "@/types/SingleMatch";
import { ref, Ref } from "vue";
import db from "@/firebase/firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import router from "@/router";

const leagueCollectionRef = collection(db, "league");

let name = ref("");
let secondMatch = ref(false);
let players: Ref<string[]> = ref(["", "", ""]);
let matches: Ref<SingleMatch[]> = ref([]);
let userId = "8IVuu2jePfH031T3HWz0";
let addPlayerDisability = false;

function addPlayerInput(): void {
  if (players.value.length < 20) {
    players.value.push("");
  } else {
    addPlayerDisability = true;
  }
}

function removePlayerInput(index: number): void {
  players.value.splice(index, 1);
}

function addMatches(): void {
  let matchesArray: SingleMatch[] = [];
  let secondMatchesArray: SingleMatch[] = [];

  players.value.forEach((player: string, index: number) => {
    let match: SingleMatch = {
      player_a: player,
      player_b: players.value[index < players.value.length - 1 ? index + 1 : 0],
      player_a_score: "",
      player_b_score: "",
    };
    matchesArray.push(match);

    if (secondMatch.value === true) {
      let secondMatch: SingleMatch = {
        player_a:
          players.value[index < players.value.length - 1 ? index + 1 : 0],
        player_b: player,
        player_a_score: "",
        player_b_score: "",
      };
      secondMatchesArray.push(secondMatch);
    }
  });
  matches.value = matchesArray.concat(secondMatchesArray);
}

async function addLeague(): Promise<void> {
  addMatches();
  const docRef = await addDoc(leagueCollectionRef, {
    date: firebase.firestore.FieldValue.serverTimestamp(),
    name: name.value,
    second_match: secondMatch.value,
    matches: matches.value,
    players: players.value,
    user_uuid: userId,
  });
  console.log("Document written with ID: ", docRef.id);

  const tournamentId: string = docRef.id;
  router.push("/league/" + tournamentId);
}
</script>

<style lang="scss"></style>
