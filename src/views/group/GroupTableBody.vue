<template>
  <tr :class="$emit('tableColors', index)">
    <td scope="row">{{ index + 1 }}</td>
    <td>{{ player.name }}</td>
    <td>{{ player.matches }}</td>
    <td>{{ player.wins }}</td>
    <td>{{ player.draws }}</td>
    <td>{{ player.lost }}</td>
    <td>{{ player.scoredGoals }}:{{ player.lostGoals }}</td>
    <td>{{ player.aggregateScore }}</td>
    <td class="fw-bold">{{ player.points }}</td>
  </tr>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import PlayerScores from "@/types/PlayerScores";
defineProps<{
  player: PlayerScores;
  index: number;
}>();

defineEmits<{
  tableColors: [index: number];
}>();
</script>
