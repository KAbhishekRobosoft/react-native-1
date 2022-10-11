import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import CommonButton from './CommonButton';
import {connect} from 'react-redux';
import {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
} from '../redux/Reducer';

const mapStateToProps = state => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTodo: obj => dispatch(addTodos(obj)),
    removeTodo: id => dispatch(removeTodos(id)),
    updateTodo: obj => dispatch(updateTodos(obj)),
    completeTodo: id => dispatch(completeTodos(id)),
  };
};

function Todos(props) {
  const [todo, setTodo] = useState('');
  // const [text, setText] = useState('');
  // const [updateVisible, setupdateVisible] = useState(false);

  // function setInputText(inputText) {
  //   setText(inputText);
  //   setupdateVisible(true);
  // }

  // function changeText(id) {
  //   props.updateTodo({id, item: text});
  //   setupdateVisible(false);
  // }

  function handleChange(curTextInput) {
    setTodo(curTextInput);
  }
  console.log(props);
  return (
      <View style={styles.addTodos}>
        <TextInput
          onChangeText={handleChange}
          placeholder="Enter your Goal"
          style={styles.todoInput}
        />
        <CommonButton
          name="OK"
          onPress={() =>
            props.addTodo({
              id: Math.floor(Math.random() * 1000),
              item: todo,
              completed: false,
            })
          }
        />
      {/* <View style={styles.mapInput}>
        {props.todos.map(itemData => {
          return (
             <View style={styles.inputDisplay} key={itemData.id}>
              <TextInput
                style={styles.displayInput}
                defaultValue={itemData.item}
                onChangeText={setInputText}
              />
              <View style={styles.workBut}>
                {updateVisible && (
                  <Button
                    onPress={() => changeText(itemData.id)}
                    title="Update"
                  />
                )}
                <Button
                  onPress={() => props.removeTodo(itemData.id)}
                  title="Remove"
                />
                <Button
                  onPress={() => props.completeTodo(itemData.id)}
                  title="Completed"
                />
              </View>
            </View>
          );
        })}
      </View> */}
      </View>
  );
}

const styles = StyleSheet.create({
  addTodos: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginTop: 70,
  },

  workBut: {
    flexDirection: 'row',
  },

  inputDisplay: {
    alignItems: 'center',
  },

  displayInput: {
    fontSize: 20,
  },

  mainCon: {
    flex: 1,
  },

  todoInput: {
    width: '70%',
    borderBottomWidth: 1,
    fontSize: 20,
  },

  mapInput: {
    flex: 5,
    alignItems: 'center',
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
