import { View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../typography/TextComponent';
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';

const Main = styled(View)`
  background-color: #00BBCC;
  height: 100%;
`
const HeaderView = styled(View)`
  flex-direction:row
  justify-content: space-between;
  padding: 15px;
`
const DeliveryTime = styled(View)`
  background-color: white;
  margin: 15px;
  padding: 15px;
  z-index:50;
  box-shadow: 10px 10px;
`
const Estimation = styled(View)`
flex-direction: row;
justify-content: space-between;
`
const StyledImage = styled(Image)`
    height:70px;
    width: 70px;
    margin-right:8px;
`
const Map = styled(MapView)`
  width: 100%;
  height: 100%;
  // z-index: 0;

`
export const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <Main>
      <SafeAreaView>
        <HeaderView style={{zIndex:10}}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Entypo name="circle-with-cross" paddingRight={10} size={30} color="#FFF" />
            </TouchableOpacity>
          <Text>Order Help</Text>

        </HeaderView>

        <DeliveryTime backgroundColor="#fff">
          <Estimation>
            <View>
              <Text variant="simple">Estimated Arrival</Text>
              <Text variant="heading">45-55 Minutes</Text>
            </View>
            <StyledImage
              source={{
                uri: "https://links.papareact.com/fls",
              }}
            />
          </Estimation>

          <Progress.Bar size={30} marginTop={30} color="#00BBCC" indeterminate={true} />
          <Text variant="simple">Your order is being prepared!</Text>

        </DeliveryTime>
      </SafeAreaView>
      <Map
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="black"
        />
      </Map>
    </Main>
  )
}