import React from 'react';
import { Form, FormGroup, Label, Input, FormText, Row, Col} from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { Container } from 'react-bootstrap';
import './LoginPage.css'

import LoadingAnimation from './Components/LoadingAnimation_1'

class LoadingLayer extends React.Component {
  render() {
    return(
      <div  className='dark-layer'>
        <LoadingAnimation />
      </div>
    )
  }
}

export default class LoginPage extends React.Component {
  constructor() {
      super();
      this.state = {
          username: '',
          password: '',
          isLoading: false,
          sessionStorage : sessionStorage.getItem("username")
      }

      // this.username = this.username.bind(this)
      // this.password = this.password.bind(this)
  }

  setLoading = () => {
    this.setState({
      isLoading: true
    })
  }

  signIn = (e) => {
      this.setLoading()
      fetch('https://myfirst-api-101.herokuapp.com/login', {
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
            alert(result.message)
            this.setState({
              isLoading: false
            })
            if(result.data) {
              localStorage.setItem("token", result.data.accessToken)
            }

          })
      e.preventDefault()
      // console.log('Clicked')
  }

  get Redirect () {
    return(
      <>
        <Redirect push to="./" />
      </>
    )
  }

  get Form () {
    return (
      <Container id='registerForm' className='mt-5'>
        <Row className="justify-content-center">
            <Col xs='5' className='text-center'>
                <h2>Login</h2>
            </Col>
        </Row>
        <Row className="justify-content-center">
            <Col xs='8' className='mt-5'>
                <Form  onSubmit={this.signIn}>
                    <FormGroup>
                        <Label for="username">Username</Label>
                        <Input type="text" name="username" id="username" onChange={(e) => { this.setState({ username: e.target.value }) }} placeholder="Username" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" onChange={(e) => { this.setState({ password: e.target.value }) }} placeholder="Password" />
                    </FormGroup>
                    <Input type='submit' value='Sign In'>Sign In</Input>
                </Form>
            </Col>
        </Row>
      </Container>
    )
  }

  get Content () {
    const userToken = localStorage.getItem("token")
    return(
      <>
        { userToken ? this.Redirect : this.Form }
      </>
    )
  }

  get Loader () {
    return (
      <>
        <LoadingLayer />
        {this.Content}
      </>
    )
  }

  render() {
      // console.log(this.state.sessionStorage)
      return (
          <>
              {this.state.isLoading ? this.Loader : this.Content}
          </>
      );
  }
}
