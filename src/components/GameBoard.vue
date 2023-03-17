<template>
  <div>
    Player {{player}}, you're up
  </div>
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
    const player = computed(() => store.state.player)

    return { 
      board,
      messageToPlayers,
      player,
    }
  },
  components: {
    GameBoardColumn
  }
}
</script>

<style>
.board-column {
  vertical-align: top;
  display: inline-block;
  width: 12%;
  height: 300px;
  background-color: #cff;
  /* border-style: solid; */
}
</style>
