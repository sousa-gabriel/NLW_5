import React from 'react';
import {RectButton, RectButtonProps} from 'react-native-gesture-handler';
import {
    StyleSheet,
    Text,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButtonProps extends RectButtonProps{
    title: string;
    active?: boolean; 
}

const EnvironmentButton: React.FC <EnvironmentButtonProps>= ({title, active = false, ...rest}) =>{
    return(
        <RectButton style={[styles.container, active && styles.containerActive]} {...rest}>
            <Text style={[styles.title, active && styles.titleActive]}>
                {title}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container:{
        width: 76,
        height: 40,
        backgroundColor: colors.shape,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:12,
        marginHorizontal: 5,
    },
    containerActive:{
        backgroundColor: colors.green_light,
    },
    title:{
        color: colors.heading,
        fontFamily: fonts.text,
    },
    titleActive:{
        fontFamily:fonts.heading,
        color: colors.green_dark,
    }
})

export {EnvironmentButton};