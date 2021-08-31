import React from 'react';
import { View, Text, Image, ScrollView, TextInput } from 'react-native';
import Router from './config/Naviagtion'
import { Provider } from 'react-redux';
import store from './redux/store/store'
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider as StoreProvider } from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Router />
      </PaperProvider>
    </Provider>
  );
}

export default App;