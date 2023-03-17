<template>
  <div class="board-square" :class="{ winningsquare: isWinningSquare }">
    <span >
      {{ valueInSquare}},
    </span>
  </div>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  props: ['squareNumber', 'columnNumber'],
  setup(props) {
    const store = useStore()

    const board = computed(() => store.state.board) 
    const column = computed(() => store.state.board[props.columnNumber])
    const valueInSquare = computed(() => column.value[6 - props.squareNumber] || 0) 
    const winningSquares = computed(() => store.state.winningSquares)
    const isWinningSquare = computed(() => {
      const squareId = `${props.columnNumber}-${6 - props.squareNumber}`
      console.log('squareId', squareId)
      console.log('winningSquares', winningSquares)
      if(winningSquares.value.includes(squareId)) {
        return true
      }

      return false
    })
    console.log('isWinningSquare', isWinningSquare)

    return { 
      board,
      valueInSquare,
      isWinningSquare,
    }
  },
}
</script>

<style>
.board-square {
  display: block;
  min-height: 17%;
  padding: 10px;
  border-width: 1px;
}
.winningsquare {
  background-color: blue;
  color: white;
}
</style>
