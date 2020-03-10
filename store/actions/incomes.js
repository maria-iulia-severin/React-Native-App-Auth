import * as FileSystem from 'expo-file-system';
import { fetchInputs,deleteInput } from '../../helpers/db';
import getTextFromImage from "../../components/features/GetTextFromImage";
import ENV from '../../env';
export const ADD_INPUT = 'ADD_INPUT';
export const SET_INPUTS = 'SET_INPUTS';
export const DELETE_INPUT = 'DELETE_INPUT';
export const addInput = (name, imageURL, location, description) => {

  return async () => {
    //geolocation for converting the lat and lng in an address
    //seding the http request and waiting for the answare

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${
      location.lat
      },${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const resData = await response.json();
    if (!resData.results) {
      throw new Error('Something went wrong!');
    }

    const address = resData.results[0].formatted_address;
    const lat=location.lat;
    const lng=location.lng;
    //moving the picture
    const fileName = imageURL.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
      await FileSystem.moveAsync({
        from: imageURL,
        to: newPath
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadInputs = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchInputs();
      console.log(dbResult);
      dispatch({ type: SET_INPUTS, inputs: dbResult.rows._array });
    } catch (err) {
      throw err;
    }
  };
};

export const DeleteInput = (id) => {
  return async dispatch => {
    try {
      const dbResult = await deleteInput(id);
      console.log(dbResult);
      dispatch({ type: DELETE_INPUT, id: id });

    } catch (err) {
      throw err;
    }
  };
};