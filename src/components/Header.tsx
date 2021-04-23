import React from 'react';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {
    StyleSheet,
    View,
    Text,
    Image
} from 'react-native';
import colors from '../styles/colors';
import UserImg from '../../assets/Gabriel.png'
import { processFontFamily } from 'expo-font';
import fonts from '../styles/fonts';
const Header: React.FC = () =>{
    return(
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.userName}>Gabriel</Text>
            </View>
            <Image source={UserImg} style={styles.image} resizeMode='contain'/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop:getStatusBarHeight(),
    },
    image:{
        width: 70,
        height: 70,
        borderRadius: 40,
    },
    greeting:{
        fontSize: 32,
        color:colors.heading,
        fontFamily: fonts.text,
    },
    userName:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight:40,
    }
})

export {Header};