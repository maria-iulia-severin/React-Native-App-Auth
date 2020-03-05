import React from 'react';
import {TouchableOpacity, View, Image, StyleSheet } from 'react-native';

import ENV from '../../env';

const MapPreview = props => {
    //I add dinamicaly the location prop which has the lat key
    //and the lng key
    //you can change the size of the map you want to display
    //you can add the map type, map markers with the props lng and lat
    //the last one is the api key 
  let imagePreviewUrl;
//only if I have picked location, I want to have all of this
  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.lat
    },${
      props.location.lng
    }&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${
      props.location.lat
    },${props.location.lng}&key=${ENV.googleApiKey}`;
  }

  return (
    <TouchableOpacity onPress={props.onPress} style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? (
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
      ) : (
        props.children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default MapPreview;
