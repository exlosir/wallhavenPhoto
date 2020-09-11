import UriBuilder from '../../service/UriBuilder';
import * as Types from '../../constants/types';

export const changeCategory = () => {

}

export const changeRopRange = () => {

}

export const fetchData = (state, loadMore) => {
    return (dispatch, getState) => {
        var uriBuilder = new UriBuilder(state.uri, state.filters)
        var uri = uriBuilder.build();
        dispatch({type: Types.LOAD_DATA_START})
        fetch(uri).then(js => js.json()).then(rsp => {
            var response;
            if(!loadMore) {
                dispatch({type: Types.SET_PAGE, payload: 1})
                response = rsp.data;
            }else {
                state.data.push({type: 'page_delimiter', page: state.filters.page - 1});
                response = [...state.data, ...rsp.data];
            }
            dispatch({type: Types.LOAD_DATA_SUCCESS, payload: response})
        })
        .catch(err => {
            dispatch({type: Types.LOAD_DATA_FAILURE})
        })
    }
}

export const fetchDataStart = (state) => {
    return Object.assign({}, state, {isLoadingData: true})
}

export const fetchDataSuccess = (state, payload) => {
    return Object.assign({}, state, {isLoadingData: false, data: payload})
}

export const fetchDataFailure = (state) => {
    return Object.assign({}, state, {isLoadingData: false})
}