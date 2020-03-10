import React, { useState } from 'react';
import { Alert, View, Button, Text, StyleSheet, Image } from 'react-native';
import Colors from '../../constants/colors';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';

const ImgPicker = props => {

    const [pickedImage, setPickedImage] = useState();

    const verifyPermissions = async () => {
        //CAMERA_ROLL is for galery
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert('Insufficient permissions!', 'You need to grand camera permissions to use this app.',
                [{ text: 'Okay' }]
            );
            return false;
        }
        return true;


    };

    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return; //can t continue
        }
        const image = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.uri);
        props.onImageTaken(image.uri);
    };

    return (
        <View style={styles.imagePicker}>
            <View style={styles.imagePreview}>
                {!pickedImage ? (
                    <Text>Take a picture of your total price.</Text>
                ) : (
                        <Image style={styles.image} source={{ uri: pickedImage }} />
                    )}
            </View>
            <Button
                title="Take Image"
                color={Colors.primary}
                onPress={takeImageHandler}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    imagePicker: {
        alignItems: 'center',
        marginBottom: 15
    },
    imagePreview: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#ccc',
        borderWidth: 1
    },
    image: {
        width: "100%",
        height: 200
    }
});

export default ImgPicker;