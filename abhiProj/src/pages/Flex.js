import React from 'react';
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



function Flex({navigation}) {
  const goHome= ()=>{
    navigation.navigate('Home')
  }

  return (
    <View>
        <Buttons onPress={goHome} name="Go Home" />
    
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