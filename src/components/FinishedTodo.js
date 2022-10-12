import React from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
} from '../redux/Reducer';
import TodoItem from './TodoItem';

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

function FinishedTodo(props) {
  return (
    <ScrollView>
    <View>
    {props.todos.length > 0
          ? props.todos.map(item => {
              return (
                item.completed === true && (
                  <TodoItem
                    key={item.id}
                    itemData={item}
                    removeTodo={props.removeTodo}
                    updateTodo={props.updateTodo}
                    completeTodo={props.completeTodo}
                  />
                )
              );
            })
          : null}
          </View>
          </ScrollView>
  )
}
export default connect(mapStateToProps, mapDispatchToProps)(FinishedTodo);
