import React, {useState, useEffect} from 'react'
import { useDispatch, connect } from 'react-redux'
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography, makeStyles } from '@material-ui/core'
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
  import  './user.css'
  import Notification from '../Notification'
import { addUser, fetchGrade } from '../../actions/UserActions';
import AsyncSelect from "react-select/async";
import axios from 'axios';




const useStyles = makeStyles( theme => ({
    dialog: {
        padding:  theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(0),
        backgroundColor: '#f6f9fc'
      },
      dialogContent: {
        //   textAlign: 'center'
      },
      dialogActions : {
          justifyContent : 'center'
      },
    
  }))
  
function AddUser (props, {user}) {
    
    const { addDialog, setAddDialog } = props;  
    const classes = useStyles()
    const [username, setUsername] = useState("")

    const [fname, setfName] = useState("")

    const [lname, setLname] = useState("")

    const [email, setEmail] = useState("")

    const [selectedGrade, setSelectedGrade] = useState({})

    const [registrationNumber, setregistrationNumber] = useState("")

    const [selectedSL, setSelectedSL] = useState({})

    const [selectedSSL, setSelectedSSL] = useState({})

    const [adress, setAddress] = useState("")

    const [city, setCity] = useState("")

    const [country, setCountry] = useState("")

    const [pcode, setPcode] = useState("")

    const [phone, setPhone] = useState("")

    const [photo, setPhoto] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png')


    const [notify, setNotify] = useState ({ isOpen: false, message:'', type:'' })

    const dispatch = useDispatch()

   


    const photoHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () =>{
          if (reader.readyState === 2){
            setPhoto(reader.result)
          }
        }
        reader.readAsDataURL(e.target.files[0])
    }


    

    const handleAdd = (e) => {
      e.preventDefault();
      setAddDialog({isOpen:false})

      let data = {
        "Email" : email,
        "firstname" : fname,
        "lastname" : lname,
        "grade" : selectedGrade.value,
        "registrationNumber": registrationNumber,
        "serviceLine" : selectedSL.value,
        "subServiceLine" : selectedSSL.value,
        "telephone" : phone,
        "password" : registrationNumber
       
    }

      // console.log("dataaaaa", data)
      // debugger

      // const fromData = new FormData();

      // fromData.append("username", username)
      // fromData.append("email",email) 
      // fromData.append("fname",fname) 
      // fromData.append("lname",lname) 
      // fromData.append("grade",selectedGrade) 
      // fromData.append("immatriculation",registrationNumber) 
      // fromData.append("sl",selectedSL) 
      // fromData.append("ssl",selectedSSL) 
      // fromData.append("adress",adress)
      // fromData.append("city",city)
      // fromData.append("country",country)
      // fromData.append("pcode",pcode)
      // fromData.append("phone",phone)
      // fromData.append("photo",photo) 

      dispatch(
        addUser(data)
      )
      .then(() => {
         
        setNotify({isOpen:true, message:'added successfully', type:'success' })
        
      })
      .catch(() => {
        setNotify({isOpen:true, message:'added failed', type:'error' })
      });
   
    }


    // const fetchData = () =>{
    //   dispatch(
    //     fetchGrade()
    //   )
    // }

    const onGradeChange = (selectedGrade) => {
      if (selectedGrade) {
        setSelectedGrade(selectedGrade)
      }
    };

    const onSLChange = (selectedSL) => {
      if (selectedSL) {
        setSelectedSL(selectedSL)
      }
    };

    const onSSLChange = (selectedSSL) => {
      if (selectedSSL) {
        setSelectedSSL(selectedSSL)
      }
    };
    
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

    const idSL = selectedSL.value
 

    const fetchSSL = (inputValue, callback) => {
      // console.log("id", callback)
      setTimeout(() => {
        fetch(
          "http://localhost:5000/api/serviceline/search/" + idSL
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
    };

       

        return (
          <>
            <Dialog open={addDialog.isOpen} classes={{paper:classes.dialog}}>
            
                <DialogContent className={classes.dialogContent}>
                <CardBody>
                  <Form>
                  <Row className="">
                    {/* <div className="wrapper">
                      <Input type="file" className="my_file" />
                    </div> */}
                    <div className="card-image ">
                        {/* <img
                          alt="..."
                          className="rounded-circle"
                          src={`/uploads/${photo}`}

                        /> */}
                          <img
                          alt="..."
                          className="rounded-circle"
                          src={photo}

                        />
                      <Input className="image" type="file" name="image-upload" id="photo" accept="image/*"
                           onChange={photoHandler} />
                    </div>
                </Row>
                
                <br/><br/>
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
                              value={fname}
                              id="input-first-name"
                              placeholder="First Name"
                              type="text"
                              onChange={(e) => setfName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Last Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              value={lname}
                              id="input-last-name"
                              placeholder="Last Name"
                              type="text"
                              onChange={(e) => setLname(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
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
                              value={registrationNumber}
                              id="input-last-name"
                              placeholder="Registration Number"
                              type="text"
                              onChange={(e) => setregistrationNumber(e.target.value)}
                            />
                            
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                          <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Grade
                            </label>
                            <AsyncSelect
                              value={selectedGrade}
                              loadOptions={fetchGrade}
                              placeholder="Grade"
                              onChange={(e) => {
                                onGradeChange(e);
                              }}
                              defaultOptions={true}
                            />
                            {/* <Input
                              className="form-control-alternative"
                              value={grade}
                              id="input-first-name"
                              placeholder="First name"
                              type="text"
                              onChange={(e) => setGrade(e.target.value)}
                            /> */}
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
                              ServiceLine
                            </label>
                            <AsyncSelect
                              value={selectedSL}
                              loadOptions={fetchSL}
                              placeholder="SL"
                              onChange={(e) => {
                                onSLChange(e);
                              }}
                              defaultOptions={true}
                            />
                            {/* <Input
                              className="form-control-alternative"
                              value={sl}
                              id="input-first-name"
                              placeholder="SL"
                              type="text"
                              onChange={(e) => setSl(e.target.value)}
                            /> */}
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              SubServiceLine
                            </label>
                            <AsyncSelect
                              value={selectedSSL}
                              loadOptions={fetchSSL}
                              placeholder="SSL"
                              onChange={(e) => {
                                onSSLChange(e);
                              }}
                              defaultOptions={true}
                            />
                            {/* <Input
                              className="form-control-alternative"
                              value={ssl}
                              id="input-last-name"
                              placeholder="SSL"
                              type="text"
                              onChange={(e) => setSsl(e.target.value)}
                            /> */}
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    {/* CONTACT */}
                    <h6 className="heading-small text-muted mb-4">
                      Contact information
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="8">
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
                              value={email}
                              placeholder="user@example.com"
                              type="email"
                              onChange= {(e) => setEmail(e.target.value)}
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
                              value={phone}
                              id="input-city"
                              placeholder="Phone Number"
                              type="text"
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      {/* <Row>
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
                              value={city}
                              id="input-city"
                              placeholder="Ville"
                              type="text"
                              onChange={(e) => setCity(e.target.value)}
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
                              value={country}
                              id="input-country"
                              placeholder="Pays"
                              type="text"
                              onChange={(e) => setCountry(e.target.value)}
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
                              value={pcode}
                              placeholder="Code Postal"
                              type="number"
                              onChange={(e) => setPcode(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                      </Row> */}
                    </div>
     
                  </Form>
                </CardBody>
                   
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                     <Button color="success" 
                    onClick={handleAdd}
                    >ADD</Button>
                     
                    <Button 
                        onClick={() => { setAddDialog({isOpen:false}) } }
                    >Cancel</Button> 


                </DialogActions>

            </Dialog>
            <Notification 
            notify={notify}
            // onClose={this.handleCloseNotify}
            setNotify = {setNotify}
           />
           </>
            
            
        )
        
    
}

const mapStateToProps = state => {
  // console.log("usersssssss",state.user.data)

  return {
    grades : state.user.data
    
  }
};

export default connect (mapStateToProps, "")(AddUser);
