<template>
  <div class="match">
    <div class="container text-center">
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
              <option value="Wojtek">Wojtek</option>
              <option value="Dawid">Dawid</option>
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
              <option value="Wojtek">Wojtek</option>
              <option value="Dawid">Dawid</option>
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
          @click="addMatchScore()"
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
          <div class="col-2">data meczu</div>
          <div class="col-2">Nazwa gracza A</div>
          <div class="col-2">Nazwa gracza B</div>
          <div class="col-2">Wynik gracza A</div>
          <div class="col-2">Wynik gracza B</div>
          <div class="col-1"></div>
        </div>
        <div
          class="row"
          v-for="(singleMatch, index) in matchStats"
          :key="index"
        >
          <div class="col-1">{{ index + 1 }}</div>
          <div class="col-2">{{ singleMatch.date }}</div>
          <div class="col-2">{{ singleMatch.playerA.userName }}</div>
          <div class="col-2">{{ singleMatch.playerB.userName }}</div>
          <div class="col-2">{{ singleMatch.playerAScore }}</div>
          <div class="col-2">{{ singleMatch.playerBScore }}</div>
          <div class="col-1">
            <button
              type="submit"
              class="btn btn-secondary mb-1"
              @click="deleteMatch(index)"
            >
              x
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import db from "../firebase/firebaseInit";
import { collection, getDocs } from "firebase/firestore";

let newMatchVisibility = ref(true);
const selectedPlayerA = ref("");
const selectedPlayerB = ref("");
let enteredScoreA = ref(0);
let enteredScoreB = ref(0);
let users: any = ref([]);
let matchStats: any = ref([]);
let stats: any = ref([
  {
    matchId: "1",
    date: "15.08.2023",
    playerAName: "Wojtek",
    playerBName: "Dawid",
    playerAScore: 2,
    playerBScore: 6,
  },
]);
let newMatch = reactive({
  matchId: 0,
  date: "",
  playerAName: "",
  playerBName: "",
  playerAScore: 0,
  playerBScore: 0,
});

function addMatchScore() {
  newMatch.matchId = stats.value.length + 1;
  newMatch.date = currentDate();
  newMatch.playerAName = selectedPlayerA.value;
  newMatch.playerBName = selectedPlayerB.value;
  newMatch.playerAScore = enteredScoreA.value;
  newMatch.playerBScore = enteredScoreB.value;
  stats.value.push(newMatch);
  clearMatchInput();
}

function clearMatchInput() {
  selectedPlayerA.value = "";
  selectedPlayerB.value = "";
  enteredScoreA.value = 0;
  enteredScoreB.value = 0;
}

function currentDate() {
  const date = new Date();
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = date.getFullYear();
  let fullDate = day + "." + month + "." + year;
  return fullDate;
}

function timestampToDate(timestamp: number) {
  let unix_timestamp = timestamp;
  const date = new Date(unix_timestamp * 1000);
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let year = date.getFullYear();
  let fullDate = day + "." + month + "." + year;

  return fullDate;
}

function setNewMatchVisibility() {
  newMatchVisibility.value = true;
}
function closeNewMatchVisibility() {
  newMatchVisibility.value = false;
}

function deleteMatch(matchIndex: number) {
  stats.value.splice(matchIndex, 1);
}

async function getUsers() {
  const queryUserSnapshot = await getDocs(collection(db, "users"));
  queryUserSnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    const user = {
      userId: doc.id,
      userName: doc.data().name,
      userEmail: doc.data().email,
    };
    users.value.push(user);
  });
}

async function getMatches() {
  const queryUserSnapshot = await getDocs(collection(db, "matches"));
  queryUserSnapshot.forEach((doc) => {
    // console.log(doc.id, " => ", doc.data());
    const match = {
      matchId: doc.id,
      date: timestampToDate(doc.data().date.seconds),
      playerAId: doc.data().player_a_uuid,
      playerBId: doc.data().player_b_uuid,
      playerAScore: doc.data().player_a_score,
      playerBScore: doc.data().player_b_score,
      playerA: users.value.find(
        (user: any) => user.userId === doc.data().player_a_uuid
      ),
      playerB: users.value.find(
        (user: any) => user.userId === doc.data().player_b_uuid
      ),
    };
    matchStats.value.push(match);
  });
}

onMounted(async () => {
  await getUsers();
  await getMatches();
  // console.log("user1: ", users.value[0]);
  // console.log("user2: ", users.value[1]);
  // console.log("match1: ", matchStats.value[0]);
  // console.log("match2: ", matchStats.value[1]);
});
</script>

<style lang="scss">
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
