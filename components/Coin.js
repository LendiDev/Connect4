import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';

const Coin = props => {
  const {coinType, coinSize} = props;

  const coinColors = ['white', 'yellow', 'red'];

  return (
    <View style={styles.mainContainer}>
      <View
        style={[
          styles.coin,
          {
            width: coinSize,
            height: coinSize,
            borderRadius: coinSize / 2,
            backgroundColor: coinColors[coinType],
          },
        ]}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    margin: 5,
    flexDirection: 'column',
    alignItems: 'center',
  },
  coin: {
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default Coin;
