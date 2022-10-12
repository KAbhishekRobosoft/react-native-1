import React from 'react';
import {Pressable, View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

function CommonButton({name, onPress, iconName}) {
  return (
    <View style={styles.butCon}>
      <View style={styles.icon}>
        <Icon style={styles.iconIn} name={iconName} />
      </View>
      <View style={styles.butDes}>
        <Pressable style={styles.but} onPress={onPress}>
          <Text style={styles.butInp}>{name}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  butCon: {
    padding: 10,
  },

  iconIn:{
    color:"red",
    margin:5
  },

  butDes:{
    backgroundColor:"orange",
    padding:5,
    borderRadius:5
  },

  icon:{
    marginLeft:25,
  },

  butInp: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight:"bold"
  },
});
export default CommonButton;
