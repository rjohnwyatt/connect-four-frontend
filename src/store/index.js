import { createStore } from "vuex";

export default createStore({
  state: {
    board: [[],[],[],[],[],[],[]],
    // board: [[1,],[1,],[2,],[2,1,],[2,],[1,],[1,]],
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

        if(winnerCheck.diagUpTest) {
          for (let x = 0; x<4; x++) {
            const stringToAdd = `${winnerCheck.diagUpTest.startPosition.colIndex + x}-${winnerCheck.diagUpTest.startPosition.sqIndex + x}`
            o.state.winningSquares.push(stringToAdd)  
          }
        }

        if(winnerCheck.vertTest) {
          for (let x = 0; x<4; x++) {
            const stringToAdd = `${winnerCheck.vertTest.startPosition.colIndex}-${winnerCheck.vertTest.startPosition.sqIndex + x}`
            o.state.winningSquares.push(stringToAdd)  
          }
        }

        if(winnerCheck.horizTest) {
          for (let x = 0; x<4; x++) {
            const stringToAdd = `${winnerCheck.horizTest.startPosition.colIndex + x}-${winnerCheck.horizTest.startPosition.sqIndex}`
            o.state.winningSquares.push(stringToAdd)  
          }
        }
      }

      const board = o.state.board;
      const checkForVerticalWinner = (colIndex, sqIndex) => {
        console.log('ran vert check')
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
        console.log('ran horiz check')
        if (colIndex > 3) {
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
        console.log('ran diag up check')
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
        console.log('ran diag down check')
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
      // this currently stops at the first square where we find a win
      // ideally would like to find all wins

      if (winnerCheck) {
        pushWinningSquares(winnerCheck)
      }

      return winnerCheck
    }
  },
  modules: {},
});
