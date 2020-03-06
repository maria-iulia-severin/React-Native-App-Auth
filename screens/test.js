import React from "react"
import { StyleSheet, Text, View, Image, Button } from "react-native"
import  * as Google from 'expo-google-app-auth'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    }
  }
  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "626861414228-bg07aadg0t02g39chp2mqfv675jtpnf4.apps.googleusercontent.com",
        iosClientId: '626861414228-795dluosc47g9u4m3836flcdukm1i2cg.apps.googleusercontent.com',  
        scopes: ["profile", "email"]
      })

      if (result.type === "success") {
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        })
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.signedIn ? (
          <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
        ) : (
          <LoginPage signIn={this.signIn} />
        )}
      </View>
    )
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  )
}

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
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
  }
})
// import { useDispatch } from 'react-redux';

// import Input from '../components/UI/Input';
// import Card from '../components/UI/Card';
// import Colors from '../constants/colors';
// import MainButton from '../components/UI/MainButton';
// import TopHeader from '../components/UI/TopHeader';
// import { LinearGradient } from 'expo-linear-gradient';
// import React, { useState, useReducer, useCallback } from 'react';
// import {   KeyboardAvoidingView,StyleSheet, Text, View, Image, Button,ScrollView} from "react-native"
// import  * as Google from 'expo-google-app-auth'
// const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

// const formReducer = (state, action) => {
//   if (action.type === FORM_INPUT_UPDATE) {
//     const updatedValues = {
//       ...state.inputValues,
//       [action.input]: action.value
//     };
//     const updatedValidities = {
//       ...state.inputValidities,
//       [action.input]: action.isValid
//     };
//     let updatedFormIsValid = true;
//     for (const key in updatedValidities) {
//       updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
//     }
//     return {
//       formIsValid: updatedFormIsValid,
//       inputValidities: updatedValidities,
//       inputValues: updatedValues
//     };
//   }
//   return state;
// };

// export default class App extends React.Component {

  
//   constructor(props) {
//     super(props)
//     this.state = {
//       signedIn: false,
//       name: "",
//       photoUrl: ""
//     }

//   }
  
//   signIn = async () => {
//     try {
      
//       const result = await Google.logInAsync({
//         androidClientId:
//           "626861414228-bg07aadg0t02g39chp2mqfv675jtpnf4.apps.googleusercontent.com",
//         iosClientId: '626861414228-795dluosc47g9u4m3836flcdukm1i2cg.apps.googleusercontent.com',  
//         scopes: ["profile", "email"]
//       })

//       if (result.type === "success") {
//         this.setState({
//           signedIn: true,
//           name: result.user.name,
//           photoUrl: result.user.photoUrl
//         })
//       } else {
//         console.log("cancelled")
//       }
//     } catch (e) {
//       console.log("error", e)
//     }
//   }
 

//   render() {
//     return (

     
//       <View style={styles.container}>
//         {this.state.signedIn ? (
//           <LoggedInPage name={this.state.name} photoUrl={this.state.photoUrl} />
//         ) : (
//           <LoginPage signIn={this.signIn} />
//         )}


//       </View>



//     )
//   }
// }

// const LoginPage = props => {

//   return (
//       <KeyboardAvoidingView
//       behavior="padding"
//       keyboardVerticalOffset={50}
//       style={styles.screen}
//     >
//       <LinearGradient colors={['#90EE90', '#31A231']} style={styles.gradient}>
   
//         <Card style={styles.authContainer}>
//           <ScrollView>
//             <Input
//               id="email"
//               label="E-Mail"
//               keyboardType="email-address"
//               required
//               email
//               autoCapitalize="none"
//               errorText="Please enter a valid email address."
//               onInputChange={()=>{}}
//               initialValue=""
//             />
//             <Input
//               id="password"
//               label="Password"
//               keyboardType="default"
//               secureTextEntry
//               required
//               minLength={5}
//               autoCapitalize="none"
//               errorText="Please enter a valid password."
//               onInputChange={()=>{}}
//               initialValue=""
//             />
//             <View style={styles.buttonContainer}>
//               <Button
//                 title="Sign in with Google"
//                 color={Colors.primary}
//                 onPress={() => props.signIn()}
//               />
//             </View>
//             <View style={styles.buttonContainer}>
//               <Button
//                 title="Switch to Sign Up"
//                 color='#137B13'
//                 onPress={()=>props.openSignup()}
                
//               />
//             </View>
//           </ScrollView>
//         </Card>
      
//       </LinearGradient>
//     </KeyboardAvoidingView>
  
//   )
// }

// const LoggedInPage = props => {

//   const [isSignup, setIsSignup] = useState(false);
//   return (
//     <View style={styles.screen}>
//     <View style={styles.header} >
//       <TopHeader />
//       <View style={styles.alignText}>
//       <Text style={styles.styleTitle}>Welcome {props.name}</Text>
//       <Image style={styles.image} source={{ uri: props.photoUrl }} />
//         <View style={styles.pacman}></View>


//       </View>
//     </View>
//     <View style={styles.buttons}>
//       <View style={styles.buttonCA}>
//         <MainButton   onPress={() => {
//           props.navigation.navigate({ routeName: 'InputOverview' });
//         }}
//         >VIEW INPUTS</MainButton>
//       </View>

//       <View style={styles.buttonL}>
//         <MainButton onPress={() => {
//           props.navigation.navigate({ routeName: 'Auth' });
//         }}
//         >Auth INPUTS</MainButton>
//       </View>
//     </View>
//   </View>
   
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   header: {
//     fontSize: 25
//   },
//   image: {
//     marginTop: 15,
//     width: 150,
//     height: 150,
//     borderColor: "rgba(0,0,0,0.2)",
//     borderWidth: 3,
//     borderRadius: 150
//   },
//   gradient: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center'
//   },
//   authContainer: {
//     width: '80%',
//     maxWidth: 400,
//     maxHeight: 400,
//     padding: 20
//   },
//   buttonContainer: {
//     marginTop: 10
//   },
//   screen: {
//     flex: 1,
//     //justifyContent: "center",
//    // alignItems: 'center'
//   },
//   header: {
//     backgroundColor: Colors.primary,
//     width: '100%',
//     height: '60%',
//     alignItems: 'center'
//     // marginBottom: 80
//   },
//   alignText: {
//    // justifyContent: 'center',
//    // alignItems: 'center',
//     margin: '10%'
//   },
//   styleTitle: {
//     fontFamily: 'open-sans-bold',
//     fontSize: 25,
//     color: 'white'
//   },
//   styleSubTitle: {
//     fontFamily: 'open-sans',
//     fontSize: 13,
//     color: 'black',
//     marginTop: 9
//   },
//   buttons: {
//     flex: 1,
//     // justifyContent: 'center',
//     width: '100%',
//     alignItems: 'center',
//     marginTop: '30%',
//   },
//   buttonCA: {
//     width: '80%',
//     marginBottom: '4%',
//   },
//   buttonL: {
//     width: '80%',
//   },
//   pacman: {
//     width: 0,
//     height: 0,
//     borderTopWidth: 80,
//     borderTopColor: '#488349',
//     borderLeftColor: '#488349',
//     borderLeftWidth: 80,
//     borderRightColor: 'white',
//     borderRightWidth: 80,
//     borderBottomColor: '#488349',
//     borderBottomWidth: 80,
//     borderTopLeftRadius: 80,
//     borderTopRightRadius: 80,
//     borderBottomRightRadius: 80,
//     borderBottomLeftRadius: 80,
//     //I THINK HERE WE HAVE TO CHANGE, BECAUSE IS NOT REALLY RESPONSIVE WITH THE DIMENSION OF THE SCREEN
//     marginTop: '29%',
//     shadowColor: 'black',
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 6,
//     shadowOpacity: 0.6,
//     elevation: 8 //this is for android shadow
//   }
// })