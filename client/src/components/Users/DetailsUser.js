import React, { useEffect, useState } from "react";
import { connect, useDispatch } from 'react-redux'
import { useParams, useHistory} from "react-router-dom"
import Notification from '../Notification'
import {fetchUserById, UpdateUser} from '../../actions/UserActions'
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

function DetailsUser ({user, fetchUserById}) {



  const { id } = useParams()
  const [usernameToUpdate, setUsernameToUpdate] = useState(user.username)
  useEffect(() => { setUsernameToUpdate(user.username)}, [user.username] )

  const [fnameToUpdate, setfNameToUpdate] = useState(user.name)
  useEffect(() => { setfNameToUpdate(user.name)}, [user.name] )

  const [lnameToUpdate, setLnameToUpdate] = useState(user.name)
  useEffect(() => { setLnameToUpdate(user.name)}, [user.name] )

  const [emailToUpdate, setEmailToUpdate] = useState(user.email)
  useEffect(() => { setEmailToUpdate(user.email)}, [user.email] )

  const [gradeToUpdate, setGradeToUpdate] = useState(user.username)
  useEffect(() => { setGradeToUpdate(user.username)}, [user.username] )

  const [imatriculationToUpdate, setImatriculationToUpdate] = useState(user.username)
  useEffect(() => { setImatriculationToUpdate(user.username)}, [user.username] )

  const [slToUpdate, setSlToUpdate] = useState(user.username)
  useEffect(() => { setSlToUpdate(user.username)}, [user.username] )

  const [sslToUpdate, setSslToUpdate] = useState(user.username)
  useEffect(() => { setSslToUpdate(user.username)}, [user.username] )

  const [adressToUpdate, setAddressToUpdate] = useState(user.username)
  useEffect(() => { setAddressToUpdate(user.username)}, [user.username] )

  const [cityToUpdate, setCityToUpdate] = useState(user.username)
  useEffect(() => { setCityToUpdate(user.username)}, [user.username] )

  const [countryToUpdate, setCountryToUpdate] = useState(user.username)
  useEffect(() => { setCountryToUpdate(user.username)}, [user.username] )

  const [pcodeToUpdate, setPcodeToUpdate] = useState(user.username)
  useEffect(() => { setPcodeToUpdate(user.username)}, [user.username] )

  const [phoneToUpdate, setPhoneToUpdate] = useState(user.username)
  useEffect(() => { setPhoneToUpdate(user.username)}, [user.username] )

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
    // const fetchData = async () => {
    //   const result = await fetchMemberById(memberId)
    //   setMember(result)
    //   console.log("result: ",result);
    //   debugger;
    // }
    // fetchData()
  }, [id])

 
    const handleUpdate = (e) => {
      e.preventDefault();
      const fromData = new FormData();
      let data = {
          id: user.id,
          username: usernameToUpdate,
          email : emailToUpdate,
          fname : fnameToUpdate,
          lname : lnameToUpdate,
          grade : gradeToUpdate,
          immatriculation: imatriculationToUpdate,
          sl : slToUpdate,
          ssl : sslToUpdate,
          adress : adressToUpdate,
          city : cityToUpdate,
          country : countryToUpdate,
          pcode : pcodeToUpdate,
          phone : phoneToUpdate,
          photo : photoToUpdate
      }
      fromData.append("username", usernameToUpdate)
      fromData.append("email",emailToUpdate) 
      fromData.append("fname",fnameToUpdate) 
      fromData.append("lname",lnameToUpdate) 
      fromData.append("grade",gradeToUpdate) 
      fromData.append("immatriculation",imatriculationToUpdate) 
      fromData.append("sl",slToUpdate) 
      fromData.append("ssl",sslToUpdate) 
      fromData.append("adress",adressToUpdate)
      fromData.append("city",cityToUpdate)
      fromData.append("country",countryToUpdate)
      fromData.append("pcode",pcodeToUpdate)
      fromData.append("phone",phoneToUpdate)
      fromData.append("photo",photoToUpdate) 

      dispatch(
        UpdateUser(fromData, user.id, data)
      )
      .then(() => {
         
        setNotify({isOpen:true, message:'updated successfully', type:'success' })
        
      })
      .catch(() => {
        setNotify({isOpen:true, message:'updated failed', type:'error' })
      });
     
      
          // history.push('/admin/users')

         
      
    }

    const photoHandler = (e) => {
      const reader = new FileReader();
      reader.onload = () =>{
        if (reader.readyState === 2){
          setPhotoToUpdate(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
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

                    {/* <Button
                      className="mr-4"
                      color="info"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Connect
                    </Button>
                    <Button
                      className="float-right"
                      color="default"
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      size="sm"
                    >
                      Message
                    </Button> */}
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
                      { fnameToUpdate }
                      {/* <span className="font-weight-light">, { user.username }</span> */}
                    </h3>
                    <div className="h5 font-weight-300">
                      <i className="ni location_pin mr-2" />
                      { user.website    }
                    </div>
                    <div className="h5 mt-4">
                      <i className="ni business_briefcase-24 mr-2" />
                      Software Engineer
                    </div>
                    {/* <div>
                      <i className="ni education_hat mr-2" />
                      University of Computer Science
                    </div> */}
                    <hr className="my-4" />
                    <p>
                     {emailToUpdate}<br/>
                     {usernameToUpdate }
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
                      <h3 className="mb-0">Profile de {fnameToUpdate}</h3>
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
                              htmlFor="input-username"
                            >
                              Username
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={usernameToUpdate}
                              id="input-username"
                              placeholder="Username"
                              type="text"
                              onChange={(e) => setUsernameToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email 
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-email"
                              value={emailToUpdate}
                              placeholder="user@example.com"
                              type="email"
                              onChange= {(e) => setEmailToUpdate(e.target.value)}
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
                              Nom
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
                              Prénom
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
                            <Input
                              className="form-control-alternative"
                              value={gradeToUpdate}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={(e) => setGradeToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Immatriculation
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={imatriculationToUpdate}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              onChange={(e) => setImatriculationToUpdate(e.target.value)}
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
                              SL
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={slToUpdate}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={(e) => setSlToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              SSL
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={sslToUpdate}
                              id="input-last-name"
                              placeholder="Last name"
                              type="text"
                              onChange={(e) => setSslToUpdate(e.target.value)}
                            />
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
                              Adresse
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={adressToUpdate}
                              id="input-address"
                              placeholder="Home Address"
                              type="text"
                              onChange={(e) => setAddressToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Téléphone
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={phoneToUpdate}
                              id="input-city"
                              placeholder="City"
                              type="text"
                              onChange={(e) => setPhoneToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Ville
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={cityToUpdate}
                              id="input-city"
                              placeholder="City"
                              type="text"
                              onChange={(e) => setCityToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Pays
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={countryToUpdate}
                              id="input-country"
                              placeholder="Country"
                              type="text"
                              onChange={(e) => setCountryToUpdate(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Code postal
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              value={pcodeToUpdate}
                              placeholder="Postal code"
                              type="number"
                              onChange={(e) => setPcodeToUpdate(e.target.value)}
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
      onUpdate : (user) => dispatch(UpdateUser(user))
    }
  }
  const mapStateToProps = state => {
    // console.log("usersssssss",state.user.data)
  
    return {
      
      user : state.user.data,
      
    }
    
  };

export default connect (mapStateToProps, mapDispatchToProps)(DetailsUser);
