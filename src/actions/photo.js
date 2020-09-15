import * as Types from '../constants/types';
import * as Handlers from './handlers/filterPhotoHandler';

export const changeCategory = (categories) => ({ type: Types.CHANGE_CATEGORY, payload: categories });

export const changeTopRange = (topRange) => ({ type: Types.CHANGE_TOP_RANGE, payload: topRange });

export const changeSorting = (sorting) => ({ type: Types.CHANGE_SORTING, payload: sorting });

export const loadData = (state, loadMore) => { return Handlers.fetchData(state, loadMore)}

export const setPage = (page) => ({type: Types.SET_PAGE, payload: page})

export const search = (text) => ({type: Types.SEARCH, payload: text})
export const loadMore = (state) => {
    return (dispatch) => {
        dispatch(setPage(++state.filters.page));
        dispatch(loadData(state, true))
    }
}

export const applySettings = (state, stateSettings, navigation) => {
    return (dispatch) => {
        dispatch(changeCategory(stateSettings.categories));
        dispatch(changeSorting(stateSettings.sorting))
        dispatch(changeTopRange(stateSettings.topRange))
        dispatch(setPage(1))
        dispatch(loadData(state, false))
        navigation.navigate('Home');
    }
}