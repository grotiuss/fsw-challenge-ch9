import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Row, Col } from 'reactstrap';
import { Container } from 'react-bootstrap';
import './RegisterTest.css'

import Navbar from './partials/Navbar'

export default class LoginTest extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: ''
        }

        // this.username = this.username.bind(this)
        // this.password = this.password.bind(this)
    }

    username = (e) => {
        this.setState({ username: e.target.value })
    }

    password = (e) => {
        this.setState({ password: e.target.value })
    }

    register = (e) => {
        fetch('http://localhost:5000/user/register', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }) .then((response) => response.json())
            .then((result) => {
                if(result.result == 'SUCCESS'){
                    alert(result.message)
                    this.props.history.push('/')
                }
                else
                    alert('There was a problem when creating account')
            })
    }



    render() {
        console.log(this.state)
        return (
            <>
                <Navbar />
                <Container id='registerForm' className='mt-5'>
                    <Row className="justify-content-center">
                        <Col xs='5' className='text-center'>
                            <h2>Register</h2>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs='8' className='mt-5'>
                            <Form>
                                <FormGroup>
                                    <Label for="username">Username</Label>
                                    <Input type="text" name="username" id="username" onChange={this.username} placeholder="Username" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">Password</Label>
                                    <Input type="password" name="password" id="password" onChange={this.password} placeholder="Password" />
                                </FormGroup>
                                <Button onClick={this.register}>Submit</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}
