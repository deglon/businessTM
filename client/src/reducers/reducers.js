import {combineReducers } from 'redux'
import userReducer from './userReducer'
import gradeReducer from './gradeReducer'
import slReducer from './slReducer'
//import accessReducer from './AccessReducer'

//import deskReducer from './DeskReducer'


export default combineReducers ({
   // access: accessReducer,
    sl   : slReducer,    
    user : userReducer,
    grade : gradeReducer,
    //desk : deskReducer,    
});
