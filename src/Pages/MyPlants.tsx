import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    FlatList
} from 'react-native';
import { Header } from '../components/Header';
import colors from '../styles/colors';
import WaterDorp from '../assets/waterdrop.png'
import { loadPlant, PlantProps } from '../libs/storage';
import { formatDistance } from 'date-fns/esm';
import { pt } from 'date-fns/locale';
import fonts from '../styles/fonts';
import { PlantsCardSecondary } from '../components/PlantsCardSecondary';

const MyPlants : React.FC = () =>{
    const [myPlants,setMyPlants ] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setnextWaterd] = useState<string>();

    useEffect(()=>{
        async function LoadStorageData() {
            const PlantsStoraged = await loadPlant();
            const nextTime = formatDistance(
                new Date(PlantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );
            setnextWaterd(
                `Não esqueça de regar a ${PlantsStoraged[0].name} às ${nextTime} horas.`
            )
            setMyPlants(PlantsStoraged);
            setLoading(false);
        }
        LoadStorageData();
    },[])

    return(
        <View style={styles.container}>
            <Header/>
            <View style={styles.spotLigth}>
                <Image
                    source={WaterDorp} 
                    resizeMode='contain' 
                    style={styles.spotLigthImage}
                />
                <Text style={styles.spotLigthtext}>
                    {nextWaterd}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>

                </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item)=> String(item.id)}
                    renderItem={({item})=>(
                        <PlantsCardSecondary data={item} />
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{flex:1}}
                
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background,
    },
    spotLigth:{
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    spotLigthImage:{    
        width: 60,
        height: 60,
    },
    spotLigthtext:{
        flex:1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants:{
        flex: 1,
        width: '100%',
    },
    plantsTitle:{
        fontSize: 24,
        fontFamily: fonts.heading,
    }
});

export {MyPlants}