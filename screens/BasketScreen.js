import { View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState, useMemo } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectRestaurant } from './../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from './../features/basketSlice';
import { Text } from '../typography/TextComponent';
import { Entypo } from '@expo/vector-icons';
import styled from 'styled-components';
import { urlFor } from '../Sanity';
import Currency from 'react-currency-formatter';

const HeaderView = styled(View)`
    align-items:center;
    flex-direction:row;
`
const TextView = styled(View)`
    align-items:center;
    margin: auto;
`
const CrossButton = styled(TouchableOpacity)`
    position: absolute;
    right:10px;
`
const StyledImage = styled(Image)`
    height:17px;
    width: 17px;
    padding: 20px;
    border-radius: 50px;
    background-color: grey;
    margin-right:8px;
`
const DeliveryView = styled(View)`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    background-color: #e2e7eb;
`
const StyledImageRestaurant =  styled(Image)`
    height:50px;
    width: 50px;
    border-radius: 50px;
    background-color: grey;
    margin-right:8px;
`
const ListView = styled(View)`
    flex-direction: row;
    align-items: center;
    padding:4px;
    background-color: white;
    
`
const RemoveButton = styled(TouchableOpacity)`
    marginLeft:auto;
    padding-Right:10px;
`
const TotalView = styled(View)`
    padding: 10px;
    background-color: #FFF;
`
const Total = styled(View)`
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
`
const PlaceButton = styled(TouchableOpacity)`
    background-color: #00BBCC;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
`

export const BasketScreen = () => {
    const navigation = useNavigation();

    const restaurant = useSelector(selectRestaurant);

    const items = useSelector(selectBasketItems);

    const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);

    const dispatch = useDispatch();

    const basketTotal = useSelector(selectBasketTotal);

    useMemo(() => {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {})
        setGroupedItemsInBasket(groupedItems);
    }, [items])

    // console.log(groupedItemsInBasket);
    return (
        <SafeAreaView flex={1}>
            <View >
                <HeaderView>
                    <TextView paddingLeft={10} >
                        <Text variant="heading">Basket</Text>
                        <Text variant="simple">{restaurant.title}</Text>
                    </TextView>
                    <CrossButton>
                        <Entypo name="circle-with-cross" paddingRight={10} size={30} color="#00BBCC" />
                    </CrossButton>
                </HeaderView>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, marginBottom: 10 }}>
                    <View style={{ flex: 1, height: 2, backgroundColor: '#00BBCC' }} />
                </View>
            </View>

            <DeliveryView>
                <StyledImage
                    source={{
                        uri: "https://links.papareact.com/wru"
                    }}
                />
                <Text variant="label"> Deliver in 50-60 min</Text>
                <TouchableOpacity >
                    <Text marginLeft={100} variant="green">Change</Text>
                </TouchableOpacity>
            </DeliveryView>

            <ScrollView marginTop={30}>
                {Object.entries(groupedItemsInBasket).map(([key, items])=> (
                    <ListView key={key}>
                        <Text variant="green">{items.length} x</Text>
                        <StyledImageRestaurant
                            source={{ uri: urlFor(items[0]?.image).url() }}
                            margin={12}
                        />
                        <Text variant="simple" width={150}>{items[0]?.name}</Text>
                        <Text variant="caption">
                            <Currency quantity={items[0]?.price } currency="INR"/>
                        </Text>

                        <RemoveButton onPress={() => dispatch(removeFromBasket({id: key}))}>
                            <Text variant="green">Remove</Text>
                        </RemoveButton>
                        
                    </ListView>
                ))}
            </ScrollView>

            <TotalView>
                <Total>
                    <Text variant="simple">Subtotal</Text>
                    <Text variant="simple">
                        <Currency quantity={basketTotal} currency="INR"/>
                    </Text>
                </Total>
                <Total>
                    <Text variant="simple">Delivery Fee</Text>
                    <Text variant="simple">
                        <Currency quantity={50} currency="INR"/>
                    </Text>
                </Total>
                <Total>
                    <Text variant="label">Total</Text>
                    <Text variant="label">
                        <Currency quantity={basketTotal+50} currency="INR"/>
                    </Text>
                </Total>
                <PlaceButton onPress={()=> navigation.navigate('Preparing')}>
                    <Text variant="body">Place Order</Text>
                </PlaceButton>
            </TotalView>
        </SafeAreaView>
    )
}