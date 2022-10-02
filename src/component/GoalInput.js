import React,{ useState} from 'react'
import {View,Image, Modal,TextInput,StyleSheet, Platform} from 'react-native'
import Buttons from './Buttons';

function GoalInput(props) {
    const [enteredGoalText, setEnteredGoalText] = useState();

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
      }

    function addGoalHandler(){
        props.onAddGoal(enteredGoalText)
        setEnteredGoalText('')

    }
  
    return (
    
    <Modal animationType="slide" visible= {props.visible}>
  
    <View style={styles.inputContainer}>
      <Image style={styles.img5} source= {require('../images/img1.jpg')}></Image>
    <TextInput
      style={styles.textInput}
      placeholder="Your course goal!"
      onChangeText={goalInputHandler}
      value= {enteredGoalText}
      placeholderTextColor="white"
    />
    <View style= {styles.but1}>
      <Buttons name="Add Goal" onPress={addGoalHandler} />
    </View>

    <View style= {styles.but2}>
      <Buttons name="Cancel" onPress={props.onClose} />
    </View>
  </View>
  </Modal>
  )
}

const styles= StyleSheet.create({
    inputContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 1,
        marginBottom: 24,
        borderBottomColor: '#cccccc',
        alignItems: 'center',
        paddingBottom: 24,
        padding:10,
        backgroundColor:"#4c00b0",
      },

      img5:{
          width:70,
          height:90,
          marginBottom:30,
          marginRight:10
      },
    
      textInput: {
        borderWidth: 2,
        borderColor: '#cccccc',
        width: '70%',
        marginRight: 8,
        padding: 8,
        fontSize:20,
        color:"white"
      },

      but1:{
        marginTop:20,
      }
})

export default GoalInput;