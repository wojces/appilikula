<template>
  <form ref="form" class="container my-5 p-5 border">
    <div class="title">
      <h1>Puchar</h1>
    </div>
    <div class="tournament-name text-start my-5">
      <label for="tournamentName" class="form-label fw-bold">
        Nazwa turnieju
      </label>
      <input
        type="text"
        class="form-control my-3"
        id="tournamentName"
        placeholder="Podaj nazwę turnieju..."
        v-model="name"
        required
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
              required
            />
          </div>
          <div v-if="index <= 3" class="col-1"></div>
          <div v-else-if="index / 4 == 1" class="col-1">
            <button
              type="button"
              class="btn btn btn-secondary"
              @click="removePlayerInput(index)"
            >
              X
            </button>
          </div>
          <div v-else-if="index / 4 == 2" class="col-1">
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
    <div class="third-place-match form-check text-start my-3">
      <label class="form-check-label fw-bold" for="thirdPlaceMatch">
        Mecz o 3 miejsce
      </label>
      <input
        class="form-check-input"
        type="checkbox"
        id="thirdPlaceMatch"
        v-model="thirdPlaceMatch"
      />
    </div>
    <div class="create-tournament">
      <button @click.prevent="addCup" type="submit" class="btn btn-secondary">
        Utwórz turniej
      </button>
      <!-- <button @click.prevent="test" type="submit" class="btn btn-secondary">
        testowy
      </button> -->
    </div>
  </form>
</template>

<script setup lang="ts">
import Match from "@/types/Match";
import { ref, Ref } from "vue";
import db from "@/firebase/firebaseInit";
import { collection, addDoc } from "firebase/firestore";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import router from "@/router";

const cupCollectionRef = collection(db, "cup");

const form = ref(null);
let name = ref("");
let thirdPlaceMatch = ref(false);
let players: Ref<string[]> = ref(["", "", "", ""]);
let matches: Ref<Match[]> = ref([]);
let userId = "8IVuu2jePfH031T3HWz0";
let addPlayerDisability = false;

function addPlayerInput(): void {
  if (players.value.length < 8) {
    players.value.push("", "", "", "");
  } else if (players.value.length < 16) {
    players.value.push("", "", "", "", "", "", "", "");
  } else {
    addPlayerDisability = true;
  }
}

function removePlayerInput(index: number): void {
  if (players.value.length > 3 && players.value.length <= 7) {
    players.value.splice(index, 4);
    addPlayerDisability = false;
  } else if (players.value.length > 7) {
    players.value.splice(index, 8);
    addPlayerDisability = false;
  }
}

function shuffle(players: string[]) {
  for (let i = players.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [players[i], players[j]] = [players[j], players[i]];
  }
}

// function test() {
//   addMatches();
//   console.log(matches.value);
// }

function addMatches(): void {
  shuffle(players.value);
  let matchesArray: Match[] = [];

  for (let i = 0; i < players.value.length; i += 2) {
    let match: Match = {
      player_a: players.value[i],
      player_b: players.value[i + 1],
      player_a_score: NaN,
      player_b_score: NaN,
      is_played: false,
    };
    matchesArray.push(match);
  }

  matches.value = matchesArray;
}

async function addCup(): Promise<void> {
  if (form.value && !(form.value as HTMLFormElement).checkValidity()) {
    (form.value as HTMLFormElement).reportValidity();
    return;
  }

  addMatches();
  const docRef = await addDoc(cupCollectionRef, {
    date: firebase.firestore.FieldValue.serverTimestamp(),
    name: name.value,
    third_place_match: thirdPlaceMatch.value,
    matches: matches.value,
    players: players.value,
    user_uuid: userId,
    is_completed: false,
  });
  console.log("Cup written with ID: ", docRef.id);

  const tournamentId: string = docRef.id;
  router.push("/cup/" + tournamentId);
}
</script>

<style lang="scss"></style>
