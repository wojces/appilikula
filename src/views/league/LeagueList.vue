<template>
  <div class="container my-5 p-5 border">
    <div class="title">
      <h1>Turnieje ligowe</h1>
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
      <div class="row my-1" v-for="(league, index) in leagues" :key="index">
        <div class="col-2">{{ league.name }}</div>
        <div class="col-2">{{ league.date }}</div>
        <div class="col-3">
          <router-link :to="league.id">{{ league.id }}</router-link>
        </div>
        <div class="col-2">{{ league.user?.name }}</div>
        <div class="col-1">{{ league.playersNumber }}</div>
        <div class="col-2">
          {{ league.isCompleted ? "zakończony" : "aktywny" }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatsList from "@/types/StatsList";
import User from "@/types/User";
import type { Ref } from "vue";
import { ref, onMounted } from "vue";
import db from "@/firebase/firebaseInit";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import "firebase/compat/firestore";
import timestampToDate from "@/functions/timestampToDate";

let users: Ref<User[]> = ref([]);
let leagues: Ref<StatsList[]> = ref([]);

const leaguesCollectionRef = collection(db, "league");
const usersCollectionRef = collection(db, "users");
const leaguesCollectionQuerry = query(
  leaguesCollectionRef,
  orderBy("date", "desc")
);

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

function getLeagues(): void {
  onSnapshot(leaguesCollectionQuerry, (querySnapshot) => {
    const leagueStats: StatsList[] = [];
    querySnapshot.forEach((doc) => {
      const league = {
        name: doc.data().name,
        date: timestampToDate(doc.data().date?.seconds),
        id: doc.id,
        user: users.value.find(
          (user: User) => user.id === doc.data().user_uuid
        ),
        playersNumber: doc.data().players.length,
        isCompleted: doc.data().is_completed,
      };
      leagueStats.push(league);
    });
    leagues.value = leagueStats;
  });
}

onMounted(async () => {
  getUsers();
  getLeagues();
});
</script>
