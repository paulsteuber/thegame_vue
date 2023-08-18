<template>
  <div class="human-player bg-secondary">
    {{ player.cards }}
  </div>
</template>
<script lang="ts" setup>
import { PlayerBase } from "@/types/types";

interface HumanPlayerProps {
  player: PlayerBase;
}

defineProps<HumanPlayerProps>();
</script>
<style lang="scss" scoped>
.human-player {
}
</style>
