
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '../services/Auth';
import {setOtpVerfied} from '../redux/AuthSlice';
import Toast from 'react-native-simple-toast';

const OtpScreen = ({navigation}) => {
  const [count, setCount] = useState(20);

  useEffect(() => {
    count > 0 &&
      setTimeout(() => {
        setCount(count - 1);
      }, 1000);
  }, [count]);

  const data = useSelector(state => state.auth);
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Icon name="arrow-left" size={24} color="grey" />
        </Pressable>
      </View>
      <ScrollView style={{height: '100%'}}>
        <View style={styles.imgContainer}>
          <Image
            style={styles.otpImg}
            source={require('../assets/images/otpimg.png')}
          />
          <View style={styles.textView}>
            <Text style={styles.text}>We have sent an OTP to</Text>
            <Text style={styles.text}>+91-{data.userData.mobile}</Text>
          </View>
        </View>
        <View style={styles.bottomView}>
          <View style={styles.optView}>
            <TextInput
              cursorColor={'white'}
              name="otp"
              style={styles.otpText}
              onChangeText={async value => {
                if (value.length === 4) {
                  setCode(value);
                  if (
                    data.registered === true &&
                    data.forgotPassword === true
                  ) {
                    navigation.navigate('ResetPassword');
                  } else if (
                    data.registered === false &&
                    data.forgotPassword === true
                  ) {
                    navigation.navigate('ResetPassword');
                  } else if (
                    data.registered === true &&
                    data.forgotPassword === false
                  ) {
                    const response = await register(data.userData,data.haveBike);
                    if (response !== undefined) {
                      dispatch(setOtpVerfied())
                      navigation.navigate('Login');
                      Toast.show("Registered successfully")
                    } else {
                      Toast.show('User already exists');
                    }
                  }
                }
              }}
              keyboardType="numeric"
              maxLength={4}
            />
            <View style={styles.otpBorderView}>
              <View style={styles.otpBorderView1} />
              <View style={styles.otpBorderView1} />
              <View style={styles.otpBorderView1} />
              <View style={styles.otpBorderView1} />
            </View>
          </View>

          <View style={styles.textView1}>
            <Pressable onPress={() => console.log('Resend')}>
              <Text style={styles.resendText}>Re-send Again</Text>
            </Pressable>
          </View>
          <View style={styles.textView2}>
            <Text style={styles.secondsText}>{count} seconds left</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtpScreen;

const styles = StyleSheet.create({
  main: {flex: 1, backgroundColor: '#ffffff'},
  header: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  imgContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    position: 'relative',
  },
  otpImg: {
    width: 346,
    height: 200,
    resizeMode: 'contain',
    marginTop: 12,
  },
  textView: {
    alignItems: 'center',
    marginTop: 90,
  },
  text: {
    fontSize: 18,
    color: '#777777',
  },
  bottomView: {
    height: '52%',
    alignItems: 'center',
  },

  textView1: {
    marginTop: 50,
  },
  textView2: {
    marginTop: 30,
  },
  resendText: {
    color: '#F7931E',
  },
  secondsText: {
    color: 'rgba(174,168,168,0.87)',
  },

  optView: {
    width: 280,
    height: 50,
    justifyContent: 'center',
    marginTop: 100,
  },
  otpText: {
    letterSpacing: Platform.OS === 'ios' ? 49 : 48,
    textAlign: 'left',
    height: Platform.OS === 'ios' ? 30 : 60,
    width: Platform.OS === 'ios' ? '100%' : '110%',
    marginLeft: Platform.OS === 'ios' ? 25 : 0,
    color: '#4EB5F4',
    fontSize: 36,
    fontFamily: 'Roboto-Regular',
    top: Platform.OS === 'ios' ? 0 : 17,
  },
  otpBorderView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 10,
    width: '99%',
    alignSelf: 'center',
  },
  otpBorderView1: {
    height: 2,
    width: 39,
    opacity: 0.5,
    backgroundColor: 'grey',
  },
});
