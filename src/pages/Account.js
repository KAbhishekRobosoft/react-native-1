import React, {useContext, useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Buttons from '../component/Buttons';
import {AuthContext} from '../context/AuthContext';
import { loginState } from '../../App';
import { accName,accEmail,accAge } from './Login';

function Account() {
  const {signOut} = useContext(AuthContext);
  const logOut = () => {
    signOut();
  };

  return (
    <View style={styles.con}>
      <SafeAreaView>
        <Text style={styles.text1}>Account Details</Text>
      </SafeAreaView>
      <View style={styles.con1}>
        <View style={styles.con2}>
          <Text style={styles.text2}>Name:</Text>
          <Text style={styles.text3}>{accName}</Text>
        </View>

        <View style={styles.con2}>
          <Text style={styles.text2}>Email:</Text>
          <Text style={styles.text3}>{accEmail}</Text>
        </View>

        <View style={styles.con2}>
          <Text style={styles.text2}>Age:</Text>
          <Text style={styles.text3}>{accAge}</Text>
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
