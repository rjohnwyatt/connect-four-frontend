<template>
  <template v-for="(column, index) in board" :key="index">
    <div class="board-column">
      <GameBoardColumn :columnNumber="index"/>
    </div>
  </template>
    <div v-if="messageToPlayers">
      {{ messageToPlayers }}
    </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
import GameBoardColumn from "./GameBoardColumn.vue"

export default {
  setup() {
    const store = useStore()

    const board = computed(() => store.state.board) 
    const messageToPlayers = computed(() => store.state.messageToPlayers)

    return { 
      board,
      messageToPlayers,
    }
  },
  components: {
    GameBoardColumn
  }
}
</script>

<style>
.board-column {
  display: inline-block;
  width: 12%;
  height: 300px;
  background-color: #cff;
}
</style>
