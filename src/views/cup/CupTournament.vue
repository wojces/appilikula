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
      <div class="row fw-bold my-3">
        <div class="col-4">ćwierćfinał</div>
        <div class="col-4">półfinał</div>
        <div class="col-4">finał</div>
      </div>
      <form ref="form">
        <div class="row my-3">
          <div class="col-4">
            <div
              class="row my-3 py-1 border rounded-4 align-items-center d-flex justify-content-evenly"
              v-for="(match, index) in cupTournament.matches"
              :key="index"
            >
              <div class="col-2">
                <div class="row my-3">{{ match.player_a }}</div>
                <div class="row my-3">{{ match.player_b }}</div>
              </div>
              <div class="col-2">
                <div class="row my-1">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    class="form-control text-center"
                    v-model="cupTournament.matches[index].player_a_score"
                    :disabled="cupTournament.matches[index].is_played"
                    required
                  />
                </div>
                <div class="row my-1">
                  <input
                    type="number"
                    min="0"
                    max="99"
                    class="form-control text-center"
                    v-model="cupTournament.matches[index].player_b_score"
                    :disabled="cupTournament.matches[index].is_played"
                    required
                  />
                </div>
              </div>
              <div class="col-2">
                <div class="row my-2">
                  <div v-if="cupTournament.is_completed"></div>
                  <button
                    v-else-if="cupTournament.matches[index].is_played"
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
                    ✓
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">1/4</div>
          <div class="col-4">półfinał</div>
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
import CupTournament from "@/types/cup/CupTournament";
import User from "@/types/User";
import Match from "@/types/Match";

import { useRoute } from "vue-router";
import { doc, onSnapshot, collection, updateDoc } from "firebase/firestore";
import { Ref, ref, onMounted } from "vue";
import db from "@/firebase/firebaseInit";

const cupsCollectionRef = collection(db, "cup");
const usersCollectionRef = collection(db, "users");

let id: string | string[] = "";
const form = ref(null);
const route = useRoute();
let cupTournament = ref({} as CupTournament);
let users: Ref<User[]> = ref([]);

let endPosibility = false;

function updateMatch(index: number): void {
  if (
    form.value &&
    form.value[index] &&
    !(form.value[index] as HTMLFormElement).checkValidity()
  ) {
    (form.value[index] as HTMLFormElement).reportValidity();
    return;
  }

  cupTournament.value.matches[index].is_played = true;
  endPosibility = cupTournament.value.matches.every(
    (match: Match) => match.is_played === true
  );
  if (typeof id === "string") {
    updateCup(id);
  }
}

function restoreMatch(index: number): void {
  cupTournament.value.matches[index].is_played = false;
}

async function updateCup(id: string): Promise<void> {
  await updateDoc(doc(cupsCollectionRef, id), {
    is_completed: cupTournament.value.is_completed,
    matches: cupTournament.value.matches,
  });
}

function endTournament(): void {
  cupTournament.value.is_completed = true;
  if (typeof id === "string") {
    updateCup(id);
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
      thirdPlaceMatch: doc.data()?.third_place_match,
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
