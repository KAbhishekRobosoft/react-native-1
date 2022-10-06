import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Buttons from '../component/Button';
import {Formik, Field} from 'formik';
import {AuthContext} from '../context/AuthContext';
import { checkCredentials } from '../services/Auth';
import CustomInput from '../component/CustomInput';
import { loginValidationSchema } from '../utils/Validation';
import {SafeAreaView} from 'react-native-safe-area-context';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

function Login({navigation}) {
  const {signIn} = useContext(AuthContext);

  const home = () => {
    navigation.navigate('Home');
  };

  const sendInputData = async userData => {
    const getToken = await checkCredentials(userData);
    if(getToken !== undefined)
      signIn(getToken);
    else
      alert("User does not exist")
  };

  return (
    <View style={styles.logCon}>
      <ImageBackground
        style={styles.bgm}
        source={require('../images/pic4.jpg')}>
        <SafeAreaView>
          <Text style={styles.text1}>LOGIN</Text>
        </SafeAreaView>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={{email: '', password: ''}}
          onSubmit={values => {
            sendInputData(values);
          }}>
          {({handleSubmit}) => (
            <>
              <Field
                component={CustomInput}
                name="email"
                placeholder="Email Address"
                keyboardType="email-address"
              />

              <Field
                component={CustomInput}
                name="password"
                placeholder="Password"
                secureTextEntry
              />
              <View style={styles.butCon}>
                <Buttons onPress={handleSubmit} name="Submit" />
                <Buttons onPress={home} name="Go Back" />
              </View>
            </>
          )}
        </Formik>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  text1: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
    marginTop: Platform.OS === 'android' ? 110 : 160,
    marginBottom: Platform.OS === 'android' ? 20 : 0,
  },

  bgm: {
    height: screenHeight,
    width: screenWidth,
  },

  butCon: {
    marginTop: Platform.OS === 'android' ? 20 : 20,
  },
});

export default Login;
