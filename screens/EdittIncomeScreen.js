import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import HeaderButton from '../components/UI/MyHeaderButton';
import * as inputsActions from '../store/actions/incomes';
import Colors from '../constants/colors';
import ImagePicker from '../components/features/ImagePicker';
import LocationPicker from '../components/features/LocationPicker';
const EditIncomeScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  //i am getting saving the id in incId
  const incId = props.navigation.getParam('inputId');

  //we can get our eddited incomes using the reducer slices userIncomes and checking for 
  //the id being equal with the one that we get
  //if is null, it means we want to add a new income
  const editedInput = useSelector(state =>
    state.inputs.inputs.find(inc => inc.id === incId)
  );

  //if we have an id, we edit the income and we will have all the data in the inputs
  //if we don t have the id, we have an empty input
  const [nameVal, setName] = useState('');
  // const [nameIsValid, setNameIsValid] = useState(false);
  // const [imageURL, setImageURL] = useState(editedInput ? editedInput.imageURL : '');
  const [selectedLocation, setSelectedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  const imageTakenHandler = imagePath => {
    setSelectedImage(imagePath);
  };

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  //here i should have some changes for the validation part
  //this is validation only for the name

  const locationPickedHandler = useCallback(location => {
    setSelectedLocation(location);
  }, []);

  //code new
  const submitHandler = useCallback(async () => {
    if (!nameVal) {
      Alert.alert('Wrong input', 'Please check the errors', [{ text: 'okay' }])
      return;
    }
    setError(null);
    setIsLoading(true);
    dispatch(
      inputsActions.addInput(
        nameVal,
        selectedImage,
        selectedLocation,
       
        description,

      )
    );
    props.navigation.goBack();


    setIsLoading(false);
  }, [dispatch, incId, nameVal, selectedImage,selectedLocation, description]);


  //new

  //the good one 
  // const submitHandler = () => {
  //   dispatch(
  //     inputsActions.addInput(
  //       nameVal,
  //       selectedImage,
  //       // imageURL,
  //      +amount,
  //       description,
  //     )
  //   );
  //   props.navigation.goBack();
  // };
  //this is the good one


  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const nameChangeHandler = text => {
    if (text.trim().length === 0) {
      setName(false);
    } else {
      setName(true);
    }
    setName(text);
  };


  //spinner for loading 
  if (isLoading) {
    return (
      < View style={styles.centered} >
        <ActivityIndicator size='large' color={Colors.primary} />
      </View >
    );
  }

  return (
    <ScrollView>

      <View style={styles.form}>

        <View style={styles.formControl}>
          <Text style={styles.label}>Name</Text>

          <TextInput
            style={styles.input}
            value={nameVal}
            onChangeText={nameChangeHandler}
            keyboardType='default'
            autoCapitalize='sentences'
            autoCorrect
            returnKeyType='next'

          />
          {!nameVal && <Text>Please enter a valid text</Text>}
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <ImagePicker onImageTaken={imageTakenHandler} />
          <Text style={styles.label}>Location</Text>
          <LocationPicker
            navigation={props.navigation}
            onLocationPicked={locationPickedHandler}
          />
        </View>

        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
            returnKeyType='done'
          />
        </View>
      </View>

    </ScrollView>
  );
};

//submit button
EditIncomeScreen.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam('submit');
  return {
    //if our function is passed with the id, means that we are in edit, if not it means that we want to add a new income
    headerTitle: 'Add Input'
    ,
    headerRight: () =>
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Save"
          iconName={
            Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'
          }
          onPress={submitFn}
        />
      </HeaderButtons>

  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  formControl: {
    width: '100%'
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default EditIncomeScreen;
