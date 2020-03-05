import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore, combineReducers , applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { useScreens } from 'react-native-screens';
import ReduxThunk from 'redux-thunk';
import SensibleNavigator from '../React-Native-App/navigation/SensibleNavigator';
import {init} from '../React-Native-App/helpers/db';
import inputReducer from '../React-Native-App/store/reducers/incomes';


init().then(()=>{
  console.log('Init db');
})
.catch(err=>{
  console.log('Init db failed');
  console.log(err);
});



//this is how I can actually pass and access the data from the incomesReducer 
//and also I can combine more than one
const rootReducer = combineReducers({
  inputs: inputReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
//useScreens();

//fetching the Fonts
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  //waiting first for the Fonts to be renderd and after we can see the screen
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <Provider store={store}>
      <SensibleNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({

});
