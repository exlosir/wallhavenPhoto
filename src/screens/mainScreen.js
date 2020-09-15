import React, { useCallback } from 'react';
import styled from 'styled-components/native';
import {View, Text, SafeAreaView, Image, FlatList, RefreshControl, TouchableOpacity, StyleSheet} from 'react-native';
import {Container, Header, Item, Input, Icon, Button, Spinner} from 'native-base';
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

  shouldComponentUpdate(nextProps, nextState) {
    if(this.props.photo.data !== nextProps.data)
      return true;
    return false;
  }

  onRefresh() {
    this.props.fetchData(this.props.photo);
  }

  renderItem = ({item}) => {
    if(item.type == 'page_delimiter') {
      return <PageDelimiter page={item.page - 1}></PageDelimiter>
    } else {
      return (
        <TouchableOpacity
            onPress={() => {this.navigateDetails(item)}}
            activeOpacity={0.7}
        >
            <Image source={{uri: item.thumbs.small}} style={styles.image} borderRadius={5}></Image>
        </TouchableOpacity>
     )
    }
  }

  onEndReached = () => {
    this.props.loadMore(this.props.photo)
  }

  renderFooterList = () => {
    if(this.props.photo.isLoadingData)
      return <Spinner></Spinner>
    return false;
  }

  getItemLayout = (data, index) => ({ length: 200, offset: 200* index, index })

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name='ios-search'></Icon>
            <Input placeholder="Поиск" onChangeText={(text) => {this.props.search(text)}} onSubmitEditing={() => {this.props.fetchData(this.props.photo)}}></Input>
          </Item>
        </Header>
        <StyledContainer>
          <FlatList
            data={this.props.photo.data}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={this.onEndReached}
            refreshControl={
              <RefreshControl
                refreshing={this.props.photo.isLoadingData}
                onRefresh={() => this.onRefresh()}
              ></RefreshControl>
            }
            onEndReachedThreshold={0.5}
            style={styles.flatList}
          ></FlatList>
        </StyledContainer>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  image: {
    borderRadius: 5,
    marginBottom: 10,
    resizeMode: 'cover',
    height: 200,
    width: '100%'
  },
  flatList: {
    flex: 1,
    flexDirection: 'column'
  }
})

const StyledContainer = styled.SafeAreaView`
  flex: 1;
  margin: 10px 10px;
  height: 100%;
`;

const mapStateToProps = (state) => {
  const photo = state;
  return photo;
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (state) => {dispatch(Actions.loadData(state, false))},
    search: (text) => {dispatch(Actions.search(text))},
    loadMore: (state) => {dispatch(Actions.loadMore(state))}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);