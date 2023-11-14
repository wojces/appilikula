<template>
  <div class="container my-5 p-5 border">
    <div class="title">
      <h1>Puchary</h1>
    </div>
    <div class="list my-5">
      <div class="row fw-bold my-3">
        <div class="col-2">nazwa</div>
        <div class="col-2">data utworzenia</div>
        <div class="col-3">id turnieju</div>
        <div class="col-2">utworzył</div>
        <div class="col-1">liczba graczy</div>
        <div class="col-2">status</div>
      </div>
      <div class="row my-1" v-for="(league, index) in cups" :key="index">
        <div class="col-2">{{ league.name }}</div>
        <div class="col-2">{{ league.date }}</div>
        <div class="col-3">
          <router-link :to="league.id">{{ league.id }}</router-link>
        </div>
        <div class="col-2">{{ league.user?.name }}</div>
        <div class="col-1">{{ league.playersNumber }}</div>
        <div class="col-2">
          {{ league.is_completed ? "zakończony" : "aktywny" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Cup from "@/types/cup/Cup";
import User from "@/types/User";
import type { Ref } from "vue";
import { ref, onMounted } from "vue";
import db from "@/firebase/firebaseInit";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "firebase/compat/firestore";

let users: Ref<User[]> = ref([]);
let cups: Ref<Cup[]> = ref([]);

const cupCollectionRef = collection(db, "cup");
const usersCollectionRef = collection(db, "users");
const cupCollectionQuerry = query(cupCollectionRef, orderBy("date", "desc"));

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

function getCups(): void {
  onSnapshot(cupCollectionQuerry, (querySnapshot) => {
    const cupStats: Cup[] = [];
    querySnapshot.forEach((doc) => {
      const cup = {
        name: doc.data().name,
        date: timestampToDate(doc.data().date?.seconds),
        id: doc.id,
        user: users.value.find(
          (user: User) => user.id === doc.data().user_uuid
        ),
        playersNumber: doc.data().players.length,
        is_completed: doc.data().is_completed,
      };
      cupStats.push(cup);
    });
    cups.value = cupStats;
  });
}

onMounted(async () => {
  getUsers();
  getCups();
});
</script>
