<template>
  <div class="board-square" :class="{ winningsquare: isWinningSquare }">
    <span v-if="valueInSquare" :class="{ blackcircle: valueInSquare===1, redcircle: valueInSquare===2}">
      <!-- {{ valueInSquare}} -->
      X
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
      if(winningSquares.value.includes(squareId)) {
        return true
      }

      return false
    })

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
  min-height: 30px;
  height: 17%;
  padding: 10px;
  border-width: 1px;
  border-style: dashed solid;
}
.winningsquare {
  background-color: blue;
  color: white;
}
.blackcircle {
  background-color: black;
  border-radius: 15px;
  color: black;
}
.redcircle {
  background-color: red;
  color: red;
  border-radius: 15px;
}
</style>
