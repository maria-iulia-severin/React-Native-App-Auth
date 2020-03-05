import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import MainButton from '../components/UI/MainButton';
import Colors from '../constants/colors';
import TopHeader from '../components/UI/TopHeader';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/UI/MyHeaderButton';
const HomeScreen = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.header} >
        <TopHeader />
        <View style={styles.alignText}>
          <Text style={styles.styleTitle}>SENSIBLE</Text>
          <Text style={styles.styleSubTitle}>FINANCE MANAGEMENT APP</Text>
          <View style={styles.pacman}></View>
        </View>
      </View>
      <View style={styles.buttons}>
        <View style={styles.buttonCA}>
          <MainButton onPress={() => {
            props.navigation.replace({ routeName: 'InputOverview' });
          }}
          >VIEW INPUTS</MainButton>
        </View>

        <View style={styles.buttonL}>
          <MainButton onPress={() => {
            props.navigation.navigate({ routeName: 'AddInput' });
          }}
          >ADD INPUTS</MainButton>
        </View>
      </View>
    </View>
  );
};

HomeScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Home',
    // headerLeft: () =>
      
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //       <Item
    //         title="Menu"
    //         iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
    //         onPress={() => {
    //           navData.navigation.toggleDrawer();
    //         }}
    //       />
    //     </HeaderButtons>
    //   ,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    //justifyContent: "center",
    alignItems: 'center'
  },
  header: {
    backgroundColor: Colors.primary,
    width: '100%',
    height: '60%',
    alignItems: 'center'
    // marginBottom: 80
  },
  alignText: {
    justifyContent: 'center',
    alignItems: 'center',
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

export default HomeScreen;