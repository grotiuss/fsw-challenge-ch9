import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import Navbar from './partials/Navbar'




class RegisterPage extends Component{
    render(){
  return (
    <>
<Col xs={8} sm={12} md={12} className="text-center pt-sm-5 pt-xl-5">
    <h1>SIGN UP</h1>                       
</Col>
<Container>
<Form inline>
<FormGroup>
    <Label
      for="exampleName"
      hidden
    >
      Your Name
    </Label>
    <Input
      id="exampleName"
      name="name"
      placeholder="Your Name"
      type="text"
    />
  </FormGroup>
  {' '}
  <FormGroup>
    <Label
      for="exampleEmail"
      hidden
    >
      Your Email
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="Your Email"
      type="email"
    />
  </FormGroup>
  {' '}
  <FormGroup>
    <Label
      for="examplePassword"
      hidden
    >
      Your Password
    </Label>
    <Input
      id="examplePassword"
      name="password"
      placeholder="Your Password"
      type="password"
    />
    </FormGroup>
    {' '}
  <FormGroup>
     <Label
      for="examplePassword"
      hidden
    >
      Retype Your Password
    </Label>
    <Input
      id="examplePassword"
      name="retype-password"
      placeholder="Retype Your Password"
      type="password"
    />
  </FormGroup>
  {' '}
  <FormGroup check>
    <Input
      id="exampleCheck"
      name="check"
      type="checkbox"
    />
    <Label
      check
      for="exampleCheck"
    >
      I Agree all statements in <a href="#!">Terms of service</a>
    </Label>
  </FormGroup>
  {' '}
  <Button>
    Sign Up
  </Button>
</Form>
</Container>

</>
  );
}
}


export default RegisterPage; 