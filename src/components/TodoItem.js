import React,{useState} from 'react';
import {View,Button,StyleSheet,TextInput,Text}from 'react-native'

function TodoItem(props) {
  const [text, setText] = useState('');
  const [updateVisible, setupdateVisible] = useState(false);
  const {itemData, updateTodo, removeTodo, completeTodo} = props;

  function setInputText(inputText) {
    setText(inputText);
    setupdateVisible(true);
  }

  function changeText(id) {
    updateTodo({id, item: text});
    setupdateVisible(false);
  }

  return (
    <View style={styles.inputDisplay} key={itemData.id}>
      <TextInput
        style={styles.displayInput}
        defaultValue={itemData.item}
        onChangeText={setInputText}
      />
      <View style={styles.workBut}>
        {updateVisible && (
          <Button onPress={() => changeText(itemData.id)} title="Update" />
        )}
        <Button onPress={() => removeTodo(itemData.id)} title="Remove" />
        <Button
          onPress={() => completeTodo(itemData.id)}
          title="Completed"
        />
      </View>
      {itemData.completed && <Text style={styles.displayCom}>done</Text>}
    </View>
  );
}

const styles= StyleSheet.create({
    inputDisplay:{
      marginTop:30
    },

    displayInput:{
      textAlign:"center"
    },

    workBut:{
      flexDirection:"row",
      justifyContent:"center"
    },

    displayCom:{
      textAlign:"center"
    }
})

export default TodoItem;
