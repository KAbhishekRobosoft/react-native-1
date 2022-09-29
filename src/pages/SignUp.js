import React,{useContext} from 'react'
import CustomInput from '../component/CustomInput'
import {View,Text,StyleSheet, Platform} from 'react-native'
import { Formik,Field } from 'formik';
import * as yup from 'yup'
import Buttons from '../component/Buttons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Register } from '../services/Auth';
import { AuthContext } from '../context/AuthContext';
export let accName
export let accEmail
export let accAge

 function SignUp({navigation}) {
    const {signUp}= useContext(AuthContext)
    const storeIt= async (name,email,password,age)=>{
        const {userEmail,token,userFullName,userAge}= await Register(name,email,password,age)
        accName= userFullName
        accEmail= userEmail
        accAge= userAge
        alert("Welcome to flex Family"+" "+name)
        signUp(userEmail,token)
    }

    const signUpValidationSchema = yup.object().shape({

        fullName: yup
          .string()
          .matches(/(\w.+\s).+/, 'Enter at least 2 names')
          .required('Full name is required'),
        age: yup
          .string()
          .matches(/[^0](\d)+/, 'Enter a valid age')
          .required('Phone number is required'),
        email: yup
          .string()
          .email("Please enter valid email")
          .required('Email is required'),
        password: yup
          .string()
          .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
          .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
          .matches(/\d/, "Password must have a number")
          .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
          .min(8, ({ min }) => `Password must be at least ${min} characters`)
          .required('Password is required'),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref('password')], 'Passwords do not match')
          .required('Confirm password is required'),
      })

  return (
   <View>
    <SafeAreaView>
        <Text style={styles.text2}>Sign Up Screen</Text>
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
  onSubmit={(values)=>{storeIt(values.fullName.toLowerCase(),values.email.toLowerCase(),values.password,values.age)}}
>
  {({ handleSubmit, isValid }) => (
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
              <View style= {styles.but8}>
                <Buttons
                  onPress={handleSubmit}
                  name="Sign Up"
                  disabled={!isValid}
                />
                </View>

              <View style={styles.but9}>
                <Buttons
                  onPress={()=>navigation.navigate('Home')}
                  name="Go Back"
                  disabled={!isValid}
                />
              </View>


    </>
  )}
</Formik>
   </View>
  )
}

const styles= StyleSheet.create({
    text2:{
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold",
        marginTop:10
    },

    but8:{
      marginLeft:Platform.OS=== "ios" ? 20 : 20,
      marginTop:Platform.OS === "android" ? 30 : 0
    },

    but9:{
      marginLeft:Platform.OS=== "ios" ? 20 : 20
    }


})

export default SignUp