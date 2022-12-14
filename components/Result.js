import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Result = props => {
  const {winner} = props;
  const winnerText =
    winner === 3 ? "It's a draw!" : 'Player ' + winner + ' is a winner!';
  return (
    <>
      <View style={styles.mainContainer} />
      <View style={styles.playerWinContainer}>
        <Text style={styles.playerWinText}>{winnerText}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 12,
    opacity: 0.6,
    backgroundColor: 'white',
  },
  playerWinContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    opacity: 1,
  },
  playerWinText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Result;
