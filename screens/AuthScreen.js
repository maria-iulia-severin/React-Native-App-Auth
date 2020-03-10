import { useDispatch } from 'react-redux';

import Input from '../components/UI/Input';
import Card from '../components/UI/Card';
import Colors from '../constants/colors';
import MainButton from '../components/UI/MainButton';
import TopHeader from '../components/UI/TopHeader';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useReducer, useCallback } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Image, Button, ScrollView, Alert } from "react-native"
import * as Google from 'expo-google-app-auth'
import * as Facebook from 'expo-facebook';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AuthScreen = props => {
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const signupHandler = () => {
    dispatch(
      authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      )
    );
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const [name, setName] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [nameFB, setNameFb] = useState('');
  const [photoUrlFB, setPhotoUrlFB] = useState('');

  const signInWithFacebook = useCallback(async () => {

    try {
      await Facebook.initializeAsync('492743158049972');
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile'],
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=name,picture`);
        //const userInfo= await response.json();
        //console.log(userInfo);
        const responseJSON = JSON.stringify(await response.json());
        //const pictureFB = JSON.stringify(await response.json().picture);
        console.log(responseJSON);
        var json = JSON.parse(responseJSON);
       
        // var regexName = /([A-Z])\w+/g;

        // var regexPicture = /([A-Z])\w+/g;

        // var newName = responseJSON.match(regexName).toString();
        // var str1 = newName.split(",");
        // for (var i = 0; i < str1.length; i++) {
        //   var str = str1[0] + " " + str1[1];
        // }

      //  console.log(str);
        return props.navigation.navigate('Home',
          {
            name: json.name,
            photoUrl: json.picture.data.url
          });
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }

  }, []);

  const signInWithGoogleAsync = useCallback(async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: "626861414228-bg07aadg0t02g39chp2mqfv675jtpnf4.apps.googleusercontent.com",
        iosClientId: '626861414228-795dluosc47g9u4m3836flcdukm1i2cg.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      if (result.type === 'success') {

        return props.navigation.navigate('Home',
          {
            name: result.user.name,
            photoUrl: result.user.photoUrl
          });
      }
      else {
        console.log("cancelled")
      }

    } catch (e) {
      console.log("error", e)
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#90EE90', '#31A231']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button
                title="Login"
                color={Colors.primary}
                onPress={signupHandler}
              />
            </View>
            <View style={styles.buttonGoogle}>
              <Button
                color='white'
                title="Sign in with Google"
                onPress={signInWithGoogleAsync}
              />
            </View>
            <View style={styles.buttonFacebook}>
              <Button
                color='white'
                title="Sign in with Facebook"
                onPress={signInWithFacebook}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};
AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  },
  buttonGoogle: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
    padding: 5,
    backgroundColor: '#DB4437'
  },
  buttonFacebook: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 4,
    padding: 5,
    backgroundColor: '#3B5998',
    marginTop: 5
  },
  screen: {
    flex: 1,
    //justifyContent: "center",
    // alignItems: 'center'
  },
  header: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '60%',
    alignItems: 'center'
    // marginBottom: 80
  },
  alignText: {
    // justifyContent: 'center',
    // alignItems: 'center',
    margin: '10%'
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
    // justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    marginTop: '30%',
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
    //I THINK HERE WE HAVE TO CHANGE, BECAUSE IS NOT REALLY RESPONSIVE WITH THE DIMENSION OF THE SCREEN
    marginTop: '29%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.6,
    elevation: 8 //this is for android shadow
  }
});

export default AuthScreen;