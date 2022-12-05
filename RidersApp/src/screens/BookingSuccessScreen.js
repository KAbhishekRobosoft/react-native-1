import React from 'react';
import { Success } from '../components/SuccessComponent';

export const BookingSuccess = ({navigation}) => {
  return (
    <Success greet='Congratulations!' text2='Your booking has been confirmed' onPress={()=>navigation.navigate('BottomTabLoginNavigation')} Press={()=>navigation.goBack()}/>
  );
};
