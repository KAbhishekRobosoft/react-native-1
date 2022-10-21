import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import TopNavigation from '../utils/TopNavigation';

//Contains Sign in and sign Up screens in Top navigation format.
//Structure in top navigation component

function UserAuthentication() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.main_con}>
      <View style={styles.sub_con1}>
        <View style={styles.lock_img}>
          <Image source={require('../images/pic_small.png')} />
        </View>
        <View style={styles.textDes}>
          <Text style={styles.inpText}>PASS{'\n'}MANAGER</Text>
        </View>
      </View>
      <View style={styles.sub_con2}>
          <TopNavigation />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
    backgroundColor: '#1baaff',
  },

  sub_con1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  sub_con2: {
    flex: 3,
  },

  lock_img: {
    marginTop: 60,
  },

  textDes: {
    marginTop: 70,
    marginLeft: 10,
  },

  inpText: {
    lineHeight: 30,
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default UserAuthentication;
