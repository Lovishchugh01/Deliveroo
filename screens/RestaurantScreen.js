import { View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons, Feather } from '@expo/vector-icons';
import { urlFor } from './../Sanity';
import styled from 'styled-components'
import { Text } from '../typography/TextComponent';
import { DishRow } from '../components/DishRow';
import { BasketIcon } from '../components/BasketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../features/restaurantSlice';
const StyledImage = styled(Image)`
    height:300px;
    width: 100%;
    background-color: grey;
    margin-right:8px;
`
const BackButton = styled(TouchableOpacity)`
    position: absolute;
    top:10px;
    left:10px;
    padding:10px;
    background-color:white;
    border-radius: 50px;
`
const RestaurantDetail = styled(View)`
    background-color: white;
    padding:10px;
`
const RatingView = styled(View)`
    flex-direction: row;
    margin-top :7px;
`
const AddressView = styled(View)`
    margin-left:10px;
    flex-direction: row;
`
const AllergyView = styled(TouchableOpacity)`
flex-direction: row;
align-items:center;
`
const MenuView = styled(View)`
padding:10px;
padding-bottom: 100px;
`
export const RestaurantScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {
        params: {
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        },
    } = useRoute();

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat
        }))
    }, [dispatch])
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    })
    return (
        <SafeAreaView>
            <BasketIcon/>
            <ScrollView>
                <View className="relative">
                    <StyledImage source={{ uri: urlFor(imgUrl).url() }} />
                    <BackButton onPress={navigation.goBack}>
                        <AntDesign name="left" color="#00ccbb" size={25} />
                    </BackButton>
                </View>
                <RestaurantDetail className="bg-white">
                    <View className="px-4 pt-4">
                        <Text variant="heading">{title}</Text>
                        <View>
                            <RatingView>
                                <Ionicons name="ios-star" size={22} color="#00CCBB" />
                                <Text variant="caption">
                                    <Text variant="green"> {rating}</Text> - {genre}
                                </Text>
                                <AddressView>
                                    <Ionicons name="ios-location-sharp" size={24} color="#00BBCC" />
                                    <Text variant="caption">
                                        Nearby · {address.split(" ")[0]}
                                    </Text>
                                </AddressView>
                            </RatingView>

                        </View>
                        <Text variant="simple">{short_description}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:10, marginBottom:10}}>
                        <View style={{ flex:1, height: 1, backgroundColor: 'black' }} />
                    </View>
                    <AllergyView>
                        <AntDesign name="questioncircle" size={24} color="black" style={{ marginRight: 9 }} />
                        <Text variant="simple">
                            Have a food allergy?
                        </Text>
                        <Feather style={{ marginLeft: 'auto' }} name="arrow-right" size={24} color="#00BBCC" />
                    </AllergyView>
                </RestaurantDetail>



                <MenuView>
                    <Text variant="heading">Menu</Text>
                    {dishes.map((dish) => (
                        <DishRow
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        description={dish.short_description}
                        price={dish.price}
                        image={dish.image}
                        />
                    ))}
                </MenuView>
            </ScrollView>
            {/* {items.length > 0 && <BasketBar />} */}
        </SafeAreaView>

    )
}