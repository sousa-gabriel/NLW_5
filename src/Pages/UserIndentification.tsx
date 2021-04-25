import React, { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {Button} from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import AsncStorage from '@react-native-async-storage/async-storage'
//codigo aula 1 #missaoespacial
//codigo aula 2 #embuscadoproximonivel
//codigo aula 3 #astronautas

const UserIndentification: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();
    const navigation = useNavigation();

    async function handleSubmit(){
        if(!name){
            return Alert.alert('Me diz como chamar você 😅 ?');
        }
        try{
            await AsncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation',
                {
                    title:'Prontinho',
                    subTitle:'Agora vamos começar a cuidar das suas plantinhas com muito cuidado. ',
                    buttonTitle: 'Começar',
                    icon: 'smile',
                    nextScreen: 'PlantSelect',
                }
            );
        }catch{
            Alert.alert('Não foi possivel salvar seu nome 😢');
        }
    }
    function handleInputBlur(){
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function handleInputFocus(){
        setIsFocused(true);
    }

    function handleInputchange(value:string){
        setIsFilled(!!value);
        setName(value);
    }

    return(
        <SafeAreaView style={styles.container}>
            
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS ==='ios' ? 'padding' : 'height'}    
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <Text style={styles.emoji}> { isFilled ? '😄': '😃'}</Text>
                            <Text style={styles.title}>
                                Como podemos {'\n'}
                                chamar você?
                            </Text>
                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && {borderColor:colors.green}
                                ]}
                                placeholder="Digite seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputchange}
                            />
                            <View style={styles.footer}>
                                <Button 
                                    title={'Confirmar'}
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent:'space-around',
    },
    content:{
        flex:1,
        width: '100%',
    },
    title:{
        fontSize: 24,
        lineHeight: 32, 
        textAlign: 'center',
        fontFamily: fonts.heading,
        color:colors.heading,
        marginTop: 20,
    },  
    form:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',
    },
    emoji:{
        fontSize: 44
    },
    input:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        width: '100%', 
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center',
    },
    footer:{
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20,
    }



})
export {UserIndentification}