import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

import {Coin} from './InitComponents';

const Board = props => {
  const {grid} = props;
  const [coinSize, setCoinSize] = useState(null);

  return (
    <View
      style={styles.mainContainer}
      onLayout={event => {
        let {width, height} = event.nativeEvent.layout;
        setCoinSize((width + height - 75) / 2 / 7);
      }}>
      {grid.map((row, i) => {
        return (
          <View key={'row' + i} style={styles.row}>
            {row.map((column, j) => {
              return (
                <TouchableWithoutFeedback
                  key={'button' + j}
                  onPress={() => props.onColumnPressedHandled(i, j)}>
                  <View>
                    <Coin
                      key={'column' + j}
                      coinType={column}
                      coinSize={coinSize}
                    />
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 2,
    backgroundColor: '#0096FF',
    borderRadius: 12,
    marginVertical: 10,
    padding: 5,
    shadowColor: '#000',
    elevation: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default Board;
