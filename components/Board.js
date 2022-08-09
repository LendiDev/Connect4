import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

import {Coin, Result} from './InitComponents';

const Board = props => {
  const {grid, winner} = props;
  const [coinSize, setCoinSize] = useState(null);

  return (
    <View
      style={[
        styles.mainContainer,
        {
          height:
            Dimensions.get('window').width - Dimensions.get('window').width / 7,
        },
      ]}
      onLayout={event => {
        let {width, height} = event.nativeEvent.layout;
        console.log(width, height);
        setCoinSize((width + height - 100) / 2 / 7);
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
      {winner > 0 ? <Result winner={winner} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: 350,
    backgroundColor: '#0096FF',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    elevation: 10,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Board;
