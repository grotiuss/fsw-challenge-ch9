import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'
// import {
//   Form,
//   Container,
//   Row
// } from 'react-bootstrap'
import { Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';

import Navbar from './partials/Navbar'
import firebase from '../auth/firebase';
import { AuthContext } from "../auth/Auth";


class LoginPage extends Component{
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
      const { email, password}  = this.state;
      const { history } = this.props
      event.preventDefault();

       // Validasi
       if(!email || !password) return alert('Please insert missing credentials!')

       // Register via Firebase
       try {
          const login = await firebase.auth().signInWithEmailAndPassword(email, password)
           history.push('/');
       } catch(error) {
           alert('Failed to Login')
           console.log(error)
       }
  }

  render(){
      const { currentUser } = this.context
      if (!!currentUser) return <Redirect to="/" />
      return(
        <>
        <Col xs={8} sm={12} md={12} className="text-center pt-sm-5 pt-xl-5">
            <h1>LOGIN</h1>                       
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

          <Button className='btn-success'>
            Login
          </Button>
        </Form>
        </Container>
  
      </>
      )
  }
}

export default LoginPage; 