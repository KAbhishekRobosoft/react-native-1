import React from 'react'
import { Text, TextInput,KeyboardAvoidingView, StyleSheet,View, Platform } from 'react-native'

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props

  const hasError = errors[name] && touched[name]

  return (
    <KeyboardAvoidingView>
    <View style={styles.con}>
    <View>
      <TextInput
        style={[
          styles.textInput,
          hasError && styles.errorInput
        ]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name)
          onBlur(name)
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
    </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '90%',
    marginTop: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    textAlign:"center",
    fontWeight:"bold"
  },

  con:{
      width:'60%',
      marginLeft:90,
      marginTop:Platform.OS === "android" ? 10 : 40,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
  },
  errorInput: {
    borderColor: 'red',
  }
})

export default CustomInput