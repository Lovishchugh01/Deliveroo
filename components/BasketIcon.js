import { View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from './../features/basketSlice';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../typography/TextComponent';
import Currency from 'react-currency-formatter';
import styled from 'styled-components';

const BasketView = styled(View)`
    position: absolute;
    bottom: 10px;
    z-index: 50;
    width: 100%;
`;
const Cart = styled(TouchableOpacity)`
flex-direction:row;
justify-content: space-between;
padding: 10px
background-color: #00BBCC;
margin: 10px;
opacity: 0.8;
border-radius: 7px;


`
export const BasketIcon = () => {
    const items = useSelector(selectBasketItems);
    const navigation = useNavigation()
    const basketTotal = useSelector(selectBasketTotal)

    if (items.length === 0) return null;
  return (
    <BasketView>
      <Cart onPress={()=> navigation.navigate('Basket')}>
        <Text variant="body" style={{backgroundColor:"#015963", padding:4}}>{ items.length }</Text>
        <Text variant="body" >View Basket</Text>
        <Text variant="body" >
            <Currency quantity={basketTotal} currency="INR"/>
        </Text>
      </Cart>
    </BasketView>
  )
}