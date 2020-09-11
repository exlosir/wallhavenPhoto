import React from 'react';
import styled from 'styled-components';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {connect} from 'react-redux';
import * as Actions from '../actions/photo';

class LoadMoreButton extends React.Component {

    constructor(props) {
        super(props)
    }

    loadMore() {
        this.props.loadMore(this.props.photo);
    }
    render() {
        return (
            <Container>
                <Button onPress={() => {this.loadMore()}}>
                    <IconContainer>
                        <MaterialIcons name="refresh" size={30} color="white"/>
                    </IconContainer>
                </Button>
            </Container>
        )
    }
}

const IconContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Container = styled.View`
    height: 70px;
    flex: 1;
    align-items: center;
`;

const Button = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: #568be8;
    shadow-color: #000;
    shadow-offset: 1px 1px;
    shadow-opacity: 0.4;
    shadow-radius: 2px;
    elevation: 3;
`;

const mapStateToProp = (state) => {
    return {photo} = state;
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadMore: (state) => {dispatch(Actions.loadMore(state))},
    }
}

export default connect(mapStateToProp, mapDispatchToProps)(LoadMoreButton);

