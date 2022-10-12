import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  Dimensions,
  StyleSheet,
  Pressable,
  ImageBackground,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {
  addTodos,
  removeTodos,
  updateTodos,
  completeTodos,
} from '../redux/Reducer';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

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
  return (
    <View style={styles.mainCon}>
      <ImageBackground
        style={styles.back}
        source={require('../images/pic1.jpg')}>
        <Text style={styles.txtDes}>Todo Marker</Text>
        <View style={styles.workCon}>
          <View>
            <Image source={require('../images/pic2.jpg')} />
          </View>
          <View style={styles.addTodos}>
            <TextInput
              onChangeText={handleChange}
              placeholder="Enter your Goal"
              style={styles.todoInput}
            />
            <Pressable
              style={styles.butSty}
              onPress={() => {
                props.addTodo({
                  id: Math.floor(Math.random() * 1000),
                  item: todo,
                  completed: false,
                });
                alert('Goal added');
              }}>
              <Text style={styles.addText}>Add Goal</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.backImg}></View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  addTodos: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 50,
    marginTop: 40,
  },

  butSty: {
    marginTop: 10,
    backgroundColor: 'purple',
    padding: 10,
    width: 150,
    borderRadius: 10,
  },

  iconDes: {
    marginLeft: 145,
  },

  workCon: {
    backgroundColor: 'white',
    margin: 10,
    marginTop: Platform.OS === 'ios' ? 100 : 50,
    padding: 5,
    shadowColor: 'black',
    shadowOffset: {width: -6, height: 8},
    shadowOpacity: 0.9,
    shadowRadius: 3,
  },

  addText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  back: {
    width: screenWidth,
    height: screenHeight,
  },

  textCon: {
    marginBottom: 90,
  },

  txtDes: {
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 50 : 70,
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  mainCon: {
    flex: 1,
  },

  todoInput: {
    width: '70%',
    borderBottomWidth: 2,
    fontSize: 20,
    marginBottom: 10,
    padding: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoInput);
