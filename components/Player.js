import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Player = props => {
  const {isGameOver, playerName, playerNumber, isPlaying} = props;
  const gameOverText = isGameOver
    ? 'Game Over'
    : isPlaying
    ? playerName + ' turn'
    : 'Start the game';

  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        <Text
          style={styles.playerNameText}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          {gameOverText}
        </Text>
      </View>

      <View style={[styles.row, {justifyContent: 'center'}]}>
        <View style={styles.column}>
          {isPlaying ? (
            isGameOver ? null : (
              <View
                style={[
                  styles.chips,
                  {backgroundColor: playerNumber === 1 ? 'yellow' : 'red'},
                ]}></View>
            )
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 75,
    paddingBottom: 20,
    justifyContent: 'space-between',
  },
  row: {
    flex: 1,
  },
  column: {
    flexDirection: 'row',
  },
  playerNameText: {
    fontSize: 28,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  chipsText: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  chips: {
    backgroundColor: 'yellow',
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
  },
});

export default Player;
