import {
    UPDATE_SL_ERROR,
    UPDATE_SL_SUCCESS,
    FETCH_SL_ERROR,
    FETCH_SL_LOADING,
    FETCH_SL_SUCCESS,
    ADD_SL_SUCCESS,
    ADD_SL_ERROR,
    DELETE_SL_SUCCESS,
    DELETE_SL_ERROR
} from '../Types/slTypes'

const defaultState = {
    data : [],
    error : null,
    isLoading: false
}

const slReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_SL_LOADING : return {...state, isLoading: true };
        case FETCH_SL_SUCCESS : return {...state, isLoading: false, data: action.payload, error: '' };
        case FETCH_SL_ERROR : return { isLoading: false, data:[], error: action.payload};
        case UPDATE_SL_SUCCESS : 
            // const updateSL = state.data.filter(sl => sl._id !== action.payload.id)
            return {...state, data: action.payload};
        case UPDATE_SL_ERROR : return {...state, error: action.payload};
        case  ADD_SL_SUCCESS : return {...state, data: [ ...state.data, action.payload ]};
        case ADD_SL_ERROR : return {...state, error: action.payload};
        default : return state;
        case DELETE_SL_SUCCESS : 
            const filterSL = state.data.filter( sl => sl._id !== action.payload.id);
            return {...state, data: filterSL }
        case DELETE_SL_ERROR : return {...state, error: action.payload}

    }
} 

export default slReducer;

