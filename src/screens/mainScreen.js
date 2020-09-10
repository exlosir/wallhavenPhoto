import React from 'react';
import styled from 'styled-components/native';
import {View, Text, SafeAreaView, Image, FlatList, RefreshControl, Alert, TouchableOpacity, StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import FitImage from 'react-native-fit-image'

class MainScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoadingData: false,
      currentPage: 2,
      data: [],
    }
  }


  navigateDetails(photo) {
    this.props.navigation.navigate('Details', {photo})
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps !== this.props)
      this.onRefresh()
  }

  componentDidMount() {
    this.onRefresh()
  }

  onRefresh() {
    this.setState({isLoadingData: true})
    fetch(`https://wallhaven.cc/api/v1/search?categories=111&page=${this.state.currentPage}`)
    .then(json => json.json())
    .then(resp => {
      this.setState({data: resp.data, isLoadingData: false})
    })
    .catch(err => {
      this.setState({isLoadingData: false})
      console.log(err)
      Alert.alert(
        "Ошибка!",
        err,
        [
          {
            text: "Ok"
          }
        ]
      )

    })
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
            data={this.state.data}
            renderItem={({item}) => this.renderItem(item)}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isLoadingData}
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

export default MainScreen;