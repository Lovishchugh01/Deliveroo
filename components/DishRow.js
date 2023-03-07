import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { urlFor } from './../Sanity';
import styled from 'styled-components';
import Currency from 'react-currency-formatter';
import { Text } from '../typography/TextComponent';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsWithId } from '../features/basketSlice';
const Dish = styled(TouchableOpacity)`
    // background-color: #00BBCC;
    margin-top:10px;
    // border: 1px;
`
const StyledImage = styled(Image)`
    height:100px;
    width: 100%;
    background-color: grey;
    margin-right:8px;
`
const DishRows = styled(View)`
    flex-direction:row;
`
const DishText = styled(View)`
    width: 70%;
    padding: 5px;
`
const DishImage = styled(View)`
    width: 25%;
    padding-top: 5px;
`
const IconsView = styled(View)`
    flex-direction:row;
`
export const DishRow = ({ id, name, description, price, image }) => {
    const [isPressed, setIsPressed] = useState(false);
    const items = useSelector((state) => selectBasketItemsWithId(state,id));
    const dispatch = useDispatch();
    const addItemToBasket = () => {
        dispatch(addToBasket({ id, name, description, price, image }));
    };
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id, name, description, price, image }));
    };
    return (
        <>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: 'black' }} />
            </View>
            <Dish onPress={() => setIsPressed(!isPressed)}>
                <DishRows>
                    <DishText>
                        <Text variant="heading">{name}</Text>
                        <View></View>
                        <Text variant="label">{description}</Text>
                        <Text variant="simple">
                            <Currency quantity={price} currency="INR" />
                        </Text>
                    </DishText>
                    <DishImage>
                        <StyledImage
                            source={{ uri: urlFor(image.asset._ref).url() }}
                        />
                    </DishImage>
                </DishRows>
            </Dish>
            {isPressed && (
                <View>
                    <IconsView>
                        <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                            <AntDesign name='minuscircleo'
                                color={items.length > 0 ? "#00BBCC" : "grey"}
                                size={25}
                                marginRight={10}
                            />
                        </TouchableOpacity>

                        <Text variant="hint">{items.length}</Text>

                        <TouchableOpacity onPress={addItemToBasket}>
                            <AntDesign name='pluscircleo'
                                // color={items.length > 0 ? "#00BBCC" : "grey"}
                                color="#00BBCC"
                                size={25}
                                marginLeft={10}
                            />
                        </TouchableOpacity>
                    </IconsView>
                </View>

            )}
        </>
    );
};
