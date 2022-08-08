import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Player = props => {
  const {yourTurn, playerName, chips, playerNumber} = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.row}>
        <Text
          style={styles.playerNameText}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          {playerName}
        </Text>
      </View>
      <View style={[styles.row, {justifyContent: 'center'}]}>
        <Text
          style={[styles.playerNameText, {fontSize: 30}]}
          numberOfLines={1}
          adjustsFontSizeToFit={true}>
          {yourTurn ? 'Your Turn' : null}
        </Text>
      </View>
      <View style={[styles.row, {justifyContent: 'flex-end'}]}>
        <View style={styles.column}>
          <View
            style={[
              styles.chips,
              {backgroundColor: playerNumber === 1 ? 'yellow' : 'red'},
            ]}></View>
          <Text
            style={styles.chipsText}
            numberOfLines={1}
            adjustsFontSizeToFit={true}>
            {chips}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 80,
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
