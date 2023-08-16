<template></template>
<script setup lang="ts">
import { useGameStore } from "@/store/gameStore";

const { startGame } = useGameStore();
startGame(5);
</script>
