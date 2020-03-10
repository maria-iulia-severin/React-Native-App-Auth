import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';

const MainButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <LinearGradient  colors={['#23e119','#0e8333']} style={styles.button}>
     
        <Text style={styles.buttonText}>{props.children}</Text>
        </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'open-sans'

    
  }
});

export default MainButton;
