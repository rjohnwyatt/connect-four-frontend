<template>
  <div class="home">
    <div>Connect four Rough Outline</div>
    <GameBoard />
  </div>
</template>

<script>
import GameBoard from "../components/GameBoard.vue";

export default {
  name: "HomeView",
  components: { GameBoard },
};
</script>
