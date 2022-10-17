import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function PasswordToggleInput() {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [iconName, setIconName] = useState('eye');

  function onIconPress() {
    let iconName = secureTextEntry ? 'eye-slash' : 'eye';
    setSecureTextEntry(!secureTextEntry);
    setIconName(iconName);
  }

  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View>
          <TextInput
            value={value}
            placeholderTextColor={'#cacdd2'}
            secureTextEntry={secureTextEntry}
            style={[styles.textInput, hasError && styles.errorInput]}
          />
        </View>
        <View
          style={{
            backgroundColor: 'white',
            height: 50,
            borderBottomRightRadius: 6,
            borderTopRightRadius: 6,
          }}>
          <TouchableOpacity onPress={onIconPress}>
            <Icon style={{margin: 15}} name={iconName} size={20} />
          </TouchableOpacity>
        </View>
      </View>
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'white',
    height: 50,
    width: 275,
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    padding: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PasswordInput;
