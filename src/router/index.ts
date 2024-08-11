import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddLeague from "@/views/league/AddLeague.vue";
import LeagueList from "@/views/league/LeagueList.vue";
import LeagueTournament from "@/views/league/LeagueTournament.vue";
import AddCup from "@/views/cup/AddCup.vue";
import CupList from "@/views/cup/CupList.vue";
import CupTournament from "@/views/cup/CupTournament.vue";
import AddGroup from "@/views/group/AddGroup.vue";
import GroupList from "@/views/group/GroupList.vue";
import GroupTournament from "@/views/group/GroupTournament.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/league",
    name: "league",
    component: AddLeague,
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
    component: AddCup,
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
    path: "/group-play-off",
    name: "group",
    component: AddGroup,
  },
  {
    path: "/group-play-off/list",
    name: "groupList",
    component: GroupList,
  },
  {
    path: "/group-play-off/:id",
    name: "groupTournament",
    component: GroupTournament,
  },
];

const router = createRouter({
  history: createWebHistory("/appilikula/"),
  // history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
