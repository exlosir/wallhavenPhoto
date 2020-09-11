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

export const loadData = (state) => {
    return Handlers.fetchData(state)
}