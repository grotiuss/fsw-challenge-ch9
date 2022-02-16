import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Redirect } from 'react-router-dom'

import { Form, FormGroup, Label, Input, Container, Col} from 'reactstrap';
import firebase from '../auth/firebase';



class ForgotPass extends Component{
    constructor(props){
        super(props);
  
        this.state ={};
    }
    set = name => event => {
        // console.log(event.target.value)  
        this.setState({[name]: event.target.value});
    }
    render(){
        return(
            <>
                <Form>
                <FormGroup>
                <Label
                  for="exampleEmail"
                  hidden
                >
                  Enter your Email!
                </Label>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Your Email"
                  type="email"
                  onChange={this.set('email')}
                />
              </FormGroup>
            </Form>
            </>
        )
    }
}

export default ForgotPass;