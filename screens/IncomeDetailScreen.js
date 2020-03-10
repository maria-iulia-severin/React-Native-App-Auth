import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import Colors from '../constants/colors';
import { useSelector } from 'react-redux';
import MapPreview from '../../React-Native-App/components/features/MapPreview';

const IncomeDetailScreen = props => {

    // getting incomeId from IncomeOverviewScreen using the method getParam
    //IncomeOverviewScreen is taking the incomeId using the useSelector 
    //which has the state=initialState : { all parameters for one income }
    //here, selectedIncome is finding the right id and is displaying only that data
    const inputId = props.navigation.getParam('inputId');
    const selectedIncome = useSelector(state => state.inputs.inputs.find(input => input.id === inputId));
    const selectedLocation = {
        lat: selectedIncome.lat,
        lng: selectedIncome.lng
    };
    const showMapHandler = () => {
        props.navigation.navigate('Map', {
            readonly: true,
            initialLocation: selectedLocation
        });
    };

    return (
        <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: selectedIncome.imageURL }} />
            </View>
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{selectedIncome.address}</Text>
                </View>
                <MapPreview
                    style={styles.mapPreview}
                    location={selectedLocation}
                    onPress={showMapHandler}
                />
            </View>
            <Text style={styles.amount}>€{parseFloat(selectedIncome.amount).toFixed(2)}</Text>

            <Text style={styles.description}>{selectedIncome.description}</Text>

        </ScrollView>
    );
};


IncomeDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('inputName')
    };
};
const styles = StyleSheet.create({
    imageContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    amount: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'open-sans'
    },
    description: {
        fontSize: 20,
        textAlign: 'center',
        marginHorizontal: 20,
        fontFamily: 'open-sans',

    },
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
        backgroundColor: '#ccc'
    },
    locationContainer: {
        marginVertical: 20,
        width: '90%',
        maxWidth: 350,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: 'white',
        borderRadius: 10
    },
    addressContainer: {
        padding: 20
    },
    address: {
        color: Colors.primary,
        textAlign: 'center'
    },
    mapPreview: {
        width: '100%',
        maxWidth: 350,
        height: 200,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    }
});

export default IncomeDetailScreen;