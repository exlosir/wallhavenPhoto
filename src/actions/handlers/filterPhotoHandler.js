import UriBuilder from '../../service/UriBuilder';
import * as Types from '../../constants/types';
import { Toast } from 'react-native-tiny-toast';
export const fetchData = (state, loadMore) => {
    return (dispatch, getState) => {
        var uriBuilder = new UriBuilder(state.uri, state.filters)
        var uri = uriBuilder.build();
        if(!loadMore)
            dispatch({type: Types.SET_PAGE, payload: 1});
        dispatch({type: Types.LOAD_DATA_START})
        fetch(uri).then(js => js.json()).then(rsp => {
            var response;
            if(loadMore) {
                if(rsp.data.length > 0) {
                    response = [...state.data, {type: 'page_delimiter', page: state.filters.page}, ...rsp.data];
                }else {
                    console.log('Данных нет больше')
                    response = [...state.data];
                }
            }else {
                response = rsp.data;
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