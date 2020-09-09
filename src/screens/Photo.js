import React from 'react';
import {View, ScrollView, Image, Text, Dimensions} from 'react-native';
import styled from 'styled-components/native'
import FitImage from 'react-native-fit-image';


const win = Dimensions.get('window');
export default class Photo extends React.Component {

    constructor(props) {
        super(props);
        this.photo = this.props.route.params.photo
        console.log(this.props.route.params.photo)
    }
    render() {
        Image.getSize(this.photo.path, (width, height) => {
            console.log(width, height)
        })
        return (
            <Container>
                <FitImage source={{uri: this.photo.path}}></FitImage>
                <BlockContainer>
                    <Text>Просмотров: {this.photo.views}</Text>
                </BlockContainer>
            </Container>
        )
    }
}

const Container = styled.ScrollView`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const BlockContainer = styled.View`
    flex: 1;
    margin: 10px;
`;