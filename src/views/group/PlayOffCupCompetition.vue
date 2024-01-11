<template>
  <div class="player-names col-2">
    <div class="row my-3">
      {{ match.player_a }}
    </div>
    <div class="row my-3">
      {{ match.player_b }}
    </div>
  </div>
  <div class="score-inputs col-3">
    <div class="row my-1">
      <input
        :id="match.player_a"
        type="number"
        min="0"
        max="99"
        class="form-control text-center"
        :class="invalidResultPlayerA(level)"
        @blur="$emit('clearPlayerAResultValidation', index)"
        v-model="resultA"
        :disabled="match.is_played"
        required
      />
    </div>
    <div class="row my-1">
      <input
        :id="match.player_b"
        type="number"
        min="0"
        max="99"
        class="form-control text-center"
        :class="invalidResultPlayerB(level)"
        @blur="$emit('clearPlayerBResultValidation', index)"
        v-model="resultB"
        :disabled="match.is_played"
        required
      />
    </div>
  </div>
  <div class="buttons col-1">
    <div class="row my-2">
      <div v-if="isCompleted"></div>
      <button
        v-else-if="match.is_played"
        class="btn btn-outline-secondary btn-sm d-flex justify-content-center"
        @click="$emit('restoreMatch', index)"
      >
        ←
      </button>
      <button
        v-else
        type="submit"
        class="btn btn-outline-success btn-sm d-flex justify-content-center"
        @click.prevent="$emit('updateMatch', index)"
      >
        ✓
      </button>
    </div>
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
  level: string;
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
  if (level === "quarterFinal" && !props.playerAResultIsValid)
    return "border border-danger";
  else if (level === "semiFinal" && !props.playerAResultIsValid)
    return "border border-danger";
  else if (level === "final" && !props.playerAResultIsValid)
    return "border border-danger";
  else return "";
}

function invalidResultPlayerB(level: string): string {
  if (level === "quarterFinal" && !props.playerBResultIsValid)
    return "border border-danger";
  else if (level === "semiFinal" && !props.playerBResultIsValid)
    return "border border-danger";
  else if (level === "final" && !props.playerBResultIsValid)
    return "border border-danger";
  else return "";
}
</script>
