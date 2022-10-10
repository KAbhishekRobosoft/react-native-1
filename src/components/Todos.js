import React from 'react';
import {View, TextInput,StyleSheet} from 'react-native';
import Button from './Button';

function Todos() {
  return (
    <View style={styles.addTodos}>
      <TextInput placeholder="Enter your Goal" style={styles.todoInput} />
      <Button name= "OK" />
      </View>
  );
}

const styles = StyleSheet.create({
  addTodos:{
    justifyContent:"space-between",
    flexDirection:"row",
    paddingHorizontal:16,
    alignItems:"center",
    marginTop:20
  },

  todoInput:{
    width:"70%",
    borderBottomWidth:1,
    fontSize:20
  }
});
export default Todos;
