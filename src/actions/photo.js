import * as Types from '../constants/types';
import * as Handlers from './handlers/filterPhotoHandler';

export const changeCategory = (category) => (
    {
        type: Types.CHANGE_CATEGORY,
        data: category
    }
);

export const changeTopRange = (topRange) => (
    {
        type: Types.CHANGE_TOP_RANGE,
        data: topRange
    }
);

export const loadData = (state, loadMore) => {
    return Handlers.fetchData(state, loadMore)
}

export const loadMore = (state) => {
    return (dispatch, getState) => {
        dispatch(setPage(++state.filters.page));
        dispatch(loadData(state, true))
    }
}

export const setPage = (page) => {
    return {
        type: Types.SET_PAGE,
        payload: page
    }
}