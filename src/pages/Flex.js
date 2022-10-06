import React from 'react';
import {ScrollView, View} from 'react-native';
import Center from '../utils/row/Center'
import FlexEnd from '../utils/row/FlexEnd'
import FlexStart from '../utils/row/FlexStart';
import FlexWrap from '../utils/row/FlexWrap';
import SpaceAround from '../utils/row/SpaceAround';
import SpaceBetween from '../utils/row/SpaceBetween';
import AlignStretch from '../utils/column/AlignStretch'
import AlignSelf from '../utils/column/AlignSelf';
import WrapReverse from '../utils/row/WrapReverse';
import FlexSize from '../utils/row/FlexSize';

function Flex() {
  return (
    <View>
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
