<template>
  <div class="match">
    <!--
    2 inputy:
      - Gracz A
      - Wynik gracza A
      - Gracz B
      - Wynik bracza B
      ZAPISZ  -->
    <div class="container text-center">
      <div class="playerInput border">
        <div class="row">
          <div class="col"><h3>Dodaj wynik</h3></div>
        </div>
        <div class="row">
          <div class="col">
            <select
              class="form-select"
              aria-label="Default select example"
              v-model="selectedPlayer"
            >
              <option disabled value="">Naciśnij aby wybrać gracza</option>
              <option value="playerA">Gracz A</option>
              <option value="playerB">Gracz B</option>
            </select>
          </div>
          <div class="col">
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="podaj wynik..."
              v-model="enteredScoreValue"
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-secondary mb-2"
          @click="setPlayerScore()"
        >
          Zatwierdź
        </button>
      </div>
      <div class="playerScore border mt-4">
        <div class="row">
          <div class="col"><h3>Wyniki</h3></div>
        </div>
        <div class="row names">
          <div class="col">Gracz A</div>
          <div class="col">Gracz B</div>
        </div>
        <div class="row scores">
          <div class="col">{{ scoreA }}</div>
          <div class="col">{{ scoreB }}</div>
        </div>
        <button
          type="submit"
          class="btn btn-secondary mb-2"
          @click="clearScore"
        >
          Zeruj
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { Vue } from "vue-class-component";
import { ref } from "vue";

const selectedPlayer = ref("");
let enteredScoreValue = ref(0);
let scoreA = ref(0);
let scoreB = ref(0);

function setPlayerScore() {
  if (selectedPlayer.value === "playerA") {
    scoreA.value = scoreA.value + enteredScoreValue.value;
  } else if (selectedPlayer.value === "playerB") {
    scoreB.value = scoreB.value + enteredScoreValue.value;
  }

  // console.log("Wybrany gracz to: ", selectedPlayer.value);
  // console.log("Wprowadzony wynik gracza: ", enteredScoreValue.value);
  // console.log("Wynik gracza A: ", scoreA.value);
  // console.log("Wynik gracza B: ", scoreB.value);
}

function clearScore() {
  scoreA.value = 0;
  scoreB.value = 0;
  // console.log("Wynik A: " + scoreA.value);
  // console.log("Wynik B: " + scoreB.value);
}

// export default class HomeView extends Vue {}
</script>

<style lang="scss">
.playerInput {
  padding: 0 16px 0 16px;

  .col {
    padding: 16px;
  }
}
.playerScore {
  .col {
    padding: 16px;
  }
  .names {
    font-size: 20px;
  }
  .scores {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>
