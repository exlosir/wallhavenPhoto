import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components'

export default class PageDelimiter extends React.Component {

    constructor(props) {
        super(props)
    }
    render () {
        return (
            <Container>
                <Line></Line>
                <Text style={{fontSize: 16}}>{this.props.page}</Text>
                <Line></Line>
            </Container>
        )
    }
}

const Container = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 15px 0px;
`;

const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: #000;
    margin: 0px 20px
`;
const Number = styled.Text`
    margin: 0px 10px;
`;