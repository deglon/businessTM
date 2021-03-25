import {
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    FETCH_USER_ERROR,
    FETCH_USER_LOADING,
    FETCH_USER_SUCCESS,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR
} from '../Types/usersTypes'

const defaultState = {
    data : [],
    error : null,
    isLoading: false
}

const UserReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_USER_LOADING : return {...state, isLoading: true };
        case FETCH_USER_SUCCESS : return {...state, isLoading: false, data: action.payload, error: '' };
        case FETCH_USER_ERROR : return { isLoading: false, data:[], error: action.payload};
        case UPDATE_USER_SUCCESS : 
            const updateUser = state.data.filter(user => user._id !== action.payload.id)
            return {...state, data: [...updateUser, action.payload]};
        case UPDATE_USER_ERROR : return {...state, error: action.payload};
        case  ADD_USER_SUCCESS : return {...state, data: [ ...state.data, action.payload ]};
        case ADD_USER_ERROR : return {...state, error: action.payload};
        default : return state;
        case DELETE_USER_SUCCESS : 
            const filterUser = state.data.filter( user => user._id !== action.payload.id);
            return {...state, data: filterUser }
        case DELETE_USER_ERROR : return {...state, error: action.payload}

    }
} 

export default UserReducer;

