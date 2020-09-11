import React from 'react';
import styled from 'styled-components/native';
import {View, Text, SafeAreaView, Image, FlatList, RefreshControl, TouchableOpacity, StyleSheet} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import FitImage from 'react-native-fit-image'
import {connect} from 'react-redux';
import * as Types from '../constants/types';
import * as Actions from '../actions/photo';
import LoadMoreButton from '../components/LoadMoreButton';
import PageDelimiter from '../components/PageDelimiter';
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
    if(item.type == 'page_delimiter') {
      return <PageDelimiter page={this.props.photo.filters.page - 1}></PageDelimiter>
    } else {
      return (
        <TouchableOpacity
            onPress={() => {this.navigateDetails(item)}}
            activeOpacity={0.7}
        >
            <FitImage source={{uri: item.thumbs.original}} style={styles.image} borderRadius={5}></FitImage>
        </TouchableOpacity>
     )
    }
  }

  renderFooterList() {
    if(!this.props.photo.isLoadingData)
      return <LoadMoreButton></LoadMoreButton>
  }

  render() {
    return (
        <StyledContainer>
          <StatusBar style="auto"></StatusBar>
            <FlatList
              data={this.props.photo.data}
              renderItem={({item}) => this.renderItem(item)}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={this.renderFooterList()}
              refreshControl={
                <RefreshControl
                  refreshing={this.props.photo.isLoadingData}
                  onRefresh={() => this.onRefresh()}
                ></RefreshControl>
              }
              style={styles.flatList}
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
  },
  flatList: {
    flex: 1,
    flexDirection: 'column'
  }
})

const StyledContainer = styled.SafeAreaView`
  flex: 1;
  margin: 5px 20px;
  height: 100%;
`;

const mapStateToProps = (state) => {
  const photo = state;
  return photo;
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (state) => {dispatch(Actions.loadData(state, false))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);