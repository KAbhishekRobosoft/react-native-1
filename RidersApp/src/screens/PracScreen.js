import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Button,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ButtonLarge from '../components/Buttons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logOut } from '../redux/AuthSlice';

function PracScreen() {
  const authData = useSelector(state => state.auth);
  const dispatch = useDispatch();

  async function checkOut() {
    try {
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <SafeAreaView style={styles.success_con}>
      <View style={styles.success_subcon}>
        <Pressable style={styles.backArrow} onPress={() => navigation.goBack()}>
          <Image source={require('../assets/images/back_arrow.png')} />
        </Pressable>

        {authData.image === '' && (
          <Image
            style={styles.rUserImg}
            source={require('../assets/images/photoless.png')}
          />
        )}
        {authData.image.length > 0 && (
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 246, height: 86}}
              source={require('../assets/images/blueCircle.png')}
            />
            <View
              style={{
                width: '100%',
                height: 140,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Image style={styles.rUserImg1} source={{uri: authData.image}} />
              <Image
                style={{
                  width: 40,
                  height: 40,
                  alignSelf: 'flex-end',
                  marginBottom: 10,
                }}
                source={require('../assets/images/green_tick.png')}
              />
            </View>
          </View>
        )}
        <Text style={styles.sucText1}>Awesome</Text>
        <Text style={styles.sucText2}>Lets move on and make some</Text>
        <Text style={styles.sucText3}>crazy trips</Text>
        <View style={styles.butView}>
          <ButtonLarge
            onPress={() => {
              navigation.navigate('subStack');
            }}
            title="LETS GET STARTED"
          />
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Button
            onPress={() => {
              checkOut();
              dispatch(logOut());
            }}
            title="logout"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rUserImg: {
    height: 180,
    width: 246,
    marginTop: 13,
  },

  butView: {
    marginTop: 39,
  },

  success_con: {
    flex: 1,
  },

  sucText1: {
    marginTop: 42,
    lineHeight: 23,
    fontSize: 24,
    fontFamily: 'Roboto-Regular',
    color: '#4F504F',
  },

  sucText2: {
    lineHeight: 24,
    fontSize: 16,
    color: '#4F504F',
  },

  sucText3: {
    lineHeight: 24,
    fontSize: 16,
    color: '#4F504F',
  },

  backArrow: {
    alignSelf: 'flex-start',
    marginLeft: 19,
    marginTop: 16,
  },

  success_subcon: {
    flex: 1,
    alignItems: 'center',
  },

  rUserImg1: {
    borderRadius: 80,
    height: 133,
    width: 133,
    position: 'absolute',
  },
});

export default PracScreen;
