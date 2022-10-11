import React,{useState} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View, Button} from 'react-native';
import {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
} from '../redux/Reducer';
import TodoItem from '../components/TodoItem';

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

function TodoTrend(props) {
  const [sort, setSort] = useState('active');
  return (
    <View style={styles.displaytodos}>
      <View style={styles.buttons}>
        <Button onPress={() => setSort('active')} title="Active" />
        <Button onPress={() => setSort('completed')} title="Completed" />
        <Button onPress={() => setSort('all')} title="All" />
      </View>
      <View>
        {props.todos.length > 0 && sort === 'active'
          ? props.todos.map(item => {
              return (
                item.completed === false && (
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

        {props.todos.length > 0 && sort === 'completed'
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

        {props.todos.length > 0 && sort === 'all'
          ? props.todos.map(item => {
              return (
                <TodoItem
                  key={item.id}
                  itemData={item}
                  removeTodo={props.removeTodo}
                  updateTodo={props.updateTodo}
                  completeTodo={props.completeTodo}
                />
              );
            })
          : null}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoTrend);
