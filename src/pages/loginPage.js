import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import Navbar from './partials/Navbar'




class LoginPage extends Component{
    render(){
  return (
    <>
<Navbar />
<Container>
<Col xs={8} sm={12} md={12} className="text-center pt-sm-5 pt-xl-5">
    <h1>SIGN IN</h1>                       
</Col>
<Form inline>
  <FormGroup>
    <Label
      for="exampleEmail"
      hidden
    >
      Email
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="Email"
      type="email"
    />
  </FormGroup>
  {' '}
  <FormGroup>
    <Label
      for="examplePassword"
      hidden
    >
      Password
    </Label>
    <Input
      id="examplePassword"
      name="password"
      placeholder="Password"
      type="password"
    />
  </FormGroup>
  {' '}
  <Button>
    Sign In
  </Button>
</Form>
</Container>

</>
  );
}
}


export default LoginPage; 