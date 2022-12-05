import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ButtonLarge from '../components/Buttons';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {logOut} from '../redux/AuthSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';

const LogoutScreen = ({navigation}) => {
  async function checkOut() {
    try {
      Toast.show('Logged Out');
      await AsyncStorage.removeItem('token');
    } catch (e) {
      console.log(e);
    }
  }

  const dispatch = useDispatch();
  const hadBike = useSelector(state => state.auth.userCredentials);
  const userDetails = useSelector(state => state.auth.userData);
  const authData = useSelector(state => state.auth);

  console.log(userDetails);
  return (
    <SafeAreaView style={styles.main}>
      <ScrollView style={{width: '100%'}}>
        <Image
          style={styles.img}
          source={require('../assets/images/logoutImg.jpg')}
        />
        {hadBike.haveBike && !authData.registered ? (
          <View style={styles.btn1}>
            <ButtonLarge
              onPress={() => {
                if (!userDetails.hasOwnProperty('lisenceNumber')) {
                  navigation.navigate('AddDetailsStack');
                  Toast.show('Please Add Personal Details First');
                } else {
                  navigation.navigate('AddBikeDetails');
                }
              }}
              title="Add Bike Details"
            />
          </View>
        ) : (
          <>
            <View style={styles.btn11}>
              <ButtonLarge disabled={true} title="Add Bike Details" />
            </View>

        
            {authData.registered && hadBike.haveBike && (
              <View
                style={{
                  marginTop: 10,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: '#F36870',
                    fontSize: 13,
                    fontFamily: 'Roboto-Regular',
                    textAlign: 'center',
                  }}>
                  Please complete the Owner Manual Process {'\n'}
                  (You can find Owner Manual in My Garage Section)
                </Text>
              </View>
            )}
          </>
        )}

        <View style={styles.btn2}>
          <Pressable
            onPress={() => {
              checkOut();
              dispatch(logOut());
            }}>
            <View style={styles.container}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#FF0000', '#F36870']}
                style={styles.gradient}>
                <Text style={styles.text}>Logout</Text>
              </LinearGradient>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  img: {
    width: '100%',
    marginTop: 40,
    resizeMode: 'contain',
  },
  btn1: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  btn11: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    opacity: 0.5,
  },
  btn2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
  container: {
    shadowColor: 'rgba(126,118,118,0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    borderRadius: 20,
  },
  gradient: {
    height: 42,
    width: 279,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    letterSpacing: 0.5,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
});
