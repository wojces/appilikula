<template>
  <div class="container">
    <div class="row text-center mt-5">
      <div class="league col-md">
        <div class="card h-100 bg-dark text-light">
          <div class="card-body">
            <h3 class="card-title">Liga</h3>
            <p class="card-text">
              Minimum 3 zespoły. Mecze rozgrywane każdy z każdym. Dwumecz jako
              opcja.
            </p>
            <router-link class="btn btn-primary" to="/league">
              Zagraj
            </router-link>
          </div>
        </div>
      </div>
      <div class="cup col-md">
        <div class="card h-100 bg-secondary text-light">
          <div class="card-body">
            <h3 class="card-title">Puchar</h3>
            <p class="card-text">
              Rozgrywka dla 4, 8 lub 16 zespołów. Mecze rozgrywane w formie
              drabinki.
            </p>
            <router-link class="btn btn-dark" to="/cup"> Zagraj </router-link>
          </div>
        </div>
      </div>
      <div class="group col-md">
        <div class="card h-100 bg-dark text-light">
          <div class="card-body">
            <h3 class="card-title">Grupa + Play-Off</h3>
            <p class="card-text">
              Minimum 6 zespołów. Mecze rozgrywane w dwóch lub czterech grupach,
              następnie faza pucharowa. Dwumecz w grupie jako opcja.
            </p>
            <router-link class="btn btn-primary" to="/group-play-off">
              Zagraj
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.card-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.card-title {
  margin-bottom: 20px;
}

.card-text {
  margin-bottom: 20px;
  text-align: center;
}
</style>
