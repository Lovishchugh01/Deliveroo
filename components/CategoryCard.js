import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styled from 'styled-components'

const StyledImage = styled(Image)`
    height:80px;
    width: 80px;
    padding: 20px;
    margin-right:15px;
    position: relative;
`
const StyledText = styled(Text)`
    position: absolute;
    top: 50px;
    left: 10px;
    color: #fff;
`
export const CategoryCard = ({ imgUrl, title }) => {
    return (
        <TouchableOpacity>
            <StyledImage
                source={{
                    uri: imgUrl
                }}
            />
            <StyledText>{title}</StyledText>
        </TouchableOpacity>
    )
}