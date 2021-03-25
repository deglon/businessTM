import {
    UPDATE_USER_ERROR,
    UPDATE_USER_SUCCESS,
    FETCH_USER_ERROR,
    FETCH_USER_LOADING,
    FETCH_USER_SUCCESS,
    ADD_USER_SUCCESS,
    ADD_USER_ERROR,
    DELETE_USER_SUCCESS,
    DELETE_USER_ERROR,


} from '../Types/usersTypes'
import axios from 'axios';
const url = 'http://localhost:5000/api/User/';


/************************** FETCH **************************/
export const fetechUsersSuccess =  users => {
    return {
        type : FETCH_USER_SUCCESS,
        payload : users
        
    }
}
export const fetechUsersLoading = () => {
    return {
        type : FETCH_USER_LOADING,
    }
}
export const fetechUsersError = error => {
    return {
        type : FETCH_USER_ERROR,
        payload : error,
    }
}


export const fetchUsers = () => {
    // let isLoading = true; 
    return (dispatch) => {
        dispatch(fetechUsersLoading)
        axios.get(url)
        .then(response => { 
          const users = response.data.data;
        //   console.log("users", users)
        //   debugger
          dispatch(fetechUsersSuccess(users))
        })
        .catch( error => {
            const errorMsg = error.message;
            dispatch (fetechUsersError(errorMsg))

        })
    }
}




export const fetchUserById = (id) => {
    // let isLoading = true; 
    return (dispatch) => {
        axios.get(url + "search" + `/${id}`)
        .then(response => { 
          const user = response.data.data;
          dispatch(fetechUsersSuccess(user))
        })
        .catch( error => {
            // const errorMsg = error.message;
            // dispatch(fetechMemberError(errorMsg))
            console.log("erreuuuur")

        })
    
    }
}


/************************** DELETE **************************/



export const deleteUserSuccess = (id) => {
    return {
        type : DELETE_USER_SUCCESS,
        payload : {
            id : id
        },
    }
}

export const deleteUserError = (data) => {
    return {
        type : DELETE_USER_ERROR,
        payload : data,
    }
}


export const deleteUser = (id) => {
    // console.log("deleteeed", id)
    // debugger
    return (dispatch) => {
        return axios.delete(url + "delete/" + `${id}`)
        .then (() => {
            dispatch(deleteUserSuccess(id))
        }).catch ((error) => {
            const errorPayload = {};
            errorPayload['message'] = error.response.data.message;
            errorPayload['status'] = error.response.status;
            
            dispatch(deleteUserError(errorPayload))
        })
    }
}








/************************** UPDATE **************************/

export const updateUserSuccess = (data) => {
    return {
        type : UPDATE_USER_SUCCESS,
        payload : data,
    }
}

export const updateUserError = (data) => {
    return {
        type : UPDATE_USER_ERROR,
        payload : data,
    }
}

export const UpdateUser = (formData, id, user) => {
    
    
    
    return (dispatch) => {
        return axios.put(url + "update/" + `${id}`, user)
            .then(() => {
                dispatch(updateUserSuccess(user));
                   
            }).catch ((error) => {
                const errorPayload = {};
                            errorPayload['message'] = error.response.data.message;
                            errorPayload['status'] = error.response.status;
                            dispatch(updateUserError(errorPayload));

                    })
    }

}

/************************** ADD **************************/


export const addUser = (formData) => (dispatch) => {
//     for(var pair of formData.entries()) {
//         console.log("aaaaaa",pair[0]+ ', '+ pair[1]);
// }
// console.log("added", formData)
// debugger
    return axios.post(url + "signup", formData).then(
      (response) => {
        dispatch({
          type: ADD_USER_SUCCESS,
          payload: formData
        });

        axios.get(url)
        .then(response => { 
          const users = response.data.data;
          
          dispatch(fetechUsersSuccess(users))
        })
        .catch( error => {
            const errorMsg = error.message;
            dispatch (fetechUsersError(errorMsg))

        })
  
          
        return Promise.resolve();
        
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: ADD_USER_ERROR,
        });
  
        
  
        return Promise.reject();
      }
    );
    
  };

