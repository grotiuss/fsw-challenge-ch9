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

    handleSubmit = async(event) =>{
        const {email} = this.state;
        event.preventDefault();

       if(!email ) return alert('Please insert your email!')

       try {
           firebase.auth().sendPasswordResetEmail(email)
                            .then(alert('Please check your email!'))
       } catch (error) {
           alert('Failed to send')
           console.log(error)
       }
        
    }
    render(){
        return(
            <>
            <Container>
                <Form inline onSubmit={this.handleSubmit}>
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
                    <Button className='btn-success'>
                        Send to email!
                    </Button>
                </Form>
            </Container>
            
            </>
        )
    }
}

export default ForgotPass;