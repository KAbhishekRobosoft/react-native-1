import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {View, Text} from 'react-native';

const data = [
  {label: 'Social Media', value: 'Social Media'},
];

const DropDown = props => {
  const [isFocus, setIsFocus] = useState(false);

  const {
    field: {name, onBlur, onChange, value},
    form: {touched, setFieldTouched},
    ...inputProps
  } = props;

  return (
    <View style={styles.dropView}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setIsFocus(false);
          onChange(name)(item.value)
        }}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 45,
    borderWidth: Platform.OS === 'ios' ? 2 : 1,
    padding: 10,
    width: 330,
    borderRadius: 6,
    borderColor: Platform.OS === 'ios' ? '#e9e9ea' : 'black',
    backgroundColor: '#f5f7fb',
  },

  dropView: {
    padding: 20,
  },

  text1: {
    fontSize: 20,
    color: '#c9ccd1',
  },

  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
