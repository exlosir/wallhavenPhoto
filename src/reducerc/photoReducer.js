import * as Types from '../constants/types';
import * as WallhavenTypes from "../constants/wallhavenConstans";
import * as Handlers from '../actions/handlers/filterPhotoHandler';

const initialState = {
    data: [],
    isLoadingData: false,
    uri: "https://wallhaven.cc/api/v1/search",
    filters: {
        categories: {
            people: 1,
            anime: 1,
            general: 1
        },
        topRange: WallhavenTypes.TOP_RANGE.ONE_MONTH,
        sorting: WallhavenTypes.SORTING.TOP_LIST,
        page: 1,
        q: ""
    }
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case Types.CHANGE_TOP_RANGE:
            state.filters.topRange = action.payload;
            return state;
        case Types.CHANGE_CATEGORY:
            state.filters.categories = action.payload;
            return state;
        case Types.CHANGE_SORTING:
            state.filters.sorting = action.payload;
            return state;
        case Types.LOAD_DATA_SUCCESS:
            return Handlers.fetchDataSuccess(state, action.payload);
        case Types.LOAD_DATA_START:
            return Handlers.fetchDataStart(state);
        case Types.LOAD_DATA_FAILURE:
            return Handlers.fetchDataFailure(state);
        case Types.SET_PAGE:
            state.filters.page = action.payload;
            return state;
        case Types.SEARCH:
            state.filters.q = action.payload;
            return state;
        default:
            return state;
    }
}

export default reducer;