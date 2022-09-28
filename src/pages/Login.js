import React,{useContext} from 'react'
import {View,TextInput,StyleSheet,Text} from 'react-native'
import Buttons from '../component/Buttons';
import { Formik } from 'formik';
import * as yup from 'yup'
import { AuthContext } from '../context/AuthContext';
import { SignIn } from '../services/Auth';


function Login({navigation}) {
  const {signIn}= useContext(AuthContext)

  const goBack= (values)=>{
    navigation.navigate('Home')
  }

  const run= async (values)=>{
      const{name,token}= await SignIn(values)
      alert("Hello"+" "+name)
      signIn(values.email.toLowerCase(),token)
  }

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  })

    return (
      <View style={styles.loginContainer}>
      <Text style={styles.text1}>Login Screen</Text>
      <Formik
        validationSchema={loginValidationSchema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values)=>{run(values)}}
      >
        {({ handleChange, handleBlur, handleSubmit, errors,values }) => (
          <>
            <TextInput
              name="email"
              placeholder="Username"
              style={styles.textInput}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && <Text style= {{fontSize:10,color:'red'}}>{errors.email}</Text>}
            <TextInput
              name="password"
              placeholder="Password"
              style={styles.textInput}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password &&
         <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
       }
             <Buttons onPress={handleSubmit} name="Submit" />
             <Buttons onPress={goBack} name="Go Back" />
         </>
        )}
      </Formik>
    </View>
    )

}

const styles = StyleSheet.create({

  text1:{
      fontSize:20,
      marginBottom:10,
      fontWeight:"bold"

  },  

  loginContainer: {
    flex:1,
    justifyContent:"center",
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6'
  },
  textInput: {
    height: 40,
    width: '70%',
    textAlign:"center",
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 3,
    borderRadius: 10,
    fontWeight:"bold",
    borderWidth:2,
    fontSize:20
  },

   but: {
        backgroundColor: 'orange',
        borderRadius: 10,
        padding:10,
        width: 200,
        marginTop:10,
        width:250
        },

        text1:{
          textAlign:"center",
          fontSize:18,
          fontWeight:"bold"
        },
        con:{
          marginTop:30,
          alignItems:"center",
          margin:10
        }
})

export default Login