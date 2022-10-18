import React from 'react';
import {View,TextInput, StyleSheet, Platform} from 'react-native';

function Details(props) {
  const {
    field: {name, onBlur, onChange, value},
    form: {setFieldTouched},
    ...inputProps
  } = props;

  return (
    <View style={styles.textInpView1}>
      <TextInput
        style={styles.textInp1}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  textInpView1: {
    padding: 20,
    justifyContent:"center"
  },

  textInp1: {
    height: 45,
    width: 330,
    borderWidth: Platform.OS === "ios" ?  2 : 1,
    borderColor: Platform.OS === "ios" ? '#e9e9ea' : 'black',
    borderRadius: 6,
    fontSize: 16,
    padding: 10,
    backgroundColor: '#f5f7fb',
  },
});

export default Details;
