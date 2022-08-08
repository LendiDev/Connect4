import React from 'react';
import {StatusBar} from 'react-native';
import GamePlay from './components/GamePlay';

const App = () => {
  const statusBarStyle = 'dark-content';
  const backgroundStatusBarColor = '#fff';

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundStatusBarColor}
      />
      <GamePlay />
    </>
  );
};

export default App;
