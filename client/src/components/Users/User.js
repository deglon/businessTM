
import React, { useState, useEffect } from "react";
import axios from 'axios'
import {
 
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,

} from "reactstrap";
import {Link} from 'react-router-dom'
import { deleteUser } from '../../actions/UserActions'
import { connect } from 'react-redux'
// import { confirmAlert } from 'react-confirm-alert'; 
import Notification from '../Notification'
import ConfirmDialog from '../ConfirmDialog'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, withStyles } from '@material-ui/core'
import Button from 'reactstrap/lib/Button'
import {fetchGradeById} from '../../actions/GradeAction'
import { fetchSlById } from "actions/SlAction";




function User (props) {

  const [notify, setNotify] = useState ({ isOpen: false, message:'', type:'' })
  const [confirmDialog, setConfirmDialog] = useState ({ isOpen: false, title:'', subtitle:'' })
  const [grade, setGrade] = useState ('')
  const [sl, setSl] = useState ('')


  const handleDelete = () => {

    setConfirmDialog({isOpen:false})

    props.onDelete(props.user._id)   
    // console.log("id", props.user._id)  
    setNotify({isOpen:true, message:'deleted successfully', type:'error' })

  }

  //   useEffect(() => {
  //   const fetchData = async () => {
  //     if(props.user.grade){
  //       // const result= await fetchGradeById()
  //       // setGrade(result)
  //       await props.fetchGradeById(props.user.grade)
  //       // console.log("result", result)
     
  //     }
     
  //   }
  //   fetchData()
  // }, [])

  // console.log("grade", props.grade.grade_name)

  useEffect(() => {
    axios({
      "method": "GET",
      "url": "http://localhost:5000/api/Grade/search/" + props.user.grade,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY
      } 
    })
    .then((response) => {
      const grade = response.data.data.grade_name
      console.log("graaaade", grade)
      setGrade(grade)
    })
    .catch((error) => {
      console.log(error)
    })
    
   
  }, [props.user.grade])
  

  useEffect(() => {
    axios({
      "method": "GET",
      "url": "http://localhost:5000/api/serviceline/search/" + props.user.serviceLine,
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY
      } 
    })
    .then((response) => {
      const sl = response.data.data.serviceLine
      setSl(sl)
    })
    .catch((error) => {
      console.log(error)
    })
  }, [props.user.serviceLine])

  
  


    return (
      <>
          
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              <a  className="avatar rounded-circle mr-3"
                  href="#pablo"
                  onClick={e => e.preventDefault()}
              >
                <img alt="..."
                      src={require("assets/img/theme/team-4-800x800.jpg")}
                />
              </a>
              <Media>
                <span className="mb-0 text-sm">
                  {props.user.firstname} {props.user.lastname}
                </span>
              </Media>
            </Media>
          </th>
                   
          <td>
            {grade }            
          </td>
          <td>
            {props.user.registrationNumber}            
          </td>
          <td>
            { sl }            
          </td>
          <td>
            {props.user.subServiceLine}
          </td>
         
                     
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={e => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem
                  href={`/admin/edit/user/${props.user._id}`}
                  
                >
                  Edit
                </DropdownItem>
                <DropdownItem
                  onClick={() => { 
                    setConfirmDialog({
                      isOpen:true,
                      title:'Are you sure to delete  this user ?', 
                      subtitle:"You can't undo this operation ",
                      onConfirm: () => { handleDelete() } 
                     })
                   }}
                >
                  Delete
                </DropdownItem>
                <DropdownItem
                  href={`/admin/search/${props.user._id}`}
                  // onClick={e => e.preventDefault()}
                >
                  More details
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
        <Notification 
          notify={notify}
          // onClose={this.handleCloseNotify}
          setNotify = {setNotify}
         />

         <ConfirmDialog 
            confirmDialog={confirmDialog} 
            setConfirmDialog={setConfirmDialog}

             />

                                             
                  
      </>
    );
  }


const mapDispatchToProps = dispatch => {
  return {
    onDelete : (id) => dispatch(deleteUser(id)),
    fetchGradeById : (id) => dispatch(fetchGradeById(id)),
    fetchSlById : (id) => dispatch(fetchSlById(id))
  }
}

const mapStateToProps = state => {

  return {
    
    grade : state.grade.data,
    sl: state.sl.data
    
  }
}

export default  connect (mapStateToProps, mapDispatchToProps)(User);
