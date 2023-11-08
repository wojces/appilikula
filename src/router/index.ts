import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MatchView from "../views/MatchView.vue";
import LeagueForm from "@/views/league/LeagueForm.vue";
import LeagueList from "@/views/league/LeagueList.vue";
import LeagueTournament from "@/views/league/LeagueTournament.vue";
import CupForm from "@/views/cup/CupForm.vue";
import CupList from "@/views/cup/CupList.vue";
import CupTournament from "@/views/cup/CupTournament.vue";
import GroupPlayOffView from "@/views/groupPlayOff/GroupPlayOffView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/league",
    name: "league",
    component: LeagueForm,
  },
  {
    path: "/league/list",
    name: "leagueList",
    component: LeagueList,
  },
  {
    path: "/league/:id",
    name: "leagueTournament",
    component: LeagueTournament,
  },
  {
    path: "/cup",
    name: "cup",
    component: CupForm,
  },
  {
    path: "/cup/list",
    name: "cupList",
    component: CupList,
  },
  {
    path: "/cup/:id",
    name: "cupTorunament",
    component: CupTournament,
  },
  {
    path: "/group-playoff/:tournament?",
    name: "group-playoff",
    component: GroupPlayOffView,
  },
  {
    path: "/match",
    name: "match",
    component: MatchView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
