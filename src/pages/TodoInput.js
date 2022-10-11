import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import CommonButton from '../components/CommonButton'
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

function TodoInput(props) {
  const [todo, setTodo] = useState('');

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

  todoInput: {
    width: '70%',
    borderBottomWidth: 1,
    fontSize: 20,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
