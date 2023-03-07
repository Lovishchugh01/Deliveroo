import { View, Image, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigation } from '@react-navigation/native'
import { Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text } from '../typography/TextComponent'
import { Ionicons, Feather } from '@expo/vector-icons';
import { Categories } from '../components/Categories';
import { FeaturedRow } from '../components/FeaturedRow';
import client from '../Sanity';
import 'react-native-url-polyfill/auto';
const Main = styled(View)`
    flex-direction: row;
    padding: 10px;
`
const SearchContainer = styled(View)`
  width:90%;
`
const Search = styled(Searchbar)`
  // height:40px;
  margin-right:10px;
`

const StyledImage = styled(Image)`
    height:17px;
    width: 17px;
    padding: 20px;
    border-radius: 50px;
    background-color: grey;
    margin-right:8px;
`
export const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    }, [])
  })

  useEffect(() => {
    client.fetch(
      `
        *[_type == "featured"] {
          ...,
          restaurants[] ->{
            ...,
            dishes[]->
          }
        }
      `
    ).then((data) => {
      setFeaturedCategories(data)
    })
  }, [])

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <>
        <Main>
          <View>
            <StyledImage
              source={{
                uri: 'https://links.papareact.com/wru'
              }}
            />
          </View>
          <View>
            <Text variant="caption">Deliver Now!</Text>
            <Text variant="label">Current Location
              <Ionicons name="chevron-down" size={20} color="#00CCBB" />
            </Text>
          </View>
          <Feather style={{ marginLeft: 'auto' }} name="user" size={40} color="#00CCBB" />
        </Main>

        <Main>
          <SearchContainer>
            <Search iconColor="#00CCBB" placeholder="Restaurants and Cuisines" />
          </SearchContainer>
          <Feather name="sliders" style={{ marginTop: 12 }} size={25} color="#00CCBB" />
        </Main>

        <ScrollView>
          {/* Category */}
          <Categories />
          {/* Featured */}

          {featuredCategories?.map((category) => {
            return (
              <FeaturedRow
                id={category._id}
                key={category._id}
                title={category.name}
                description={category.short_description}
              />
            )
          })}
        </ScrollView>
      </>
    </SafeAreaView>
  )
}