import React, { useState } from 'react';
import {
    Alert,
    Image,
    Platform,
    StyleSheet, 
    Text, 
    View
}from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import {SvgFromUri} from 'react-native-svg';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import WaterDorp from '../assets/waterdrop.png'
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import DateTimePicker,{Event} from '@react-native-community/datetimepicker';

import{useNavigation, useRoute} from '@react-navigation/core'; //reucperando dados passados pela rota
import { format, isBefore } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { PlantProps, savePlant } from '../libs/storage';
// interface Params{
//    plant:PlantProps
// }

const PlantSave: React.FC = () =>{
    const navigation = useNavigation();
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');

    const route = useRoute();//reucperando dados passados pela rota
    const plant = route.params as PlantProps;//reucperando dados passados pela rota

    function handleChangeTime(event: Event, dateTime:Date | undefined){
        if(Platform.OS === 'android'){
            setShowDatePicker(oldState => !oldState);
        }
        if(dateTime && isBefore(dateTime, new Date())){
            setSelectedDateTime(new Date());
            Alert.alert('Não é possivel selecionar uma hora no passado!⏱');
        }
        if(dateTime){
            setSelectedDateTime(dateTime);
        }
    }
    function handleOpenDateTimePickerForAndroid(){
        setShowDatePicker(oldState => !oldState);
    }
    async function handleSave(){
        try{
            await savePlant({
                ...plant,
                dateTimeNotification:selectedDateTime
            });
            navigation.navigate('Confirmation',
                {
                    title:'Tudo certo',
                    subTitle:'Fique tranquilo que sempre vamos lembrar você de cuidar sua plantinha com muito cuidado. ',
                    buttonTitle: 'Muito Obrigado :D',
                    icon: 'hug',
                    nextScreen: 'MyPlants',
                }
            );
        }catch{
            Alert.alert('Não foi possival salvar 🥺');
        }
    }
    return(
        <View style={styles.constainer}>
            <View style={styles.plantInfo}>
                <SvgFromUri uri={plant.photo} width={150} height={150}/>
                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantAbout}>
                    {plant.about}
                </Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image source={WaterDorp} resizeMode='contain' style={styles.tipImage}/>
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>
                </View>
                <Text style={styles.alertLabel}>
                    Escolha o melhor horario para ser lembrado:
                </Text>
                {
                    showDatePicker &&(
                    <DateTimePicker
                        value={selectedDateTime}
                        mode='time'
                        display='spinner'
                        onChange={handleChangeTime}
                    />
                )}
                {
                    Platform.OS === 'android'&&(
                        <TouchableOpacity onPress={handleOpenDateTimePickerForAndroid} style={styles.dateTimePickerButton}>
                            <Text style={styles.dateTimePickerText}>
                                {`Mudar ${format(selectedDateTime, 'HH:mm')}`}
                            </Text>
                        </TouchableOpacity>
                    )
                }
                <Button
                    title="Cadastrar planta"
                    onPress={handleSave}
                />
            </View>
        </View>
    );
}
 const styles = StyleSheet.create({
    constainer:{
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,        
    },
    plantInfo:{
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape
    },
    plantName:{
        fontFamily: fonts.heading,
        fontSize: 24,
        color:colors.heading,
        marginTop:15,
    },
    plantAbout:{
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
        fontSize: 17,
        marginTop: 10,
    },
    controller:{
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingVertical: 20,
        paddingBottom: getBottomSpace() || 20,
    },
    tipContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius:20,
        position: 'relative',
        bottom: 60,
    },
    tipImage:{
        width: 56,
        height: 56,
    },
    tipText:{
        flex:1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color:Colors.blue,
        fontSize: 17,
        textAlign: 'justify',
    },
    alertLabel:{
        textAlign: 'center',
        fontFamily: fonts.complement,
        fontSize: 12,
        marginBottom:5,
    },
    dateTimePickerButton:{
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,
    },
    dateTimePickerText:{
        color: colors.heading,
        fontSize:24,
        fontFamily: fonts.heading,
    }

 })

export { PlantSave }