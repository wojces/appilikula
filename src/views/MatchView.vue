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
          @click="setMatchScore()"
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
        <div class="row">
          <div class="col-1">1</div>
          <div class="col-2">16.08.23</div>
          <div class="col-2">Wojtek</div>
          <div class="col-2">Dawid</div>
          <div class="col-2">1</div>
          <div class="col-2">0</div>
          <div class="col-1">X</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let newMatchVisibility = ref(true);
const selectedPlayerA = ref("");
const selectedPlayerB = ref("");
let enteredScoreA = ref(0);
let enteredScoreB = ref(0);

function setMatchScore() {
  console.log(enteredScoreA.value, enteredScoreB.value);
}

function setNewMatchVisibility() {
  newMatchVisibility.value = true;
}
function closeNewMatchVisibility() {
  newMatchVisibility.value = false;
}
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
}
</style>
