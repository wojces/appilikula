<template>
  <div class="container my-5 py-5 border">
    <div class="title">
      <h1>Faza grupowa i play-offy</h1>
    </div>
    <div class="tournament-name text-start my-5">
      <p class="fw-bold mx-4">Nazwa turnieju</p>
      <input
        class="form-control my-3 mx-4"
        type="text"
        placeholder="Podaj nazwę turnieju"
      />
    </div>
    <div class="number-of-players row my-5">
      <div class="col-2 my-1">
        <label for="numberOfPlayers" class="form-label fw-bold">
          Podaj ilość graczy
        </label>
      </div>
      <div class="col-1">
        <input
          type="number"
          min="6"
          max="20"
          class="form-control"
          id="numberOfPlayers"
        />
      </div>
    </div>
    <div class="players mx-4 text-start">
      <p class="fw-bold my-3">Podaj nazwy graczy</p>
      <input class="form-control my-3" type="text" placeholder="Gracz 1" />
      <input class="form-control my-3" type="text" placeholder="Gracz 2" />
      <input class="form-control my-3" type="text" placeholder="Gracz 3" />
    </div>
    <div class="second-match form-check d-flex">
      <input
        class="form-check-input my-3 mx-2"
        type="checkbox"
        id="secondMatch"
      />
      <label class="form-check-label my-3 mx-1" for="secondMatch">
        Dwumecz
      </label>
    </div>
    <div class="third-place-match form-check d-flex">
      <input
        class="form-check-input my-3 mx-2"
        type="checkbox"
        id="thirdPlaceMatch"
      />
      <label class="form-check-label my-3 mx-1" for="thirdPlaceMatch">
        Mecz o trzecie miejsce
      </label>
    </div>
    <button type="submit" class="btn btn-secondary mb-2">Utwórz</button>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss"></style>
