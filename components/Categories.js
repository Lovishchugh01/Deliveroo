import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoryCard } from './CategoryCard'
import 'react-native-url-polyfill/auto';
import client from '../Sanity';
import { urlFor } from './../Sanity';

export const Categories = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
      client.fetch(`*[_type== "category"]`).then((data)=>{
        setCategories(data)
    })
    }, [])
    // console.log(categories)
    
    return (
        <ScrollView  style={{backgroundColor:'#015963'}}
            contentContainerStyle={{
                paddingHorizontal: 15,
                paddingTop: 10,
                paddingBottom: 10,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
        >
            {categories.map((category)=>{
                return(
            <CategoryCard 
            key={category._id}
            imgUrl= {urlFor(category.image).width(200).height(200).url()} 
            title={category.name} />
            )
            })}
        </ScrollView>
    )
}