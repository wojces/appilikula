<template>
  <div class="container p-5 border">
    <div class="title">
      <h1>Turnieje Grupa + Play-Off</h1>
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
      <div class="row my-1" v-for="(group, index) in groups" :key="index">
        <div class="col-2">{{ group.name }}</div>
        <div class="col-2">{{ group.date }}</div>
        <div class="col-3">
          <router-link :to="group.id">{{ group.id }}</router-link>
        </div>
        <div class="col-2">{{ group.user?.name }}</div>
        <div class="col-1">{{ group.playersNumber }}</div>
        <div class="col-2">
          {{ group.isCompleted ? "zakończony" : "aktywny" }}
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
let groups: Ref<StatsList[]> = ref([]);

const groupCollectionRef = collection(db, "group-play-off");
const usersCollectionRef = collection(db, "users");
const groupCollectionQuerry = query(
  groupCollectionRef,
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

function getGroups(): void {
  onSnapshot(groupCollectionQuerry, (querySnapshot) => {
    const groupStats: StatsList[] = [];
    querySnapshot.forEach((doc) => {
      const groups = {
        name: doc.data().name,
        date: timestampToDate(doc.data().date?.seconds),
        id: doc.id,
        user: users.value.find(
          (user: User) => user.id === doc.data().user_uuid
        ),
        playersNumber: doc.data().players.length,
        isCompleted: doc.data().is_completed,
      };
      groupStats.push(groups);
    });
    groups.value = groupStats;
  });
}

onMounted(async () => {
  getUsers();
  getGroups();
});
</script>
