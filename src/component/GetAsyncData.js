import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
        try{
        const jsonValue = await AsyncStorage.getItem('res');
        console.log("This is"+jsonValue)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
        }catch(err){
            console.log(err)
        }
    
};
