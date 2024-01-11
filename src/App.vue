<template>
  <nav class="navbar navbar-expand-lg bg-secondary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">
        <router-link class="link-dark link-opacity-50-hover" to="/">
          Appilikula
        </router-link>
      </a>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navmenu"
        aria-cotrols="navmenu"
        aria-expanded="true"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navmenu">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Liga
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/league">Zagraj</a></li>
              <li>
                <a class="dropdown-item" href="/league/list">Lista</a>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Puchar
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="/cup">Zagraj</a></li>
              <li>
                <a class="dropdown-item" href="/cup/list">Lista</a>
              </li>
            </ul>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Grupa + Play-Off
            </a>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item" href="/group-play-off">Zagraj</a>
              </li>
              <li>
                <a class="dropdown-item" href="/group-play-off/list">Lista</a>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled">Wyloguj</a>
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
