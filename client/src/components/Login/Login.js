
import React from "react";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

class Login extends React.Component {
  render() {
    return (
      <>
        <Col lg="6" md="7">
          <Card className="bg-white shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              {/* <div className="text-muted text-center mt-2 mb-3">
                <small>Sign in with</small>
              </div> */}
              <div className="btn-wrapper text-center">
                
                  <img alt="..." src={require("assets/img/brand/logoChaise.png")} 
                    style= {{
                    width: "200px",
                    height : "50%"
                    }} />
              </div>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-5">
              
              <Form role="form">
                <FormGroup className="mb-3">
                  <InputGroup className="input-group-alternative ">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-secondary">
                        <i className="ni ni-email-83" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input className="bg-secondary" placeholder="Email" type="email" autoComplete="new-email"/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup className="input-group-alternative">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText className="bg-secondary">
                        <i className="ni ni-lock-circle-open" />
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input className="bg-secondary" placeholder="Password" type="password" autoComplete="new-password"/>
                  </InputGroup>
                </FormGroup>
                <div className="custom-control custom-control-alternative custom-checkbox">
                  <input
                    className="custom-control-input"
                    id=" customCheckLogin"
                    type="checkbox"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor=" customCheckLogin"
                  >
                    <span className="text-muted">Remember me</span>
                  </label>
                </div>
                <div className="text-center">
                  <Button className="my-4" color="info" type="button">
                    Sign in
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
          <Row className="mt-3">
            <Col xs="6">
              <a
                className="text-default"
                href="#pablo"
                onClick={e => e.preventDefault()}
              >
                <small>Forgot password?</small>
              </a>
            </Col>
            
            
          </Row>
        </Col>
      </>
    );
  }
}

export default Login;
