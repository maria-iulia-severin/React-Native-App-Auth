import React from 'react';
import { StyleSheet, Text, View, Platform, Image } from 'react-native';

import Colors from '../constants/colors';
import MainButton from '../components/UI/MainButton';
import { LinearGradient } from 'expo-linear-gradient';
import * as Google from 'expo-google-app-auth'

const HomeScreen = props => {

  const name = props.navigation.getParam('name');
  const photoUrl = props.navigation.getParam('photoUrl');

  return (
    <View style={styles.screen}>
      <LinearGradient colors={['#0e8333', '#23e119']} style={styles.header} >


        <View style={styles.alignText}>
          <Text style={styles.styleTitle}>{name} </Text>
          <Image style={styles.image} source={{ uri: photoUrl }} />
        </View>
      </LinearGradient>
      <View style={styles.buttons}>
        <View style={styles.buttonCA}>
          <MainButton onPress={() => {
            props.navigation.replace({ routeName: 'InputOverview' });
          }}
          >VIEW INPUTS</MainButton>
        </View>

        <View style={styles.buttonL}>
          <MainButton onPress={() => {
            props.navigation.navigate({ routeName: 'EditInput' });
          }}
          >ADD INPUTS</MainButton>
        </View>
       
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Welcome',
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '60%',
    alignItems: 'center'
  },
  alignText: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: '20%'
  },
  styleTitle: {
    fontFamily: 'open-sans-bold',
    fontSize: 25,
    color: 'white'
  },
  styleSubTitle: {
    fontFamily: 'open-sans',
    fontSize: 13,
    color: 'black',
    marginTop: 9
  },
  buttons: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: '15%',
  },
  buttonCA: {
    width: '80%',
    marginBottom: '4%',
  },
  buttonL: {
    width: '80%',
  },
  pacman: {
    width: 0,
    height: 0,
    borderTopWidth: 80,
    borderTopColor: '#488349',
    borderLeftColor: '#488349',
    borderLeftWidth: 80,
    borderRightColor: 'white',
    borderRightWidth: 80,
    borderBottomColor: '#488349',
    borderBottomWidth: 80,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    borderBottomRightRadius: 80,
    borderBottomLeftRadius: 80,
    marginTop: '29%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    elevation: 8 //this is for android shadow
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
});

export default HomeScreen;