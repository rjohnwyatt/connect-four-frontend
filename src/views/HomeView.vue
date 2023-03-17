<template>
  <div class="home">
    <div>Connect four rough board</div>
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
