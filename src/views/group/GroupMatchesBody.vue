<template>
  <div class="col-1">{{ index + 1 }}</div>
  <div class="col-3">{{ match.player_a }}</div>
  <div class="col-2">
    <input
      type="number"
      min="0"
      max="99"
      class="form-control"
      :class="invalidResultPlayerA(group)"
      @blur="$emit('clearPlayerAResultValidation', index)"
      v-model="resultA"
      :disabled="match.is_played"
      required
    />
  </div>
  <div class="col-3">{{ match.player_b }}</div>
  <div class="col-2">
    <input
      type="number"
      min="0"
      max="99"
      class="form-control"
      :class="invalidResultPlayerB(group)"
      @blur="$emit('clearPlayerBResultValidation', index)"
      v-model="resultB"
      :disabled="match.is_played"
      required
    />
  </div>
  <div class="col-1">
    <div v-if="isCompleted"></div>
    <button
      v-else-if="match.is_played"
      class="btn btn-outline-secondary btn-sm"
      @click="$emit('restoreMatch', index)"
    >
      ←
    </button>
    <button
      v-else
      type="submit"
      class="btn btn-outline-success btn-sm"
      @click.prevent="$emit('updateMatch', index)"
    >
      ✓
    </button>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import SingleMatch from "@/types/Match";

const props = defineProps<{
  match: SingleMatch;
  isCompleted: boolean;
  index: number;
  resultA: number;
  resultB: number;
  group: string;
  playerAResultIsValid: boolean;
  playerBResultIsValid: boolean;
}>();

const emit = defineEmits<{
  updateMatch: [index: number];
  restoreMatch: [index: number];
  clearPlayerAResultValidation: [index: number];
  clearPlayerBResultValidation: [index: number];
  "update:resultA": [result: number];
  "update:resultB": [result: number];
}>();

const resultA = computed<number>({
  get() {
    return props.resultA;
  },
  set(result: number) {
    emit("update:resultA", result);
  },
});
const resultB = computed<number>({
  get() {
    return props.resultB;
  },
  set(result: number) {
    emit("update:resultB", result);
  },
});
function invalidResultPlayerA(level: string): string {
  if (level === "group1" && !props.playerAResultIsValid)
    return "border border-danger";
  else if (level === "group2" && !props.playerAResultIsValid)
    return "border border-danger";
  else if (level === "group3" && !props.playerAResultIsValid)
    return "border border-danger";
  else if (level === "group4" && !props.playerAResultIsValid)
    return "border border-danger";
  else return "";
}

function invalidResultPlayerB(level: string): string {
  if (level === "group1" && !props.playerBResultIsValid)
    return "border border-danger";
  else if (level === "group2" && !props.playerBResultIsValid)
    return "border border-danger";
  else if (level === "group3" && !props.playerBResultIsValid)
    return "border border-danger";
  else if (level === "group4" && !props.playerBResultIsValid)
    return "border border-danger";
  else return "";
}
</script>
