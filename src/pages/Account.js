import React, {useContext, useEffect, useReducer, useState} from 'react';
import {Button, DevSettings} from 'react-native';

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
import {dataReducer, initialDataState} from '../utils/Reducer';
import {editAge} from '../services/Auth';
import {getUser} from '../services/Auth';

function Account() {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('');
  const [accState, dispatch] = useReducer(dataReducer, initialDataState);
  const {signOut} = useContext(AuthContext);

  const logOut = () => {
    signOut();
  };

  const putText = getText => {
    setText(getText);
  };

  const setAge = async () => {
    if (isNaN(text) || /^\s*$/.test(text)) alert('Enter a valid Age');
    else {
      const res = await editAge(text, accState.userToken);
      if (res.hasOwnProperty('data')) {
        setTimeout(() => {
          DevSettings.reload();
          alert('Age Updated successfully');
        }, 1200);
      } else {
        alert(res.substring(29));
      }
    }
  };

  useEffect(() => {
    setTimeout(async () => {
      let userToken = null;
      let response;
      try {
        userToken = await AsyncStorage.getItem('token');
        userToken = JSON.parse(userToken);
        response = await getUser(userToken);
      } catch (e) {
        console.log(e);
      }
      dispatch({
        type: 'RETRIEVE_DATA',
        name: response.name,
        token: userToken,
        email: response.email,
        age: response.age,
      });
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
      <KeyboardAvoidingView>
        <SafeAreaView>
          <Text style={styles.text1}>Account Details</Text>
        </SafeAreaView>
        <View>
          <Icon
            name="user"
            style={{
              marginLeft: 160,
              marginTop: Platform.OS === 'ios' ? 20 : 30,
            }}
            size={80}
          />
        </View>
        <View style={styles.con1}>
          <View style={styles.con2}>
            <Text style={styles.text2}>Name:</Text>
            <Text style={styles.text3}>{accState.userName}</Text>
          </View>

          <View style={styles.con2}>
            <Text style={styles.text2}>Email:</Text>
            <Text style={styles.text3}>{accState.userEmail}</Text>
          </View>

          <View style={styles.con2}>
            <Text style={styles.text2}>Age:</Text>
            <Text style={styles.text3}>{accState.userAge}</Text>
          </View>

          {visible && (
            <View style={styles.editCon}>
              <Text style={styles.texedt}>Edit Age:</Text>
              <View style={styles.inpedt}>
                <TextInput onChangeText={putText} style={styles.inptxt} />
                <Button title="Edit" onPress={setAge} />
                <Button
                  title="Cancel"
                  onPress={() => {
                    setVisible(false);
                  }}
                />
              </View>
            </View>
          )}

          <View style={styles.edbut}>
            <Buttons
              onPress={() => {
                setVisible(true);
              }}
              name="EDIT"
            />
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

  inpedt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  editCon: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  edbut: {
    marginTop: 30,
  },
  con2: {
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },

  inptxt: {
    width: '40%',
    borderColor: 'black',
    borderWidth: 1,
    marginLeft: 10,
    height: 40,
    padding: 10,
  },

  texedt: {
    fontSize: 20,
    fontWeight: 'bold',
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
