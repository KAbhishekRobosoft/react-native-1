import React, {useCallback, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Buttons from '../component/Button';

//Function for useReducer implementation
    // const initialState = {count: 0};

    // function reducer(state, action) {
    //   switch (action.type) {
    //     case 'increment':
    //       return {count: state.count + 1};
    //     case 'decrement':
    //       return {count: state.count - 1};
    //     default:
    //       throw new Error();
    //   }
    // }

function Practice() {
  const [count, setCount] = useState(0);

//UseCallback Implementation

    //   const increment = useCallback(() => {
    //     setCount(count + 1);
    //   }, [count]);
    //   const decrement = useCallback(() => {
    //     setCount(count - 1);
    //   }, [count]);

//UseReducer usage

  //const [counterAdd,dispatch]= useReducer(reducer,initialState)

//Increment and decrement on button click

  //   function increment(){
  //     setCounter(counter + 1)
  //   }

  //   function decrement(){
  //     counter > 0 && setCounter(counter - 1)
  //   }

//Automatic time counter upto 10

  // useEffect(()=>{
  //     counter < 10 && setTimeout(()=>{
  //         setCounter(counter + 1)
  //     },1000)
  // },[counter])

  return (
    <View style={styles.counter}>
      {/*<Buttons onPress={()=>{dispatch({type:'increment'})}} name="Increment" />*/}
      <Buttons
        onPress={() => {
          increment();
        }}
        name="increment"
      />
      <Text>{count}</Text>
      <Buttons
        onPress={() => {
          decrement();
        }}
        name="decrement"
      />
      {/*<Buttons name="Decrement" onPress={()=>{dispatch({type:"decrement"})}} />*/}
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Practice;
