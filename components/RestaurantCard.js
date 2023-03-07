import { View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { Text } from '../typography/TextComponent'
import { Ionicons } from '@expo/vector-icons'
import { urlFor } from './../Sanity';
import 'react-native-url-polyfill/auto';
import { useNavigation } from '@react-navigation/native';

const RestaurantImage = styled(Image)`
    width: 200px;
    height: 140px;
`
const RestaurantContent = styled(View)`
    padding: 5px;
`
const LocationContent = styled(View)`
    padding: 5px;
`
const RatingView = styled(View)`
    flex-direction: row;
`
const LocationView = styled(View)`
flex-direction: row;
`
export const RestaurantCard = ({
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
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('RestaurantScreen', {
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
        })
      }}
      style={[styles.card, styles.shadowProp]}>
      <RestaurantImage
        source={{
          uri: urlFor(imgUrl).url(),
        }}
      />
      <RestaurantContent>
        <Text variant='hint'>{title}</Text>
        <RatingView>
          <Ionicons name="ios-star" size={22} color="#00CCBB" />
          <Text variant="caption">
            <Text variant="green"> {rating}</Text> - {genre}
          </Text>
        </RatingView>
      </RestaurantContent>

      <LocationContent>
        <LocationView>
          <Ionicons name="location" size={22} color="#00CCBB" />
          <Text variant="caption"> {address} </Text>
        </LocationView>
      </LocationContent>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    margin: 10,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});