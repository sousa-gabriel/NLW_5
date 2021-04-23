import React, { useEffect, useState } from 'react';
import api from '../services/api';
import {Header} from '../components/Header';
import {Load} from '../components/Load';
import {EnvironmentButton} from '../components/EnvironmentButton';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import {
    StyleSheet, 
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';
import { PlantsCardPrimary } from '../components/PlantsCardPrimary';

interface EnvironmentProps{
    key: string;
    title: string;
}
interface PlantsProps{
    id: string,
    name: string,
    about: string,
    water_tips: string,
    photo: string,
    environments: [string],
    frequency: {
    times: number,
    repeat_every: string
    }
}
const PlantSelect : React.FC = () =>{
    const [environment, setEnvironment] = useState<EnvironmentProps[]>([]);
    const [plants, setPlants] = useState<PlantsProps[]>([]);
    const [filteredplants, setFilteredPlants] = useState<PlantsProps[]>([]);
    const [environmentSelected, setEnvironmentSelected] = useState('all');
    const [loading, setLoading] = useState(true);
    //iniciando a paginação dentro da minha api
    const [page, setPage] = useState(1); //verifica o numero de paginas
    const [loadingMore, setLoadingMore] = useState(false);//valida se tem mais uma pagina a ser render
    const [loadedAll, setLoadedAll] = useState(false)//


    function handleEnvironmentSelected(environment:string){
        setEnvironmentSelected(environment);
        if(environment == 'all'){
            return setFilteredPlants(plants)
        }
        const filtered = plants.filter(plant=>
            plant.environments.includes(environment)
        );
        setFilteredPlants(filtered);
    }
    //criando api para usuario conforme ele vai rolando
    function handlefetchMore(distance: number){
        if(distance <1)
            return;
        setLoadingMore(true);
        setPage(oldValue => oldValue +1);
        fetchPlants();
    }
    useEffect(()=>{
        async function fetchEnviroment(){
            const {data} = await api.
            get('plants_environments?_sort=title&_order=asc');//ordenando nossa api para ordem alfabetica
            setEnvironment([
                {
                    key:'all',
                    title:'Todos'
                },
                ...data
            ]);
        }
        fetchEnviroment();
    },[])
    useEffect(()=>{
        
        fetchPlants();
    },[])
    async function fetchPlants(){
        const {data} = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);
        //validação na api
        if(!data){
            return setLoading(true); //valida se não tem plantas fica carregando
        }
        if(page>1){
            //valida se tiver mais de uma pagina para quando trocar de pagina mostrar as proximas
            setPlants(oldValue=> [...oldValue,...data]);
            setFilteredPlants(oldValue=> [...oldValue,...data]);
        }else{
            setPlants(data); //animaCão inicial
            setFilteredPlants(data);//animação de carregamento de rolagem 
        }
        setLoadingMore(false);
        setLoading(false);
    }
    if(loading){
        return < Load/>
    }
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Header/>
                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
            </View>
            <View>
                <FlatList
                    data={environment}
                    renderItem={({item})=>(
                        <EnvironmentButton
                            title={item.title}
                            active={item.key === environmentSelected}
                            onPress={()=>handleEnvironmentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.environmentList}
                />
            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredplants}
                    renderItem={({item})=>(
                        <PlantsCardPrimary data={item}/>
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({distanceFromEnd})=> handlefetchMore(distanceFromEnd)}
                    ListFooterComponent={
                        loadingMore ?
                            <ActivityIndicator color={colors.green}/>
                        : <></>
                    }
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.background,
    },
    header:{
        paddingHorizontal:30,
    },
    title:{
        fontSize: 17,
        color: colors.heading,
        fontFamily:fonts.heading,
        marginTop: 15,
        lineHeight: 20,
    },
    subtitle:{
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading,
    },
    environmentList:{
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32,
    },
    plants:{
        flex:1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },


})

export {PlantSelect};