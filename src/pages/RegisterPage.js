import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import Navbar from './partials/Navbar'
import { Redirect } from 'react-router-dom'

import firebase from '../auth/firebase';
import { AuthContext } from "../auth/Auth";


class RegisterPage extends Component{
  static contextType = AuthContext; 
  constructor(props){
      super(props);

      this.state ={};
  }

  set = name => event => {
      console.log(event.target.value)  
      this.setState({[name]: event.target.value});
  }

  handleSubmit = async(event) => {
    const { email, password, passwordConfirm, agreeStatement}  = this.state;
    const { history } = this.props
    event.preventDefault();

     // Validasi
     if(!email || !password) return alert('Please insert missing credentials!')
     if(password !== passwordConfirm) return alert('Password did not match!')
     if(!agreeStatement) return alert('Please agree with the terms to continue!')

     // Register via Firebase
     try {
        const register = await firebase.auth().createUserWithEmailAndPassword(email, password)
         history.push('/');
     } catch(error) {
         alert('Failed to Login')
         console.log(error)
     }
}
    render(){
      const { currentUser } = this.context
      if (!!currentUser) return <Redirect to="/" />

      return (
    <>
      <Col xs={8} sm={12} md={12} className="text-center pt-sm-5 pt-xl-5">
          <h1>SIGN UP</h1>                       
      </Col>
      <Container>
      <Form inline onSubmit={this.handleSubmit}>
        
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
            onChange={this.set('email')}
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
            name="password"
            placeholder="Your Password"
            onChange={this.set('password')}
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
            name="retype-password"
            placeholder="Retype Your Password"
            type="password"
            onChange={this.set('passwordConfirm')}
          />
        </FormGroup>
        {' '}
        <FormGroup check>
          <Input
            id="exampleCheck"
            name="check"
            type="checkbox"
            value={true}
            onChange={this.set('agreeStatement')}

          />
          <Label
            check
            for="exampleCheck"
          >
            I Agree all statements in <a href="#!">Terms of service</a>
          </Label>
        </FormGroup>
        {' '}
        <Button className='btn-success'>
          Sign Up
        </Button>
      </Form>
      </Container>

    </>
  );
}
}


export default RegisterPage; 