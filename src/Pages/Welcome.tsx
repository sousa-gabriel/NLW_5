import React from 'react';
import { 
    Text, 
    Image, 
    TouchableOpacity, 
    StyleSheet, 
    SafeAreaView,
    Dimensions,
    View,
} from 'react-native';
import {Feather} from '@expo/vector-icons'
import wateringImg from '../assets/watering.png'
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { useNavigation } from '@react-navigation/native';

const Welcome: React.FC = () => {
    const navigation = useNavigation();

    function handleStart(){
        navigation.navigate('UserIndentification');
    }
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.title}>
                    Gerencie {'\n'}
                    suas plantas de{'\n'}
                    forma fácil
                </Text>
                <Image 
                    style={styles.image} 
                    source={wateringImg}
                    resizeMode= 'contain'
                />
                <Text style={styles.subtitle}>
                    Não esqueça mais de regar suas plantas.
                    Nós cuidamos de lembrar você sempre que precisar.
                </Text>
                <TouchableOpacity style={styles.button} activeOpacity={0.5} onPress={handleStart}>
                    <Feather 
                        name="chevron-right"
                        style={styles.buttonIcon}
                    />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    wrapper:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
    },
    title:{
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.heading,
        marginTop: 8,
        fontFamily: fonts.heading,
        lineHeight: 34,
    },
    subtitle:{
        textAlign: 'center',
        fontSize: 18,
        paddingHorizontal: 20,
        color:colors.heading,
        fontFamily: fonts.text,
    },
    button:{
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        height: 56,
        width: 56,
        margin: 20,
    },
    image:{
        height: Dimensions.get('window').width*0.7,
    },
    buttonIcon:{
        fontSize: 32,
        color:colors.white,
    }
})

export {Welcome};