import React, {useState, useEffect} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';

import {Player, Board, Result} from './InitComponents';

const GamePlay = () => {
  const [grid, setGrid] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(0);
  const [playerNames, setPlayerNames] = useState({
    player1: 'Player 1',
    player2: 'Player 2',
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [winner, setWinner] = useState(0);

  const [chips, setChips] = useState([21, 21]);

  const generateGrid = () => {
    const rows = 6;
    const columns = 7;
    const tempGrid = [];

    for (var row = 0; row < rows; row++) {
      const tempColumns = [];
      for (var column = 0; column < columns; column++) {
        tempColumns.push(0);
      }
      tempGrid.push(tempColumns);
    }
    setGrid(tempGrid);
  };

  const makeMove = (_, column) => {
    if (isGameOver) {
      return;
    }

    if (!isPlaying) {
      startGame();
    }

    const columnArray = [];
    grid.map((_, index) => {
      columnArray.push(grid[index][column]);
    });

    // check that column has a free space
    if (!columnArray.includes(0)) {
      // ignore - there is no there to place chips
    } else {
      // try to put chip in column
      for (var i = columnArray.length - 1; i >= 0; i--) {
        if (columnArray[i] === 0) {
          const newGrid = [...grid];
          newGrid[i][column] = playerTurn;
          setGrid(newGrid);
          reduceChips();
          swapPlayerTurn();
          break;
        }
      }
    }
    checkWinner();
  };

  const checkWinner = () => {
    var columnArray = [];
    grid.map((_, index) => {
      columnArray.push(grid[index][0]);
    });

    // create array of columns
    var columnsArray = [];
    for (var i = 0; i < grid.length; i++) {
      var _columnArray = [];
      grid.map((_, index) => {
        _columnArray.push(grid[index][i]);
      });
      columnsArray.push(_columnArray);
    }

    // check if there is 4 in a row by columns
    checkFourInRow(columnsArray);
    // check if there is 4 in a row by rows
    checkFourInRow(grid);
    // check if there is 4 in a row by diagonals
    diagonalCheck();
  };

  const checkFourInRow = array => {
    array.map(_array => {
      var player = 0;
      var inRow = 0;
      _array.map(playerChips => {
        if (playerChips !== player && playerChips !== 0) {
          player = playerChips;
          inRow = 1;
        } else if (playerChips !== 0) {
          player = playerChips;
          inRow++;
          console.log(inRow);
          if (inRow >= 4) {
            setIsGameOver(true);
            setWinner(player);
            return;
          }
        } else if (playerChips === 0) {
          player = playerChips;
          inRow = 0;
        }
      });
    });
  };

  const diagonalCheck = () => {
    var diagonalArrays = [];

    grid.map((rowArray, i) => {
      for (var j = 0; j < rowArray.length; j++) {
        if (i === 0 || j === 0) {
          const tempArray = [];
          const tempArray2 = [];

          for (var index = 0; index < grid.length; index++) {
            // left diagonal arrays
            const leftX = i + index;
            const leftY = j + index;
            if (leftX < grid.length && leftY < rowArray.length) {
              tempArray.push(grid[leftX][leftY]);
            }

            // right diagonal arrays
            const rightX = index + i;
            const rightY = j - index;
            if (
              rightX >= 0 &&
              rightY >= 0 &&
              rightX < grid.length &&
              rightY < rowArray.length
            ) {
              tempArray2.push(grid[rightX][rightY]);
            }
          }
          diagonalArrays.push(tempArray);
          diagonalArrays.push(tempArray2);
        }
      }
    });

    diagonalArrays = diagonalArrays.filter(rowArray => rowArray.length > 3);
    checkFourInRow(diagonalArrays);
  };

  const reduceChips = () => {
    if (isPlaying) {
      if (playerTurn === 1) {
        setChips([chips[0] - 1, chips[1]]);
      } else {
        setChips([chips[0], chips[1] - 1]);
      }
    }
  };

  const swapPlayerTurn = () => {
    if (playerTurn === 1) {
      setPlayerTurn(2);
    } else {
      setPlayerTurn(1);
    }
  };

  const resetGame = () => {
    setChips([21, 21]);
    setPlayerTurn(0);
    setIsPlaying(false);
    setIsGameOver(false);
    setWinner(0);
    generateGrid();
  };

  const startGame = () => {
    selectFirstPlayer();
    setWinner(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  const selectFirstPlayer = () => {
    const random = Math.floor(Math.random() * (3 - 1) + 1);
    setPlayerTurn(random);
  };

  const onColumnPressedHandled = (row, column) => {
    makeMove(row, column);
  };

  useEffect(() => {
    generateGrid();
  }, []); // run only once on init

  return (
    <View style={styles.mainContainer}>
      <Player
        playerName={
          playerTurn === 1 ? playerNames.player1 : playerNames.player2
        }
        chips={chips[0]}
        isPlaying={isPlaying}
        playerNumber={playerTurn}
        isGameOver={isGameOver}
      />
      <Board
        winner={winner}
        grid={grid ? grid : []}
        onColumnPressedHandled={(i, j) => onColumnPressedHandled(i, j)}
      />
      <View style={styles.controlsView}>
        <TouchableOpacity
          onPress={() => startGame()}
          disabled={isPlaying ? true : false}>
          <View
            style={[
              styles.button,
              {backgroundColor: isPlaying ? '#dcddde' : '#0096FF'},
            ]}>
            <Text style={styles.buttonText}>Start</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => resetGame()}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Reset</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  button: {
    width: 100,
    height: 45,
    backgroundColor: '#0096FF',
    borderRadius: 25,
    justifyContent: 'center',
    margin: 5,
  },
  buttonText: {textAlign: 'center', fontSize: 20, color: 'white'},
  controlsView: {
    flex: 2,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GamePlay;
