import React, {useState} from 'react';

import {View, StyleSheet, FlatList} from 'react-native';

import GoalInput from '../component/GoalInput';
import GoalItem from '../component/GoalItem';
import Buttons from '../component/Buttons';

function Todo() {
  const [courseGoals, setcourseGoals] = useState([]);
  const [openModal, setopenModal] = useState(false);

  function willOpenModal() {
    setopenModal(true);
  }

  function willCloseModal() {
    setopenModal(false);
  }

  function addGoalHandler(enteredGoalText) {
    if (/^\s*$/.test(enteredGoalText)) 
      alert('Enter valid Goal');

    else {
      setcourseGoals(currentCourseGoals => [
        ...currentCourseGoals,
        {text: enteredGoalText, id: Math.random().toString()},
      ]);
      willCloseModal();
    }
  }

  function deleteGoalHandler(id) {
    setcourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter(ele => ele.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <Buttons name="Add Goals" onPress={willOpenModal}></Buttons>
      <GoalInput
        visible={openModal}
        onAddGoal={addGoalHandler}
        onClose={willCloseModal}
      />
      <View style={styles.goalsContainer}>
        <FlatList
          data={courseGoals}
          renderItem={itemData => {
            return (
              <GoalItem
                onDeleteItem={deleteGoalHandler}
                text={itemData.item.text}
                id={itemData.item.id}
              />
            );
          }}
          keyExtractor={item => {
            return item.id;
          }}
          alwaysBounceVertical="false"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 70,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 5,
  },
});

export default Todo;
