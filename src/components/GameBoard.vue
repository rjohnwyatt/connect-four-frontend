<template>
  <template v-for="column in board">
    {{ column }}
  </template>
</template>

<script>
import { computed } from "vue"
import { useStore } from "vuex"
export default {
  setup() {
    const store = useStore()

    const board = computed(() => store.state.board) 

    return { board }
  }
}
</script>

<style></style>
