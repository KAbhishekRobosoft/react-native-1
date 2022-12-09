import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import ButtonLarge from '../components/Buttons';
import {Input} from '../components/InputFields';
import {Password} from '../components/InputFields';
import {Formik, Field} from 'formik';
import * as yup from 'yup';
import {useDispatch} from 'react-redux';
import { checkIn } from '../services/UserCredentials';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login} from '../redux/AuthSlice';
import {setForgotPassword} from '../redux/AuthSlice';
import {setImage} from '../redux/AuthSlice';

const registerValidationSchema = yup.object().shape({
  number: yup.string().required('Number/Email  is required'),
  password: yup
    .string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .required(''),
});

const LoginScreen = ({navigation}) => {
  const [secureText, setSecureText] = useState(true);
  const dispatch = useDispatch();
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 10 : 0;

  async function signIn(values) {
    let image = '';
    const response = await checkIn(values);
    if (response !== undefined) {
      try {
        await AsyncStorage.setItem('token', response.token);
      } catch (e) {
        console.log(e);
      }
      if (response.hasOwnProperty('profileImage')) {
        image = 'https' + response.profileImage.substring(4);
        dispatch(setImage(image));
      }
      dispatch(login(response));
      Toast.show('Logged in Successfully!');
    } else {
      Toast.show('User Does not exist');
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <ScrollView horizontal={false} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={styles.main}>
            <View style={styles.logoView}>
              <Image
                source={require('../assets/images/appicon.png')}
                style={styles.logo}
              />
            </View>
            <View style={styles.loginContainer}>
              <Formik
                validationSchema={registerValidationSchema}
                initialValues={{
                  number: '',
                  password: '',
                }}
                onSubmit={values => {
                  signIn(values);
                }}>
                {({values, handleSubmit, isValid}) => (
                  <>
                    <View style={styles.inputTextView1}>
                      <Field
                        component={Input}
                        name="number"
                        source={require('../assets/images/user1.png')}
                        placeholderTextColor="grey"
                        placeholder="Mobile Number/Email id"
                        styleUser={styles.userLogo}
                        value={values.number}
                        keyboardType="number-pad"
                      />
                    </View>
                    <View style={styles.inputTextView2}>
                      <Field
                        component={Password}
                        name="password"
                        source={require('../assets/images/locked.png')}
                        placeholderTextColor="grey"
                        placeholder="Password"
                        styleUser={styles.lockImg}
                        value={values.password}
                        secureTextEntry={secureText}
                        onPress={() => setSecureText(!secureText)}
                      />
                    </View>
                    <View style={styles.forgetTextView}>
                      <Pressable
                        onPress={() => {
                          dispatch(setForgotPassword());
                          navigation.navigate('NumberEntry');
                        }}>
                        <Text style={styles.forgetText}>Forgot Password</Text>
                      </Pressable>
                    </View>

                    <View style={styles.buttonView}>
                      <ButtonLarge
                        disabled={!isValid}
                        title="LOGIN"
                        onPress={handleSubmit}
                      />
                    </View>
                  </>
                )}
              </Formik>
            </View>
            <View style={styles.bottomView}>
              <ImageBackground
                style={styles.bgImage}
                source={require('../assets/images/BG.png')}>
                <View style={styles.bottomImgView}>
                  <Image
                    style={styles.bottomImg1}
                    source={require('../assets/images/fb.png')}
                  />
                  <Image
                    style={styles.bottomImg2}
                    source={require('../assets/images/g.png')}
                  />
                </View>
                <View style={styles.bottomTextView}>
                  <Text style={styles.bottomText1}>Don't have an account?</Text>
                  <Pressable onPress={() => navigation.navigate('Confirm')}>
                    <Text style={styles.bottomText2}> Register</Text>
                  </Pressable>
                </View>
              </ImageBackground>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoView: {
    width: '100%',
    height: '23%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 99,
    height: 100,
    marginTop: 70,
  },
  loginContainer: {
    width: '100%',
    height: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  inputTextView1: {
    width: '100%',
  },
  inputTextView2: {
    width: '100%',
    justifyContent: 'center',
  },
  userLogo: {
    width: 18,
    height: 24,
  },
  lockImg: {
    width: 20,
    height: 24,
  },
  eyeImg: {
    width: 24,
    height: 14,
    right: 10,
  },
  textInput: {
    width: '90%',
    height: 50,
    marginVertical: 7,
    fontSize: 16,
    marginLeft: 10,
    fontFamily: 'Roboto-Regular',
  },
  forgetTextView: {
    // width: '85%',
    // borderWidth: 1,
    // marginHorizontal: 140,
    width: '100%',
    // paddingEnd: '10%'
    //alignItems: 'center',
    // justifyContent: 'center',
    //paddingRight: '9%',
    //  borderWidth:1
  },
  forgetText: {
    color: '#EF8B40',
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Roboto-Regular',
    width: '80%',
    // borderWidth: 1,
    marginLeft: 40,
    textAlign: 'right',
  },
  buttonView: {
    marginTop: 30,
    top: 25,
  },
  bottomView: {
    width: '100%',
    height: '100%',
  },
  bgImage: {
    width: '100%',
    height: 261,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomImgView: {
    flexDirection: 'row',
    width: '35%',
    justifyContent: 'space-between',
    marginTop: 40,
    height: '30%',
    alignItems: 'center',
  },
  bottomImg1: {
    width: 60,
    height: 60,
    paddingHorizontal: 10,
  },
  bottomImg2: {
    width: 57,
    height: 57,
    paddingHorizontal: 10,
  },
  bottomTextView: {
    flexDirection: 'row',
    marginVertical: 40,
  },
  bottomText1: {
    color: '#ADAFB1',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  bottomText2: {
    color: '#F49D5C',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
});
