import React,{useContext} from 'react';
import {ScrollView,StyleSheet, View} from 'react-native';
import Center from '../component/row/Center';
import FlexEnd from '../component/row/FlexEnd';
import FlexStart from '../component/row/FlexStart';
import FlexWrap from '../component/row/FlexWrap';
import SpaceAround from '../component/row/SpaceAround';
import SpaceBetween from '../component/row/SpaceBetween';
import AlignStretch from '../component/column/AlignStretch';
import AlignSelf from '../component/column/AlignSelf';
import WrapReverse from '../component/row/WrapReverse';
import FlexSize from '../component/row/FlexSize';
import Buttons from '../component/Buttons';
import { AuthContext } from '../context/AuthContext';

function Flex() {
  const {signOut}= useContext(AuthContext)
  
  const goHome= ()=>{
    signOut()
  }

  return (
    <View>
        <Buttons onPress={goHome} name="Sign Out" />
    
    <ScrollView>
      <SpaceBetween />
      <WrapReverse />
      <FlexStart />
      <FlexEnd />
      <FlexSize />
      <SpaceAround />
      <FlexWrap />
      <Center />
      <AlignStretch />
      <AlignSelf />
    </ScrollView>
  </View>
  );
}

export default Flex;