import React from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';

const CustomInput = props => {
  const {
    field: {name, onBlur, onChange, value,editable,defaultValue,multiLine,numberOfLines},
    form: {setFieldTouched},
    ...inputProps
  } = props;


  return (
    <View style={styles.textInpView1}>
    <TextInput
      style={styles.textInp1}
      editable={editable}
      value={value}
      defaultValue={defaultValue}
      multiline={multiLine}
      numberOfLines={numberOfLines}
      onChangeText={text => onChange(name)(text)}
      onBlur={() => {
        setFieldTouched(name);
        onBlur(name);
      }}
      {...inputProps}
    />
  </View>
  );
};


const styles = StyleSheet.create({
  textInpView1: {
    padding: 10,
    alignItems:"center"
  },

  textInp1: {
    height: Platform.OS === "ios" ? 45 : 40,
    width: 330,
    borderWidth: Platform.OS === "ios" ?  2 : 1,
    borderColor: Platform.OS === "ios" ? '#e9e9ea' : 'black',
    borderRadius: 6,
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f5f7fb',
  },
});


export default CustomInput;
