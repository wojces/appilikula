<template>
  <section class="p-5">
    <div class="container">
      <div class="row text-center">
        <div class="col-md">
          <div class="card bg-dark text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <i>x</i>
              </div>
              <h3 class="card-title mb-3">Liga</h3>
              <p class="card-text">
                Minimum 3 zespoły. Mecze rozgrywane każdy z każdym. Dwumecz jako
                opcja.
              </p>
              <router-link class="link-light btn btn-primary" to="/league">
                Zagraj
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card bg-secondary text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <i>x</i>
              </div>
              <h3 class="card-title mb-3">Puchar</h3>
              <p class="card-text">
                Minimum 4 zespoły. Mecze rozgrywane w formie drabinki. Dwumecz i
                mecz o trzecie miejsce jako opcje.
              </p>
              <router-link class="link-light btn btn-dark" to="/cup">
                Zagraj
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card bg-dark text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <i>x</i>
              </div>
              <h3 class="card-title mb-3">Grupa + Play-Off</h3>
              <p class="card-text">
                Minimum 6 zespołów. Mecze rozgrywane w dwóch grupach następnie
                faza pucharowa. Dwumecz i mecz o trzecie miejsce jako opcja.
              </p>
              <router-link
                class="link-light btn btn-primary"
                to="/group-playoff"
              >
                Zagraj
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.container a {
  text-decoration: none;
}
</style>
