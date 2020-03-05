import React, {useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform
} from 'react-native';
import ImagePicker from './ImagePicker';
import Card from '../UI/Card';

const TemplateItem = props => {

    // this is for a better looking for Android when pressing on the item
    let TouchableCmp = TouchableOpacity;
    if (Platform.OS === 'andorid' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
  
    return (
        <Card style={styles.TemplateItem}>
            <View style={styles.touchable} >
                <TouchableCmp onPress={props.onSelect} useForeground>
                    <View>

                        <View style={styles.imageContainer}>
                            <Image style={styles.image} source={{ uri: props.image }} />
                            {/* <ImagePicker onImageTaken={imageTakenHandler}/> */}
                          
                        </View>
                       
                        <View style={styles.details}>
                            <Text style={styles.name}>{props.name}</Text>
                            <Text style={styles.amount}>€{parseFloat(props.amount).toFixed(2)}</Text>
                            {/* <Text style={styles.amount}>€{props.amount}</Text> */}
                        </View>
                        <View style={styles.actions}>
                            {props.children}
                        </View>

                    </View>
                </TouchableCmp>
            </View>
        </Card>

    );
};

const styles = StyleSheet.create({
    TemplateItem: {
        height: 300,
        margin: 20
    },
    touchable: {
        borderRadius: 10,
        overflow: 'hidden'
    },
    imageContainer: {
        width: '100%',
        height: '60%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    details: {
        alignItems: 'center',
        height: '15%',
        padding: 9
    },
    name: {
        fontSize: 18,
        marginVertical: 2,
        fontFamily: 'open-sans-bold'
    },
    amount: {
        fontFamily: 'open-sans',
        fontSize: 14,
        color: '#888'
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '25%',
        paddingHorizontal: 20
    }
});
export default TemplateItem;