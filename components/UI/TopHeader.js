import React from 'react';
import { StyleSheet, View, Image} from 'react-native';
import Colors from '../../constants/colors';

const TopHeader = props => {
    return (
        <View style={styles.header}>
            <Image style={styles.image} source={require('../../assets/logo.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.primary,
        width: '100%',
        height: '25%',
         marginTop: '3%'
    },
    image: {
        width: '35%',
        height: '100%',
        alignSelf: 'center'
    }
});
export default TopHeader;