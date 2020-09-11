import React from 'react';
import {View, ScrollView, Image, Text, Dimensions, TouchableOpacity} from 'react-native';
import styled from 'styled-components/native'
import FitImage from 'react-native-fit-image';
import FileStorageImage from '../service/FileStorageImage';
import Toast from 'react-native-tiny-toast';


const win = Dimensions.get('window');
export default class PhotoDetail extends React.Component {

    constructor(props) {
        super(props);
        this.photo = this.props.route.params.photo
    }

    saveImageToDevice(item) {
        let image = new FileStorageImage(item.path);
        image.downloadImage()
        .then(() => {Toast.show("Фотография сохранена")})
        .catch(() => {console.log('err')})
    }
    render() {
        return (
            <Container>
                <FitImage source={{uri: this.photo.path}}></FitImage>
                <BlockContainer>
                    <SaveButton onPress={() => {this.saveImageToDevice(this.photo)}}><SaveButtonText>Сохранить в галерею</SaveButtonText></SaveButton>
                    <Text>Просмотров: <BoldText>{this.photo.views}</BoldText></Text>
                    <Text>Категория: <BoldText>{this.photo.category}</BoldText></Text>
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

const SaveButton = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    background-color: #ccc;
    border-radius: 5px;
    margin-bottom: 10px;
    flex: 1;
    justify-content: center;
    align-items: center;
    elevation: 9;
    shadow-radius: 3px;
    shadow-color: black;
    shadow-offset: 3px 3px;
    shadow-opacity: 0.2;
`;

const SaveButtonText = styled.Text`
    color: #000;
    font-weight: bold
`;

const BoldText = styled.Text`
    font-weight: bold;
`;

const BlockContainer = styled.View`
    flex: 1;
    flex-direction: column;
    margin: 10px;
`;