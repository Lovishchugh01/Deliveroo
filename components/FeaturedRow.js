import { ScrollView, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons';
import { Text } from '../typography/TextComponent';
import styled from 'styled-components';
import { RestaurantCard } from './RestaurantCard';
import client from '../Sanity';
import 'react-native-url-polyfill/auto';

const Main = styled(View)`
background-color:white;
padding: 10px;

`
const FeaturedView = styled(View)`
    margin-top: 10px
    flex-direction: row;
    justify-content: space-between;
`
export const FeaturedRow = ({ id, title, description }) => {
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
        client.fetch(
            `
            *[_type == "featured" && _id == $id] {
              ...,
              restaurants[] ->{
                  ...,
                  dishes[]->,
                  type->{
                    name
                }
              },
            }[0]
          `, {id}
        ).then((data) => {
            setRestaurants(data?.restaurants)
        })
    }, [id])
    // console.log(restaurants);
    return (
        <Main style={{ backgroundColor: '#2f9993', marginTop: 10 }}>
            <FeaturedView>
                <Text variant="body" >{title}</Text>
                <Feather name="arrow-right" size={24} color="#fff" />
            </FeaturedView>
            <Text variant="hint">{description}</Text>

            <ScrollView
                // contentContainerStyle={{
                //     // paddingHorizontal: 15,
                //     paddingTop: 10,
                //     paddingBottom: 10,
                // }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {restaurants?.map((restaurant)=>{
                    return (
                        <RestaurantCard
                        key={restaurant._id}
                        id= {restaurant._id}
                        imgUrl={restaurant.image}
                        title={restaurant.name}
                        rating={restaurant.rating}
                        genre={restaurant.type?.name}
                        address={restaurant.address}
                        short_description={restaurant.short_description}
                        dishes={restaurant.dishes}
                        long={restaurant.long}
                        lat={restaurant.lat}
                    /> 
                    )
                })}
                
            </ScrollView>
        </Main>
    )
}