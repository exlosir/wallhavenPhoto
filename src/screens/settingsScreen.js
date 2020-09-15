import React from 'react';
import {SafeAreaView, TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components';
import {Card, CardItem, Body, Header, Container, Content, View, Picker, Button} from 'native-base';
import * as Const from '../constants/wallhavenConstans';
import {connect} from 'react-redux';
import * as Actions from '../actions/photo';

import { AntDesign } from '@expo/vector-icons';

class SettingsScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: {
                general: this.props.photo.filters.categories.general,
                anime: this.props.photo.filters.categories.anime,
                people: this.props.photo.filters.categories.people,
            },
            sorting: this.props.photo.filters.sorting,
            topRange: this.props.photo.filters.topRange,
            oldSettings: {
                categories: {
                    general: this.props.photo.filters.categories.general,
                    anime: this.props.photo.filters.categories.anime,
                    people: this.props.photo.filters.categories.people,
                },
                sorting: this.props.photo.filters.sorting,
                topRange: this.props.photo.filters.topRange,
            }
        }
    }
    getIcon = (value) => {
        return <AntDesign name={value == 1 ? "checkcircleo" : "closecircleo"} size={24} color={value == 1 ? "green" : "red"} />
    }

    applySettings = () => {
        this.props.applySettings(this.props.photo, this.state, this.props.navigation)
    }

    restoreSettings = () => {
        this.setState({
            categories: this.state.oldSettings.categories,
            sorting: this.state.oldSettings.sorting,
            topRange: this.state.oldSettings.topRange
        })
    }

    setCategory = (category) => {
        this.setState(state => (state.categories[category] = +!state.categories[category], state))
    }

    setSorting = (value) => {
        this.setState({sorting: value})
    }

    setTopRange = (value) => {
        this.setState({topRange: value})
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Card transparent>
                        <CardItem header style={{justifyContent: "center"}}><Text>Категории</Text></CardItem>
                        <CardItem>
                            <Body>
                                <TouchableButton onPress={() => {this.setCategory("general")}}>
                                    <Text>General</Text>
                                    <View>
                                        {this.getIcon(this.state.categories.general)}
                                    </View>
                                </TouchableButton>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <TouchableButton onPress={() => {this.setCategory("anime")}}>
                                    <Text>Anime</Text>
                                    <View>
                                        {this.getIcon(this.state.categories.anime)}
                                    </View>
                                </TouchableButton>
                            </Body>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <TouchableButton onPress={() => {this.setCategory("people")}}>
                                    <Text>People</Text>
                                    <View>
                                        {this.getIcon(this.state.categories.people)}
                                    </View>
                                </TouchableButton>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card transparent>
                        <CardItem header style={{justifyContent: "center"}}><Text>Сортировка</Text></CardItem>
                        <Picker
                            mode="dropdown"
                            style={{ width: '100%' }}
                            selectedValue={this.state.sorting}
                            onValueChange={(value) => {this.setSorting(value)}}
                            >
                                <Picker.Item label="Топ" value={Const.SORTING.TOP_LIST} />
                                <Picker.Item label="Последние" value={Const.SORTING.LATEST} />
                                <Picker.Item label="По релевантности" value={Const.SORTING.RELEVANCE} />
                                <Picker.Item label="Рандом" value={Const.SORTING.RANDOM} />
                                <Picker.Item label="Наибольшее кол-во просмотров" value={Const.SORTING.VIEWS} />
                            </Picker>
                    </Card>

                    <Card transparent>
                        <CardItem header style={{justifyContent: "center"}}><Text>Период</Text></CardItem>
                        <Picker
                            mode="dropdown"
                            style={{ width: '100%' }}
                            selectedValue={this.state.topRange}
                            onValueChange={(value) => {this.setTopRange(value)}}
                            >
                                <Picker.Item label="За 1 день" value={Const.TOP_RANGE.ONE_DAY} />
                                <Picker.Item label="За 3 дня" value={Const.TOP_RANGE.THIRD_DAY} />
                                <Picker.Item label="За 1 неделю" value={Const.TOP_RANGE.ONE_WEEK} />
                                <Picker.Item label="За 1 месяц" value={Const.TOP_RANGE.ONE_MONTH} />
                                <Picker.Item label="За 3 месяца" value={Const.TOP_RANGE.THREE_MONTH} />
                                <Picker.Item label="За 6 месяцев" value={Const.TOP_RANGE.SIX_MONTH} />
                                <Picker.Item label="За 1 год" value={Const.TOP_RANGE.ONE_YEAR} />
                            </Picker>
                    </Card>

                    <View style={{flex: 1, flexDirection: 'row'}}>

                        <Button full success rounded style={{flex: 1, marginLeft: 10, marginRight: 10}} onPress={() => {this.applySettings()}}>
                            <Text style={{color: 'white'}}>Сохранить</Text>
                        </Button>

                        <Button full danger rounded style={{flex: 1, marginLeft: 10, marginRight: 10}} onPress={() => {this.restoreSettings()}}>
                            <Text style={{color: 'white'}}>Отменить</Text>
                        </Button>

                    </View>
                </Content>
            </Container>
        )
    }
}

const TouchableButton = styled.TouchableOpacity`
    border: 1px solid #eaeaea;
    padding: 10px;
    border-radius: 5px;
    flex: 1;
    flex-direction: row;
    width: 100%;
    height: 50px;
    justify-content: space-between;
`;

const mapStateToProps = (state) => ({
    photo: state.photo
})

const mapDispatchToProps = (dispatch) => ({
    applySettings: (state, stateSettings, navigation) => {dispatch(Actions.applySettings(state, stateSettings, navigation))}
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)