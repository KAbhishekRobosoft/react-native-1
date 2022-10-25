import React from 'react';
import {View, StyleSheet,ScrollView} from 'react-native';
import CustomInput from '../component/CustomInput';
import {Formik, Field} from 'formik';
import Button from '../component/AuthenticationButton';
import LinearGradient from 'react-native-linear-gradient';
import PasswordToggleInput from '../component/PasswordToggleInput';
import Toast from 'react-native-simple-toast';

function SignUp({navigation}) {

  const initialValues= {
    phoneNumber: '',
    password: '',
    confirmPassword:''
  }

  return (
    <LinearGradient colors={['#1baaff', '#0e85ff']} style={styles.main_con}> 
    <ScrollView>
    <Formik
          initialValues={{initialValues}}
          onSubmit={(values,{resetForm}) => {

            if (!/(91)(\d){10}\b/.test(values.phoneNumber) ) {
              if((values.password !== values.confirmPassword) || values.password.length !== 4)
                Toast.show('Enter proper credentials');
              
            }

            if (/(91)(\d){10}\b/.test(values.phoneNumber) ) {
              if((values.password !== values.confirmPassword) || values.password.length !== 4)
                Toast.show('Enter Proper Password');
              
            }

            if (!(/(91)(\d){10}\b/.test(values.phoneNumber))) {
              if((values.password === values.confirmPassword) || values.password.length === 4)
                Toast.show('Enter Mobile number with 91');
            }
        
            if(/(91)(\d){10}\b/.test(values.phoneNumber)){
              if(values.password === values.confirmPassword || values.password.length === 4){
                    resetForm({initialValues})
                    Toast.show('Sign In Please');
                    navigation.navigate('Sign In');
              }
            }
          }}>
          {({handleSubmit, isValid}) => (
            <>
              <View style={{marginTop:10}}>
                <Field
                  component={CustomInput}
                  name="phoneNumber"
                  placeholder="Enter Mobile Number"
                  keyboardType="numeric"
                />
              </View>
              <View style={{marginBottom: 20}}>
                <Field
                  component={CustomInput}
                  name="password"
                  placeholder="Enter 4 digit MPin"
                  secureTextEntry
                />
              </View>

              <View>
                <Field
                  component={PasswordToggleInput}
                  name="confirmPassword"
                  placeholder="Re-enter 4 digit MPin"
                  secureTextEntry
                />
              </View>

              <View style={styles.butView}>
                <Button
                  onPress={handleSubmit}
                  name="SIGN IN"
                  disabled={!isValid}
                />
              </View>
            </>
          )}
        </Formik>
        </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
    alignItems: 'center',
  },

  forgotText: {
    marginTop: 20,
    marginRight: 170,
  },

  workCon: {
    marginTop: 60,
  },

  finger: {
    marginTop: 50,
  },

  textCon: {
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 60,
    alignItems: 'center',
  },

  text1: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },

  text2: {
    marginLeft: 20,
    color: 'white',
  },

  forgotDes: {
    color: 'white',
    fontWeight: 'bold',
  },

  butView: {
    height: 40,
    width: '40%',
    backgroundColor: 'white',
    marginTop: 40,
    marginRight: 200,
    borderRadius: 6,
  },

  textInp1: {
    backgroundColor: 'white',
    height: 50,
    width: 330,
    borderRadius: 6,
    padding: 10,
    fontWeight: 'bold',
  },
});
export default SignUp;