<template>
  <section class="p-5">
    <div class="container">
      <div class="row text-center">
        <div class="league col-md">
          <div class="card h-100 bg-dark text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <i>x</i>
              </div>
              <h3 class="card-title mb-3">Liga</h3>
              <p class="card-text">
                Minimum 3 zespoły. Mecze rozgrywane każdy z każdym. Dwumecz jako
                opcja.<br /><br /><br />
              </p>
              <router-link class="link-light btn btn-primary" to="/league">
                Zagraj
              </router-link>
            </div>
          </div>
        </div>
        <div class="cup col-md">
          <div class="card h-100 bg-secondary text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <i>x</i>
              </div>
              <h3 class="card-title mb-3">Puchar</h3>
              <p class="card-text">
                Rozgrywka dla 4, 8 lub 16 zespołów. Mecze rozgrywane w formie
                drabinki.<br /><br /><br />
              </p>
              <router-link class="link-light btn btn-dark" to="/cup">
                Zagraj
              </router-link>
            </div>
          </div>
        </div>
        <div class="group col-md">
          <div class="card h-100 bg-dark text-light">
            <div class="card-body text-center">
              <div class="h1 mb-3">
                <i>x</i>
              </div>
              <h3 class="card-title mb-3">Grupa + Play-Off</h3>
              <p class="card-text">
                Minimum 6 zespołów. Mecze rozgrywane w dwóch lub czterech
                grupach następnie faza pucharowa. Dwumecz w grupie jako opcja.
              </p>
              <router-link
                class="link-light btn btn-primary"
                to="/group-play-off"
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
