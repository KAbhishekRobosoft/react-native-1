import React from 'react';
import {View, StyleSheet, Text, Pressable, Platform} from 'react-native';

const Buttons = ({onPress, name,disabled}) => {
  return (
    <View style={styles.con}>
      <Pressable style={styles.but} onPress={onPress} disabled= {disabled}>
        <Text style={styles.text1}>{name}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  but: {
    backgroundColor: 'orange',
    borderRadius: 10,
    padding: 10,
    width: 220,
  },

  text1: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },

  con: {
    alignItems: 'center',
    margin: 10,
 
  },
});

export default Buttons;
