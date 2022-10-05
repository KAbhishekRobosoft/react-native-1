import React, {useContext, useEffect, useReducer, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';
import Buttons from '../component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {initialDataState, dataReducer} from '../component/Reducer';
import { editAge } from '../services/Auth';

function Account() {
  const [visible, setVisible] = useState(false);
  const [accState, dispatch] = useReducer(dataReducer, initialDataState);
  const {signOut} = useContext(AuthContext);

  const logOut = () => {
    signOut();
  };

  useEffect(() => {
    setTimeout(async () => {
      let userData = null;
      try {
        userData = await AsyncStorage.getItem('data');
        userData = JSON.parse(userData);
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'RETRIEVE_DATA', data: userData});
    }, 1000);
  }, []);

  const setAge= async (editText)=>{
     await editAge(editText,accState.userData.token)
     signOut()
  }

  if (accState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.con}>
    <KeyboardAvoidingView>
      <SafeAreaView>
        <Text style={styles.text1}>Account Details</Text>
      </SafeAreaView>
      <View>
        <Icon
          name="user"
          style={{marginLeft: 160, marginTop: Platform.OS === 'ios' ? 20 : 30}}
          size={80}
        />
      </View>
      <View style={styles.con1}>
        <View style={styles.con2}>
          <Text style={styles.text2}>Name:</Text>
          <Text style={styles.text3}>{accState.userData.user.name}</Text>
        </View>

        <View style={styles.con2}>
          <Text style={styles.text2}>Email:</Text>
          <Text style={styles.text3}>{accState.userData.user.email}</Text>
        </View>

        <View style={styles.con2}>
          <Text style={styles.text2}>Age:</Text>
          <Text style={styles.text3}>{accState.userData.user.age}</Text>
        </View>
        {visible && (
          <View style= {styles.editCon}>
            <Text style={styles.texedt}>Edit Age:</Text>
            <TextInput onChangeText={setAge} style={styles.inptxt}></TextInput>
          </View>
        )}

        <View style={styles.edbut}>
          <Buttons onPress={()=>{setVisible(true)}} name="EDIT" />
          <Buttons onPress={logOut} name="LOGOUT" />
        </View>
      </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },

  editCon:{
    marginLeft:10,
    flexDirection:"row",
    alignItems:"center",
    marginTop:10
  },

  edbut:{
      marginTop:30
  },
  con2: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },

  inptxt: {
    width:'30%',
    borderColor:"black",
    borderWidth:1,
    marginLeft:10,
    height:40,
    padding:10
  },

  texedt:{
    fontSize:20,
    fontWeight:"bold"
  },

  text1: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },

  text2: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  text3: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },

  con1: {
    backgroundColor: 'white',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    width: '95%',
    marginLeft: 10,
    marginTop: 20,
    padding: 15,
  },
});
export default Account;
