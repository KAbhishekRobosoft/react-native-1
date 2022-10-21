import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function PasswordToggleInput(props) {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [iconName, setIconName] = useState('eye');

  function onIconPress() {
    let iconName = secureTextEntry ? 'eye-slash' : 'eye';
    setSecureTextEntry(!secureTextEntry);
    setIconName(iconName);
  }

  const {
    field: {name, onBlur, onChange,value,defaultValue,editable},
    form: {setFieldTouched},
    ...inputProps
  } = props;


  return (
    <View style={styles.main_con}>
    <View>
      <TextInput
        defaultValue={defaultValue}
        editable={editable}
        value={value}
        onChangeText={text => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
        secureTextEntry={secureTextEntry}
        style={styles.textInput}
      />
    </View>
    <View
      style={styles.icon}>
      <TouchableOpacity onPress={onIconPress}>
        <Icon style={{margin: 15}} name={iconName} size={15} />
      </TouchableOpacity>
    </View>
  </View>
  );
}

const styles = StyleSheet.create({
  main_con: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop:15
  },

  icon:{
    backgroundColor: '#f5f7fb',
    borderBottomWidth:Platform.OS === "ios" ? 2 : 1,
    borderTopWidth:Platform.OS === "ios" ? 2 : 1,
    borderRightWidth:Platform.OS === "ios" ? 2 : 1,
    height: 45,
    borderBottomRightRadius: 6,
    borderColor:Platform.OS === "ios" ? '#e9e9ea' : 'black',
    borderTopRightRadius: 6,
  },

  textInput: {
    backgroundColor: '#f5f7fb',
    height: 45,
    borderBottomWidth:Platform.OS === "ios" ? 2 : 1,
    borderTopWidth:Platform.OS === "ios" ? 2 : 1,
    borderLeftWidth:Platform.OS === "ios" ? 2 : 1,
    borderColor:Platform.OS === "ios" ? '#e9e9ea': 'black',
    width: 275,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    padding: 15,
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default PasswordToggleInput;