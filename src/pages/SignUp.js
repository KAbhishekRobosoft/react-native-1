import React, {useContext} from 'react';
import CustomInput from '../component/CustomInput';
import {View, Text, StyleSheet, Platform,ImageBackground,Dimensions} from 'react-native';
import {Formik, Field} from 'formik';
import Buttons from '../component/Button';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Register} from '../services/Auth';
import {AuthContext} from '../context/AuthContext';
import { signUpValidationSchema } from '../component/Validation';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;


function SignUp({navigation}) {

  const {signUp} = useContext(AuthContext);
  const storeIt = async (name, email, password, age) => {
    const res = await Register(name, email, password, age);
    if (res.hasOwnProperty('token')) {
      alert('Welcome to flex Family' + ' ' + res.user.name);
      signUp(res);
    } else {
      alert('User already exists');
    }
  };

  return (
    <View>
      <ImageBackground style= {styles.bgm} source= {require('../images/pic5.png')}>
      <SafeAreaView>
        <Text style={styles.text2}>SIGN UP</Text>
      </SafeAreaView>

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          phoneNumber: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={signUpValidationSchema}
        onSubmit={values => {
          storeIt(values.fullName, values.email, values.password, values.age);
        }}>
        {({handleSubmit, isValid}) => (
          <>
            <Field
              component={CustomInput}
              name="fullName"
              placeholder="Full Name"
            />
            <Field
              component={CustomInput}
              name="email"
              placeholder="Email Address"
              keyboardType="email-address"
            />
            <Field
              component={CustomInput}
              name="age"
              placeholder="age"
              keyboardType="numeric"
            />
            <Field
              component={CustomInput}
              name="password"
              placeholder="Password"
              secureTextEntry
            />
            <Field
              component={CustomInput}
              name="confirmPassword"
              placeholder="Confirm Password"
              secureTextEntry
            />
            <View style={styles.but8}>
              <Buttons
                onPress={handleSubmit}
                name="Sign Up"
                disabled={!isValid}
              />
            </View>

            <View style={styles.but9}>
              <Buttons
                onPress={() => navigation.navigate('Home')}
                name="Go Back"
              />
            </View>
          </>
        )}
      </Formik>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  text2: {
    textAlign: 'center',
    padding:5,
    color:"brown",
    fontStyle:"italic",
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom:Platform.OS === "android" ? 20 : 0
  },

  but8: {
    marginTop: Platform.OS === 'android' ? 30 : 20,
  },

  bgm:{
    height:screenHeight,
    width:screenWidth
  },

  but9: {
    marginLeft: Platform.OS === 'ios' ? 5 : 0,
  },
});

export default SignUp;
