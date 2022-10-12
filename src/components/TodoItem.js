import React, {useState} from 'react';
import {View,StyleSheet, TextInput, Text} from 'react-native';
import CommonButton from './CommonButton';

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
      <View style={styles.inputContent}>
        <View style={styles.fronttext}>
          <Text style={styles.textDesign}>Task:</Text>
          <View style={styles.donetext}>
            {itemData.completed && <Text style={styles.displayCom}>done</Text>}
          </View>
        </View>
        <View style={styles.textInput}>
           <TextInput
            style={styles.displayInput}
            defaultValue={itemData.item}
            onChangeText={setInputText}
            editable= {!(itemData.completed)}
          />
        </View>
        <View style={styles.workBut}>
          {updateVisible && (
            <CommonButton onPress={() => changeText(itemData.id)} name="Update" iconName="plus" title="Update" />
          )}

          <CommonButton onPress={() => removeTodo(itemData.id)} iconName="ban" name="Remove" />
          {!(itemData.completed) && <CommonButton onPress={() => completeTodo(itemData.id)} name= "Completed" iconName="flag-checkered" title="Completed" />}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputDisplay: {
    marginTop: 30,
    backgroundColor: 'white',
    margin: 10,
    height: Platform.OS === "ios" ? 140 : 180,
    borderRadius:10,
    shadowColor: 'black',
    shadowOffset: {width: -6, height: 8},
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },

  textDesign: {
    fontSize: 20,
    color:"black"
  },

  donetext:{
    borderRadius:10,
    padding:5,
    backgroundColor: 'purple',
  },

  fronttext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  displayInput: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight:"bold",
    color:"black"
  },

  inputContent: {
    margin: 10,
  },

  workBut: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:5
  },

  displayCom: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TodoItem;
