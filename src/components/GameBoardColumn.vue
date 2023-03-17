<template>
  <template v-for="item of 6" :key="item">
    <div @click="addPiece" >
      <GameBoardSquare :squareNumber="item" :columnNumber="columnNumber"/>
    </div>
  </template>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
import GameBoardSquare from "./GameBoardSquare.vue"

export default {
  props: ["columnNumber"],
  setup(props) {
    const store = useStore()

    const board = computed(() => store.state.board) 
    const column = computed(() => store.state.board[props.columnNumber])
    const player = computed(() => store.state.player)
    const winner = computed(() => store.state.winner)

    const addPiece = async () => {
      if (!winner.value) {
        if (column.value.length < 6) {
          column.value.push(player.value)
          const winnerTest = await store.dispatch('checkForWinner')
          store.commit('updateWinner', winnerTest)
          store.commit('alternatePlayer')
        } else {
          store.commit('setMessageToPlayers', 'that column is full')
        }
      }

    }

    return { 
      board,
      column,
      addPiece,
    }
  },
  components: {
    GameBoardSquare
  },
}
</script>

<style>

</style>
