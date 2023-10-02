<template>
  <nav class="navbar navbar-expand-lg bg-secondary fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <router-link class="link-dark link-opacity-50-hover" to="/"
          >Appilikula</router-link
        >
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <a class="nav-link"
              ><router-link class="link-dark link-opacity-25-hover" to="/league"
                >Liga</router-link
              ></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link"
              ><router-link class="link-dark link-opacity-25-hover" to="/cup"
                >Puchar</router-link
              ></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link"
              ><router-link
                class="link-dark link-opacity-25-hover"
                to="/group-playoff"
              >
                Grupa Play-Off
              </router-link></a
            >
          </li>
          <li class="nav-item">
            <a class="nav-link"
              ><router-link class="link-dark link-opacity-25-hover" to="/match">
                Mecz
              </router-link></a
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <section class="p-5">
    <div class="container"><router-view /></div>
  </section>
</template>

<script setup></script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  a {
    text-decoration: none;
  }
}
</style>
