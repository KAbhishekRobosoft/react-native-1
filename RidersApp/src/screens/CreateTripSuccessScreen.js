import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Success} from '../components/SuccessComponent';
import {deSetRegistered} from '../redux/AuthSlice';
import {deleteAllTripContacts} from '../redux/ContactSlice';
import {deleteMilestonesData} from '../redux/MileStoneSlice';
import {setInitialState} from '../redux/MileStoneSlice';
import {emptySetTo} from '../redux/MileStoneSlice';
import {deleteContactsData} from '../redux/ContactSlice';
export const CreateTripSuccess = ({navigation}) => {
  const auth = useSelector(state => state.auth);
  const state = useSelector(state => state.milestone.initialState);
 
  const dispatch = useDispatch();
  return (
    <Success
      greet="Success!!"
      text2="You have created a new trip"
      onPress={() => {
        if (auth.registered) {
          dispatch(deSetRegistered());
          dispatch(deleteAllTripContacts());
          dispatch(deleteMilestonesData());
          dispatch(deleteContactsData());
        } else {
          dispatch(deleteAllTripContacts());
          dispatch(deleteMilestonesData());
          dispatch(deleteContactsData());
          dispatch(setInitialState(state));
          dispatch(emptySetTo());
          navigation.navigate("BottomTabLoginNavigation")
        }
      }}
    />
  );
};
