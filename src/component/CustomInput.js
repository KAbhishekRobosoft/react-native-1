import React from 'react';
import {
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  View,
  Platform,
} from 'react-native';

const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value},
    form: {errors, touched, setFieldTouched},
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <KeyboardAvoidingView>
      <View style={styles.con}>
          <TextInput
            style={[styles.textInput, hasError && styles.errorInput]}
            value={value}
            onChangeText={text => onChange(name)(text)}
            onBlur={() => {
              setFieldTouched(name);
              onBlur(name);
            }}
            {...inputProps}
          />
          {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 45,
    width: '100%',
    padding:15,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    fontWeight: 'bold',
    shadowColor: 'black',
    shadowOffset: {width: -2, height: 8},
    shadowOpacity: 0.7,
  },

  con: {
    width: '60%',
    marginLeft: 78,
    marginTop: Platform.OS === 'android' ? 20: 27,
  },

  errorText: {
    fontSize: 10,
    color: 'red',
    fontWeight:"bold"
  },
  errorInput: {
    borderColor: 'red',
  },
});

export default CustomInput;
