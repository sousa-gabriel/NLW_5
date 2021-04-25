import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';

export interface PlantProps{
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
    dateTimeNotification: Date;
}

interface StoragePlantProps{
    [id:string]:{
        data: PlantProps;
    }
}

export async function savePlant(plant:PlantProps):Promise<void> {
    try{
        //pegando as plantas salvos no nosso asyncStorage
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        //pegando nossas plantas salvas e transformando as mesmas para um json
        const oldPlants = data ? (JSON.parse(data) as StoragePlantProps):{};

        //criando um objeto com a nova planta seguindo a interface
        const newPlant = {
            [plant.id]:{
                data: plant
            }
        }
        //setando os novos dados, pegando os dados antigos e criando os novos e junto a isso transformando novamente os dados em strings
        await AsyncStorage.setItem('@plantmanager:plants',
            JSON.stringify({
                ...newPlant,
                ...oldPlants
        }))
    }catch(error){
        throw new Error(error)
    }
}

export async function loadPlant():Promise<PlantProps[]> {
    try{
        const data = await AsyncStorage.getItem('@plantmanager:plants');
        const plants = data ? (JSON.parse(data) as StoragePlantProps):{};

        const plantsShorted = Object
        .keys(plants)
        .map((plant)=>{
            return {
                ...plants[plant].data,
                hour: format(new Date(plants[plant].data.dateTimeNotification),'HH:mm')
            }
        })//função responsavel por ordenar as plantas por hora
        .sort((a, b)=>
            Math.floor(
                new Date(a.dateTimeNotification).getTime()/1000-
                Math.floor(new Date(b.dateTimeNotification).getTime()/1000)
            )
        );
        return plantsShorted;
    }catch(error){
        throw new Error(error)
    }
}