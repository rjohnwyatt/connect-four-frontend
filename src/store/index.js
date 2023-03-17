import { createStore } from "vuex";

export default createStore({
  state: {
    // board: [[],[],[],[],[],[],[]],
    board: [[1,],[1,],[2,],[2,1,],[2,],[1,],[1,]],
    player: 1,
    winner: false,
    messageToPlayers: '',
    winningSquares: [],
  },
  getters: {},
  mutations: {
    alternatePlayer(o) {
      o.player = o.player % 2 + 1
    },
    updateWinner(o, payload) {
      o.winner = payload
    },
    setMessageToPlayers(o, payload) {
      o.messageToPlayers = payload
    }
  },
  actions: {
    async checkForWinner(o) {
      const checkFourInARow = arrayOfFour => {
        const oneVTwoCheck = arrayOfFour[0] === arrayOfFour[1]
        const twoVThreeCheck = arrayOfFour[1] === arrayOfFour[2]
        const threeVFourCheck = arrayOfFour[2] === arrayOfFour[3]
        const notZeroCheck = arrayOfFour !== 0

        return oneVTwoCheck
          && twoVThreeCheck
          && threeVFourCheck
          && notZeroCheck 
      }

      const pushWinningSquares = (winnerCheck) => {
        if(winnerCheck.diagDownTest) {
          for (let x = 0; x<4; x++) {
            const stringToAdd = `${winnerCheck.diagDownTest.startPosition.colIndex + x}-${winnerCheck.diagDownTest.startPosition.sqIndex - x}`
            o.state.winningSquares.push(stringToAdd)  
          }
        }
      }

      const board = o.state.board;
      const checkForVerticalWinner = (colIndex, sqIndex) => {
        if (board[colIndex].length < 4 + sqIndex || sqIndex > 2) {
          return false;
        } 
        let testArray = []
        testArray.push(board[colIndex][sqIndex] || 0) 
        testArray.push(board[colIndex][sqIndex + 1] || 0) 
        testArray.push(board[colIndex][sqIndex + 2] || 0) 
        testArray.push(board[colIndex][sqIndex + 3] || 0)

        if (checkFourInARow(testArray)) {
          return {
            winner: true,
            startPosition: {
              sqIndex,
              colIndex,
            },
            direction: 'vertical'
          }
        }

        return false
      }
      const checkForHorizontalWinner = (colIndex, sqIndex) => {
        if (colIndex > 3) {
          console.log('false because colIndex > 2')
          return false;
        } 
        let testArray = []
        testArray.push(board[colIndex][sqIndex] || 0) 
        testArray.push(board[colIndex + 1][sqIndex] || 0) 
        testArray.push(board[colIndex + 2][sqIndex] || 0) 
        testArray.push(board[colIndex + 3][sqIndex] || 0)

        if (checkFourInARow(testArray)) {
          console.log('colIndex', colIndex, 'sqIndex', sqIndex)
          return {
            winner: true,
            startPosition: {
              sqIndex,
              colIndex,
            },
            direction: 'horizontal'
          }
        }

        return false
      }

      const checkForDiagonalUpWinner = (colIndex, sqIndex) => {
        if (colIndex > 3) {
          return false
        }
        if (board[colIndex+3].length < 4 + sqIndex || sqIndex > 2) {
          return false;
        } 
        let testArray = []
        testArray.push(board[colIndex][sqIndex] || 0) 
        testArray.push(board[colIndex + 1][sqIndex + 1] || 0) 
        testArray.push(board[colIndex + 2][sqIndex + 2] || 0) 
        testArray.push(board[colIndex + 3][sqIndex + 3] || 0)

        if (checkFourInARow(testArray)) {
          return {
            winner: true,
            startPosition: {
              sqIndex,
              colIndex,
            },
            direction: 'diagonalUp'
          }
        }

        return false
      }

      const checkForDiagonalDownWinner = (colIndex, sqIndex) => {
        if (colIndex > 3 || sqIndex < 3) {
          return false
        }
 
        if (board[colIndex].length < 4) {
          return false;
        } 
        let testArray = []
        testArray.push(board[colIndex][sqIndex] || 0) 
        testArray.push(board[colIndex + 1][sqIndex - 1] || 0) 
        testArray.push(board[colIndex + 2][sqIndex - 2] || 0) 
        testArray.push(board[colIndex + 3][sqIndex - 3] || 0)

        if (checkFourInARow(testArray)) {
          return {
            winner: true,
            startPosition: {
              sqIndex,
              colIndex,
            },
            direction: 'diagonalDown'
          }
        }

        return false
      }

      let winnerCheck = false
      board.forEach((col, index) => {
        const colIndex = index
        col.forEach((square, index) => {
          const squareIndex = index
          const vertTest = checkForVerticalWinner(colIndex, squareIndex)
          const horizTest = checkForHorizontalWinner(colIndex, squareIndex)
          const diagUpTest = checkForDiagonalUpWinner(colIndex, squareIndex)
          const diagDownTest = checkForDiagonalDownWinner(colIndex, squareIndex)
  
          const fourWayTest = vertTest 
            || horizTest 
            || diagUpTest 
            || diagDownTest
            
          if (fourWayTest) {
            winnerCheck = {
              fourWayTest,
              vertTest,
              horizTest,
              diagUpTest, 
              diagDownTest,
              colIndex,
              squareIndex,
            }  
          }
        })
      })  

      if (winnerCheck) {
        pushWinningSquares(winnerCheck)
      }

      return winnerCheck
    }
  },
  modules: {},
});
