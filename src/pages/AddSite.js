import React from 'react';
import {View,StyleSheet} from 'react-native';
import Details from '../utils/Details';
import DropDown from '../utils/DropDown';
import PasswordToggleInput from '../component/PasswordToggleInput';

function AddSite() {
  return (
    <View style={StyleSheet.main_con}>
      <View style={styles.inputView}>
        <Details name="URL" />
      </View>
      <Details name="Site Name" />
      <DropDown name= "Sector/Folder" />
      <Details name="User Name" />
    
    </View>
  );
}

const styles = StyleSheet.create({
  main_con: {
    flex: 1,
  },

  inputView:{
    marginTop:70
  }
});

export default AddSite;
