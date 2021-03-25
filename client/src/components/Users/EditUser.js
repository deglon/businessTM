import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux'
import { useParams, useHistory} from "react-router-dom"
import Notification from '../Notification'
import {fetchUserById, UpdateUser} from '../../actions/UserActions'
import {fetchGradeById} from '../../actions/GradeAction'
import { fetchSlById } from "actions/SlAction";
import AsyncSelect from "react-select/async";



// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
// core components
import UserHeader from "../Headers/UserHeader.js";
import { Avatar } from "@material-ui/core";
import  './user.css'

function EditUser ({user, grade, sl, fetchUserById, fetchGradeById, fetchSlById}) {



  const { id } = useParams()

  

  const [fnameToUpdate, setfNameToUpdate] = useState(user.firstname)
  useEffect(() => { setfNameToUpdate(user.firstname)}, [user.firstname] )

  const [lnameToUpdate, setLnameToUpdate] = useState(user.lastname)
  useEffect(() => { setLnameToUpdate(user.lastname)}, [user.lastname] )

  const [emailToUpdate, setEmailToUpdate] = useState(user.Email)
  useEffect(() => { setEmailToUpdate(user.Email)}, [user.Email] )

  const [gradeToUpdate, setGradeToUpdate] = useState(grade._id)
  useEffect(() => { setGradeToUpdate(grade._id)}, [grade._id] )

  const [registrationNumberToUpdate, setregistrationNumberToUpdate] = useState(user.registrationNumber)
  useEffect(() => { setregistrationNumberToUpdate(user.registrationNumber)}, [user.registrationNumber] )

  const [slToUpdate, setSlToUpdate] = useState(sl._id)
  useEffect(() => { setSlToUpdate(sl._id)}, [sl._id] )

  const [sslToUpdate, setSslToUpdate] = useState(user.subServiceLine)
  useEffect(() => { setSslToUpdate(user.subServiceLine)}, [user.subServiceLine] )

  const [gradeId, setGradeId] = useState(grade._id)
  useEffect(() => { setGradeId(grade._id)}, [grade._id] )

  const [slId, setSlId] = useState(sl._id)
  useEffect(() => { setSlId(sl._id)}, [sl._id] )

  const [sslName, setSslName] = useState(user.subServiceLine)
  useEffect(() => { setSslName(user.subServiceLine)}, [user.subServiceLine] )




  const [phoneToUpdate, setPhoneToUpdate] = useState(user.telephone)
  useEffect(() => { setPhoneToUpdate(user.telephone)}, [user.telephone] )

  const [photoToUpdate, setPhotoToUpdate] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')
  // useEffect(() => { setPhotoToUpdate(user.email)}, [user.email] )

  const [notify, setNotify] = useState({ isOpen: false, message:'', type:'' })

  const history = useHistory();
  const dispatch = useDispatch()

  const handleCloseNotify = (event) => {
    setNotify({isOpen:false})
  }

  useEffect(() => {
    fetchUserById(id)
  }, [id])

  useEffect(() => {
    fetchGradeById(user.grade)
    // console.log("hello", user.grade)
   
  }, [user.grade])

  useEffect(() => {
    fetchSlById(user.serviceLine)
    // console.log("hello", user.grade)
   
  }, [user.serviceLine])


 


    const onGradeChange = (gradeToUpdate) => {
        if (gradeToUpdate) {
          if ( typeof gradeToUpdate  === 'object') {
            setGradeToUpdate(gradeToUpdate)
            setGradeId(gradeToUpdate.value)
          } 
          
        }
    };
    const onSLChange = (slToUpdate) => {
        if (slToUpdate) {
          if ( typeof slToUpdate  === 'object') {
            setSlToUpdate(slToUpdate)
            setSlId(slToUpdate.value)
          } 
          
        }
      };

    const onSSLChange = (sslToUpdate) => {
       if (sslToUpdate) {
        if ( typeof sslToUpdate  === 'object') {
          setSslToUpdate(sslToUpdate)
          setSslName(sslToUpdate.value)
        }
         
        }
    };

    const photoHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () =>{
        if (reader.readyState === 2){
          setPhotoToUpdate(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }


    const fetchGrade = (inputValue, callback) => {
        setTimeout(() => {
          fetch(
            "http://localhost:5000/api/Grade/" +
              inputValue,
            {
              method: "GET",
            }
          )
            .then((resp) => {
              return resp.json();
            })
            .then((data) => {
              const tempArray = [];
              const grades = data.data;
              if (grades) {
                if (grades.length) {
                  grades.forEach((element) => {
                    tempArray.push({
                      label: `${element.grade_name}`,
                      value: element._id,
                    });
                  });
                } else {
                  tempArray.push({
                    label: `${grades.grade_name}`,
                    value: grades._id,
                  });
                }
              }
              callback(tempArray);
            })
            .catch((error) => {
              console.log(error, "catch the hoop");
            });
        }, 1000);
    };
    const fetchSL = (selectedSL, callback) => {
        setTimeout(() => {
          fetch(
            "http://localhost:5000/api/serviceline/" +
              selectedSL,
            {
              method: "GET",
            }
          )
            .then((resp) => {
              return resp.json();
            })
            .then((data) => {
              const tempArray = [];
              const sls = data.data;
              if (sls) {
                if (sls.length) {
                  sls.forEach((element) => {
                    tempArray.push({
                      label: `${element.serviceLine}`,
                      value: element._id,
                    });
                  });
                } else {
                  tempArray.push({
                    label: `${sls.serviceLine}`,
                    value: sls._id,
                  });
                }
              }
              callback(tempArray);
            })
            .catch((error) => {
              console.log(error, "catch the hoop");
            });
        }, 1000);
    };

   

    const fetchSSL = (inputValue, callback) => {
        if ( typeof slToUpdate  === 'object') {
        setTimeout(() => {
          fetch(
            "http://localhost:5000/api/serviceline/search/" + slToUpdate.value
            // inputValue
            // selectedSL.value
            ,
            {
              method: "GET",
            }
          )
            .then((resp) => {
              return resp.json();
            })
            .then((data) => {
  
              const tempArray = [];
              const ssls = data.data.SubServiceLines;
              // console.log("ddddddd", ssls)
              
              if (ssls) {
                if (ssls.length) {
                  
                  ssls.forEach((element) => {
                    tempArray.push({
                      label: `${element}`,
                      value: element,
                    });
                  });
                } else {
                  tempArray.push({
                    label: `${ssls}`,
                    value: "",
                  });
                }
              }
  
              
              callback(tempArray);
            })
            .catch((error) => {
              console.log(error, "catch the hoop");
            });
        }, 1000);
        }
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const fromData = new FormData();
           
       
        let data = {
            "Email" : emailToUpdate,
            "firstname" : fnameToUpdate,
            "lastname" : lnameToUpdate,
            "grade" : gradeId,
            "registrationNumber": registrationNumberToUpdate,
            "serviceLine" : slId,
            "subServiceLine" : sslName,
           
            "telephone" : phoneToUpdate,
        }
        // console.log("dataaaaa", data)
        // debugger
        fromData.append("email",emailToUpdate) 
        fromData.append("fname",fnameToUpdate) 
        fromData.append("lname",lnameToUpdate) 
        fromData.append("grade",gradeId) 
        fromData.append("registrationNumber",registrationNumberToUpdate) 
        fromData.append("sl",slId) 
        fromData.append("ssl",sslName) 
        
        // fromData.append("phone",phoneToUpdate)
         
  
        dispatch(
          UpdateUser(fromData, user._id, data)
        )
        .then(() => {
           
          setNotify({isOpen:true, message:'updated successfully', type:'success' })
          
        })
        .catch(() => {
          setNotify({isOpen:true, message:'updated failed', type:'error' })
        });
       
        
            // history.push('/admin/users')
  
           
        
      }
    
    return (
      <>
        <UserHeader />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Form onSubmit={handleUpdate} encType="multipart/form-data" >
          <Row>
            <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
              <Card className="card-profile shadow">
                <Row className="justify-content-center">
                  <Col className="order-lg-2" lg="3">
                    {/* <div className="wrapper">
                      <Input type="file" className="my_file" />
                    </div> */}
                    <div className="card-profile-image">
                        {/* <img
                          alt="..."
                          className="rounded-circle"
                          src={`/uploads/${photoToUpdate}`}

                        /> */}
                          <img
                          alt="..."
                          className="rounded-circle"
                          src={photoToUpdate}

                        />
                      <Input className="my_file" type="file" name="image-upload" id="photo" accept="image/*"
                           onChange={photoHandler} />
                    </div>
                  </Col>
                </Row>
                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                  
                  <div className="d-flex justify-content-between">

                  
                  </div>
                </CardHeader>
                <CardBody className="pt-0 pt-md-4">
                  <Row>
                    <div className="col">
                      <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                        {/* <div>
                          <span className="heading">22</span>
                          <span className="description">Friends</span>
                        </div>
                        <div>
                          <span className="heading">10</span>
                          <span className="description">Photos</span>
                        </div>
                        <div>
                          <span className="heading">89</span>
                          <span className="description">Comments</span>
                        </div> */}
                      </div>
                    </div>
                   
                    {/* <div>
                      <label>
                        <i className="material-icons">add_photo_alternance</i>
                      </label>
                    </div> */}

                  </Row>
                  <div className="text-center">
                    <h3>
                      { fnameToUpdate } { lnameToUpdate }
                      {/* <span className="font-weight-light">, { user.username }</span> */}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      { sl.serviceLine    }
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      { grade.grade_name    }
                    </div>
                    {/* <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                    <hr className="my-4" />
                    <p>
                     {emailToUpdate}<br/>
                    </p>
                    {/* <a href="#pablo" onClick={e => e.preventDefault()}>
                      Show more
                    </a> */}
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0"> {fnameToUpdate}'s Profile </h3>
                    </Col>
                    {/* <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={e => e.preventDefault()}
                        size="sm"
                      >
                        Settings
                      </Button>
                    </Col> */}
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      User information
                    </h6>
                    <div className="pl-lg-4">
                     
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              First Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={fnameToUpdate}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={(e) => setfNameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last name
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={lnameToUpdate}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              onChange={(e) => setLnameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Grade
                            </label>
                            {/* <Input
                              className="form-control-alternative"
                              value={gradeToUpdate}
                              id="input-first-name"
                              placeholder="Grade"
                              type="text"
                              onChange={(e) => setGradeToUpdate(e.target.value)}
                            /> */}
                            <AsyncSelect
                              value={gradeToUpdate}
                              loadOptions={fetchGrade}
                              placeholder={grade.grade_name}
                              onChange={(e) => {
                                onGradeChange(e);
                              }}
                              defaultOptions={true}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Registration Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={registrationNumberToUpdate}
                              id="input-last-name"
                              placeholder="Registration Number"
                              type="text"
                              onChange={(e) => setregistrationNumberToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Serviceline
                            </label>
                            <AsyncSelect
                              value={slToUpdate}
                              loadOptions={fetchSL}
                              placeholder={sl.serviceLine}
                              onChange={(e) => {
                                onSLChange(e);
                              }}
                              defaultOptions={true}
                            />
                            {/* <Input
                              className="form-control-alternative"
                              value={slToUpdate}
                              id="input-first-name"
                              placeholder="Serviceline"
                              type="text"
                              onChange={(e) => setSlToUpdate(e.target.value)}
                            /> */}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              SubServiceline
                            </label>
                            <AsyncSelect
                              value={sslToUpdate}
                              loadOptions={fetchSSL}
                              placeholder={sslToUpdate}
                              onChange={(e) => {
                                onSSLChange(e);
                              }}
                              defaultOptions={true}
                            />
                            {/* <Input
                              className="form-control-alternative"
                              value={sslToUpdate}
                              id="input-last-name"
                              placeholder="SubServiceline"
                              type="text"
                              onChange={(e) => setSslToUpdate(e.target.value)}
                            /> */}
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* Address */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="8">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Email
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={emailToUpdate}
                              id="input-address"
                              placeholder="Home Address"
                              type="email"
                              onChange={(e) => setEmailToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Phone Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={phoneToUpdate}
                              id="input-phone"
                              placeholder="Phone Number"
                              type="number"
                              onChange={(e) => setPhoneToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      
                    </div>
                    <Col className="text-right" >
                      <Button
                          type="submit"
                          color="info"
                          // onClick={handleUpdate}
                          size="md"
                        >
                          Edit profile
                        </Button> 
                      </Col>
                    {/* <hr className="my-4" />
                 
                    <h6 className="heading-small text-muted mb-4">About me</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <label>About Me</label>
                        <Input
                          className="form-control-alternative"
                          placeholder="A few words about you ..."
                          rows="4"
                          defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                          Open Source."
                          type="textarea"
                        />
                      </FormGroup>
                    </div> */}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          </Form>
        </Container>
        <Notification 
          notify={notify}
          setNotify = {setNotify}
         />
      </>
    );
  }


const mapDispatchToProps = dispatch => {
    return {
      fetchUserById : (id) => dispatch(fetchUserById(id)),
      onUpdate : (user) => dispatch(UpdateUser(user)),
      fetchGradeById : (id) => dispatch(fetchGradeById(id)),
      fetchSlById : (id) => dispatch(fetchSlById(id))
    }
  }
  const mapStateToProps = state => {
      console.log("sl", state.sl.data)
  
    return {
      
      user : state.user.data,
      grade : state.grade.data,
      sl: state.sl.data
      
    }
    
    
  };

export default connect (mapStateToProps, mapDispatchToProps)(EditUser);
