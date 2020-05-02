/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { StatusBar } from 'react-native';

import Walkthrough from './components/Walkthrough';

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Walkthrough />
    </>
  );
};

export default App;
