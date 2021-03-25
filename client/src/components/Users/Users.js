
import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
  Button,
} from "reactstrap";
import Header from "../Headers/Header";
import User from './User'
import { connect } from 'react-redux'
import {fetchUsers} from '../../actions/UserActions'
import AddUser from './AddUser'
import { fetchGradeById } from "actions/GradeAction";




function Users({user, fetchUsers})  {


  const users = Array.from(user);

  const [addDialog, setAddDialog] = useState ({ isOpen: false})
  const [notify, setNotify] = useState ({ isOpen: false, message:'', type:'' })


  useEffect(() => {
    fetchUsers()
  }, [])
  // useEffect(() => {
  //   // console.log("grade", props.user.grade)
  //   props.fetchGradeById(props.user.grade)
    
   
  // }, [props.user.grade])
  

  const handleAdd = () => {

    setAddDialog({isOpen:false})
    setNotify({isOpen:true, message:'Added successfully', type:'error' })

  }
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if(!searchValue){
  //       const result= await fetchUsers()
  //       setAdherents(result)
  //       //inputSearch.current.focus()
  //     } else {
  //       const result= await searchAdherents(searchValue)
  //       setAdherents(result)
  //       setLoading(false)
  //       inputSearch.current.focus()
  //     }
     
  //   }
  //   fetchData()
  // }, [searchValue])
  

    return (
      <>
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <table>
                    <tr>
                      <td width="170%">
                        <h3 className="mb-0">Users Table </h3>
                      </td>
                      <td>
                        <Button
                        color="primary"
                        onClick={() => { 
                          setAddDialog({
                            isOpen:true,
                            onConfirm: () => { handleAdd() } 
                           })
                         }}
                        size="md"
                        style={{
                            margin: "0 25px 0 ",
                            
                          }}
                        >
                        Add User 
                      </Button>
                      </td>
                    </tr>
                    
                  </table>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">First Name & Last Name</th>
                      <th scope="col">Grade</th>
                      <th scope="col">Registration Number</th>
                      <th scope="col">ServiceLine</th>
                      <th scope="col">SubServiceLine</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                  {
                                  
                    users && users.map( (user) => {
                      return(
                        <User 
                          key={user._id} 
                          user={user}
                        />
                                  )
                                
                    }) 
                  } 

           
                    
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
          
        </Container>

        <AddUser 
            addDialog={addDialog} 
            setAddDialog={setAddDialog}

             />
             
      </>
    );
  
}

// Users.PropTypes = {
//   fetchUsers: PropTypes.func.isRequired,
//   user: PropTypes.object.isRequired
// }
const mapDispatchToProps = dispatch => {
  return {
    fetchUsers : () => dispatch(fetchUsers()),
  }
}
const mapStateToProps = state => {
  // console.log("usersssssss",state.user.data)

  return {
    user : state.user.data
    
  }
  
};

export default connect (mapStateToProps, mapDispatchToProps)(Users);
