import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar'
import styled from 'styled-components';

import {Picker} from 'native-base';

export default class HelpScreen extends React.Component {

    render() {
        return (
            <Container>
                <HeaderContainerText>
                    <BoldText>Поиск:</BoldText>
                    <View>
                        <Text>tagname - нечеткий поиск по тэгу/ключевому слову</Text>
                        <Text>-tagname - исключить тэг/ключевое слово</Text>
                        <Text>+tag1 +tag2 - тэг1 и тэг2</Text>
                        <Text>+tag1 -tag2 - тэг1 и не тэг2</Text>
                        <Text>@username - загрузки пользователя</Text>
                        <Text>id:123 - Четкий поиск по тэгу (не может быть скомбинирован)</Text>
                        <Text>type:{"{png/jpg}"} - поиск по типу фала (jpg = jpeg)</Text>
                        <Text>like:wallpaper ID - поиск фотографии по идентификатору</Text>
                    </View>
                </HeaderContainerText>
            </Container>
        )
    }
}

const HeaderContainerText = styled.View`
    flex: 1;
    align-items: center;
    width: 100%;
`;

const BoldText = styled.Text`
    font-weight: bold;
    font-size: 16px
`;

const Container = styled.SafeAreaView`
    flex: 1;
    margin: 0px 5px;
`;