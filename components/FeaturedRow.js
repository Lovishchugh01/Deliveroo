import { ScrollView, View } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons'; 
import { Text } from '../typography/TextComponent';
import styled from 'styled-components';
import { RestaurantCard } from './RestaurantCard';

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
  return (
    <Main style={{backgroundColor:'#2f9993', marginTop:10}}>
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
            <RestaurantCard
                id={123}
                imgUrl="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=422&q=80"
                title="Yo! Burger"
                rating={4.5}
                genre="Chinese"
                address="Mohali"
                short_description="This is a short descriptin"
                dishes={[]}
                long={20}
                lat={0}
            />
            <RestaurantCard
                id={123}
                imgUrl="https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=422&q=80"
                title="Yo! Burger"
                rating={4.5}
                genre="Chinese"
                address="Mohali"
                short_description="This is a short descriptin"
                dishes={[]}
                long={20}
                lat={0}
            />
        </ScrollView>
    </Main>
  )
}