<template>
  <div class="match">
    <div class="container text-center py-5">
      <div class="newMatchInput border" v-if="newMatchVisibility">
        <div class="row">
          <div class="col"><h3>Dodaj wynik meczu</h3></div>
        </div>
        <div class="row">
          <div class="col">
            <label for="exampleFormControlInput1" class="form-label">
              Wybierz gracza 1
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedPlayerA"
            >
              <option disabled value="">Naciśnij aby wybrać gracza</option>
              <option
                v-for="(user, index) in selectableUsers"
                :value="user.id"
                :disabled="user.disabled"
                :key="index"
              >
                {{ index + 1 + ". " + user.name }}
              </option>
            </select>
          </div>
          <div class="col">
            <label for="exampleFormControlInput1" class="form-label">
              Wybierz gracza 2
            </label>
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedPlayerB"
            >
              <option disabled value="">Naciśnij aby wybrać gracza</option>
              <option
                v-for="(user, index) in selectableUsers"
                :value="user.id"
                :disabled="user.disabled"
                :key="index"
              >
                {{ index + 1 + ". " + user.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <label for="exampleFormControlInput1" class="form-label"
              >Wynik gracza 1</label
            >
            <input
              type="number"
              min="0"
              max="99"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="podaj wynik..."
              v-model="enteredScoreA"
            />
          </div>
          <div class="col">
            <label for="exampleFormControlInput1" class="form-label"
              >Wynik gracza 2</label
            >
            <input
              type="number"
              min="0"
              max="99"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="podaj wynik..."
              v-model="enteredScoreB"
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-secondary mb-2"
          @click="addMatchToStats()"
        >
          Dodaj mecz
        </button>
      </div>

      <div class="newMatchButtons">
        <button
          v-if="!newMatchVisibility"
          type="submit"
          class="btn btn-secondary mt-3 mb-3"
          @click="setNewMatchVisibility"
        >
          Nowy mecz
        </button>
        <button
          v-if="newMatchVisibility"
          type="submit"
          class="btn btn-secondary mt-3 mb-3"
          @click="closeNewMatchVisibility"
        >
          Zamknij
        </button>
      </div>

      <div class="stats border mt-2 pb-3">
        <div class="row">
          <div class="col"><h3>Statystyki</h3></div>
        </div>
        <div class="row heading">
          <div class="col-1">lp</div>
          <div class="col-3">data meczu</div>
          <div class="col-2">Nazwa gracza A</div>
          <div class="col-2">Nazwa gracza B</div>
          <div class="col-2">Wynik gracza A</div>
          <div class="col-2">Wynik gracza B</div>
        </div>
        <div
          class="row"
          v-for="(singleMatch, index) in matchStats"
          :key="index"
        >
          <div class="col-1">{{ index + 1 }}</div>
          <div class="col-3">{{ singleMatch.date }}</div>
          <div class="col-2">{{ singleMatch.playerA?.name }}</div>
          <div class="col-2">{{ singleMatch.playerB?.name }}</div>
          <div class="col-2">{{ singleMatch.player_a_score }}</div>
          <div class="col-2">{{ singleMatch.player_b_score }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Match from "@/types/Match";
import User from "@/types/User";
import type { Ref } from "vue";
import { ref, onMounted, watch } from "vue";
import db from "@/firebase/firebaseInit";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

const matchesCollectionRef = collection(db, "matches");
const usersCollectionRef = collection(db, "users");
const matchesCollectionQuerry = query(
  matchesCollectionRef,
  orderBy("date", "asc")
);

let newMatchVisibility = ref(true);
const selectedPlayerA = ref("");
const selectedPlayerB = ref("");
let enteredScoreA = ref(0);
let enteredScoreB = ref(0);
let users: Ref<User[]> = ref([]);
let matchStats: Ref<Match[]> = ref([]);
let selectableUsers = users;

async function addMatchToStats(): Promise<void> {
  const docRef = await addDoc(matchesCollectionRef, {
    date: firebase.firestore.FieldValue.serverTimestamp(),
    player_a_uuid: selectedPlayerA.value,
    player_b_uuid: selectedPlayerB.value,
    player_a_score: enteredScoreA.value,
    player_b_score: enteredScoreB.value,
  });
  console.log("Document written with ID: ", docRef.id);
  clearMatchInput();
}

watch(selectedPlayerA, (playerAId): void => {
  playerInputValidation(playerAId);
});
watch(selectedPlayerB, (playerBId): void => {
  playerInputValidation(playerBId);
});

function playerInputValidation(playerId: string): void {
  selectableUsers.value = selectableUsers.value.map((user: User) => {
    return {
      ...user,
      disabled: user.id === playerId,
    };
  });
}

function clearMatchInput(): void {
  selectedPlayerA.value = "";
  selectedPlayerB.value = "";
  enteredScoreA.value = 0;
  enteredScoreB.value = 0;
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

function setNewMatchVisibility(): void {
  newMatchVisibility.value = true;
}
function closeNewMatchVisibility(): void {
  newMatchVisibility.value = false;
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

function getMatches(): void {
  onSnapshot(matchesCollectionQuerry, (querySnapshot) => {
    const matches: Match[] = [];
    querySnapshot.forEach((doc) => {
      const match = {
        match_id: doc.id,
        date: timestampToDate(doc.data().date?.seconds),
        player_a_uuid: doc.data().player_a_uuid,
        player_b_uuid: doc.data().player_b_uuid,
        player_a_score: doc.data().player_a_score,
        player_b_score: doc.data().player_b_score,
        playerA: users.value.find(
          (user: User) => user.id === doc.data().player_a_uuid
        ),
        playerB: users.value.find(
          (user: User) => user.id === doc.data().player_b_uuid
        ),
      };
      matches.push(match);
    });
    matchStats.value = matches;
  });
}

onMounted(async () => {
  getUsers();
  getMatches();
});
</script>

<style lang="scss" scoped>
.newMatchInput {
  padding: 0 16px 0 16px;

  label {
    font-weight: bold;
  }

  .col {
    padding: 16px;
  }
}
.stats {
  .col {
    padding: 16px;
  }
  .heading {
    font-weight: bold;
    margin-bottom: 16px;
  }
  .col-1 {
    button {
      padding: 0 8px 0 8px;
    }
  }
}
</style>
