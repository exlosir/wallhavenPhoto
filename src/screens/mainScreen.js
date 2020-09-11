import React from 'react';
import styled from 'styled-components/native';
import {View, Text, SafeAreaView, Image, FlatList, RefreshControl, Alert, TouchableOpacity, StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import FitImage from 'react-native-fit-image'
import {connect} from 'react-redux';
import * as Types from '../constants/types';
import * as Actions from '../actions/photo';
class MainScreen extends React.Component {

  constructor(props) {
    super(props)
  }


  navigateDetails(photo) {
    this.props.navigation.navigate('Details', {photo})
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh() {
    this.props.fetchData(this.props.photo);
  }
  renderItem(item) {
    return (
        <TouchableOpacity
            onPress={() => {this.navigateDetails(item)}}
            activeOpacity={0.7}
        >
            <FitImage source={{uri: item.thumbs.original}} style={styles.image} borderRadius={5}></FitImage>
        </TouchableOpacity>
    )
  }

  render() {
    return (
        <StyledContainer>
          <StatusBar style="auto"></StatusBar>
            <FlatList
              data={this.props.photo.data}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.photo.isLoadingData}
                  onRefresh={() => this.onRefresh()}
                ></RefreshControl>
              }
            ></FlatList>
        </StyledContainer>
    )
  }

}

const styles = StyleSheet.create({
  image: {
    borderRadius: 5,
    marginBottom: 10,
    resizeMode: 'contain'
  }
})

const StyledContainer = styled.SafeAreaView`
  flex: 1;
  margin: 5px 20px;
  height: 100%;
`;

// const StyledImage = styled.Image`
//   min-height: 250px;
//   margin-bottom: 10px;
//   border-radius: 5px;
//   resize-mode: cover;
// `;

const mapStateToProps = (state) => {
  const photo = state;
  return photo;
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (state) => {dispatch(Actions.loadData(state))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);