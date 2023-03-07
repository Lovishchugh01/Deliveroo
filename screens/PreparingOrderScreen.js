import { View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import * as Animatable from 'react-native-animatable';
import { Text } from '../typography/TextComponent';
import * as Progress from "react-native-progress";
import { useNavigation } from '@react-navigation/native';
const SafeArea = styled(SafeAreaView)`
    background-color: #00CCBB;
    justify-content: center;
    align-items: center;
    height: 100%;
`
export const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate('Delivery')
        }, 2000);
    })
  return (
    <SafeAreaView>
        <SafeArea>
      <Animatable.Image
        source={require("../assets/anim.gif")}
        iterationCount={1}
        animation="slideInUp"
        style={{width:300,height:300}}
      />
      <Text
        animation="slideInUp"
      >
        Waiting for order acceptance...
      </Text>
      <Progress.Bar size={30} marginTop={30} color="white" indeterminate={true} />
      </SafeArea>
    </SafeAreaView>
  )
}