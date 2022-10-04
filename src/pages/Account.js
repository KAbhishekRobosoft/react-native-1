import React, {useContext, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';
import Buttons from '../component/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../context/AuthContext';
import {initialDataState, dataReducer} from '../component/Reducer';

function Account() {
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

  if (accState.isLoading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color="green" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.con}>
      <SafeAreaView>
        <Text style={styles.text1}>Account Details</Text>
      </SafeAreaView>
      <View>
        <Icon name= "user" style= {{marginLeft:160,marginTop:Platform.OS === "ios" ? 20 : 60}} size= {80}/>
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

        <View>
          <Buttons onPress={logOut} name="LOGOUT" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  con: {
    flex: 1,
  },

  con2: {
    flexDirection: 'row',
    margin: 10,
  },

  image: {
    width: 200,
    height: 150,
    marginLeft: 90,
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 8,
    marginTop: Platform.OS === 'android' ? 20 : 0,
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
    marginTop: 100,
    padding: 15,
  },
});
export default Account;
