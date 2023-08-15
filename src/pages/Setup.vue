<template></template>
<script setup lang="ts">
import { useGameStore } from "@/store/gameStore";

const { setPlayers } = useGameStore();
setPlayers(3, 1);
</script>
