import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';
import Colors from '../constants/colors';

import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

//importing all the screens
import IncomeOverviewScreen from '../screens/IncomeOverviewScreen';
import IncomeDetailScreen from '../screens/IncomeDetailScreen';
import EditIncomeScreen from '../screens/EdittIncomeScreen';
import HomeScreen from '../screens/HomeScreen';
import MapScreen from '../screens/MapScreen';
import AuthScreen from '../screens/Auth';
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold',
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
};


const InputsNavigator = createStackNavigator(
  {
    //the first screen written here is always the first screen that we see
    Home: HomeScreen,
    InputOverview: IncomeOverviewScreen,
    InputDetail: IncomeDetailScreen,
    AddInput: EditIncomeScreen,
    Map: MapScreen,
    Auth: AuthScreen

  },
  {
    navigationOptions:
    {
      drawerIcon: drawerConfig =>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
    },
    //styleing the default header using Platform from react-native which helps us 
    //to choose something for Android and something else for IOS
    defaultNavigationOptions: defaultNavOptions
  }
);

// const ExpensesNavigator = createStackNavigator(
//   {
//     //the first screen written here is always the first screen that we see
//     ExpenseOverview: ExpenseOverviewScreen,
//     //these are all the screens where we can go from the first screen
//     ExpenseDetail: ExpenseDetailScreen,
//     EditExpense: EditExpenseScreen
//   },
//   {
//     navigationOptions:
//     {
//       drawerIcon: drawerConfig =>
//         <Ionicons
//           name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//           size={23}
//           color={drawerConfig.activeTintColor}
//         />
//     },
//     //styleing the default header using Platform from react-native which helps us 
//     //to choose something for Android and something else for IOS
//     defaultNavigationOptions: defaultNavOptions
//   }
// );

//the title from the default header
// IncomeOverviewScreen.navigationOptions = {
//   headerTitle: 'All incomes'
// };

//i have to change here - this is the menu
const AddInputNavigator = createStackNavigator(
  {
    AddInput: EditIncomeScreen
  },
  {
    navigationOptions:
    {
      drawerIcon: drawerConfig =>
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.activeTintColor}
        />
    },
    //styleing the default header using Platform from react-native which helps us 
    //to choose something for Android and something else for IOS
    defaultNavigationOptions: defaultNavOptions
  }
);

//combining those 2 stack navigators in a drawer
const SensibleNavigator = createDrawerNavigator(
  {
    Inputs: InputsNavigator,
    Add: AddInputNavigator
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }
  }
);

export default createAppContainer(SensibleNavigator);