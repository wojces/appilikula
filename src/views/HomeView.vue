<template>
  <div>
    <div class="mb-3">
      <label for="exampleFormControlInput1" class="form-label">
        Email address
      </label>
      <input
        type="email"
        class="form-control"
        id="exampleFormControlInput1"
        placeholder="name@example.com"
      />
    </div>
    <div class="mb-3">
      <label for="exampleFormControlTextarea1" class="form-label">
        Example textarea
      </label>
      <textarea
        class="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
      ></textarea>
    </div>
    <!--
    2 inputy:
      - Gracz A
      - Wynik gracza A
      - Gracz B
      - Wynik bracza B
      ZAPISZ  
  --></div>
</template>

<script lang="ts">
import { Vue } from "vue-class-component";

export default class HomeView extends Vue {}
</script>
