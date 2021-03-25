import {
    UPDATE_GRADE_ERROR,
    UPDATE_GRADE_SUCCESS,
    FETCH_GRADE_ERROR,
    FETCH_GRADE_LOADING,
    FETCH_GRADE_SUCCESS,
    ADD_GRADE_SUCCESS,
    ADD_GRADE_ERROR,
    DELETE_GRADE_SUCCESS,
    DELETE_GRADE_ERROR
} from '../Types/gradesTypes'

const defaultState = {
    data : [],
    error : null,
    isLoading: false
}

const GradeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FETCH_GRADE_LOADING : return {...state, isLoading: true };
        case FETCH_GRADE_SUCCESS : return {...state, isLoading: false, data: action.payload, error: '' };
        case FETCH_GRADE_ERROR : return { isLoading: false, data:[], error: action.payload};
        case UPDATE_GRADE_SUCCESS : 
            const updateGRADE = state.data.filter(grade => grade._id !== action.payload.id)
            return {...state, data: [...updateGRADE, action.payload]};
        case UPDATE_GRADE_ERROR : return {...state, error: action.payload};
        case  ADD_GRADE_SUCCESS : return {...state, data: [ ...state.data, action.payload ]};
        case ADD_GRADE_ERROR : return {...state, error: action.payload};
        default : return state;
        case DELETE_GRADE_SUCCESS : 
            const filterGRADE = state.data.filter( grade => grade._id !== action.payload.id);
            return {...state, data: filterGRADE }
        case DELETE_GRADE_ERROR : return {...state, error: action.payload}

    }
} 

export default GradeReducer;

