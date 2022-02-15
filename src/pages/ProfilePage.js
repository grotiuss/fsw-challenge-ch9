import React, { Component } from 'react';
import { Card, Col, Row, Container, Form, Button, Modal, } from 'react-bootstrap';
// import {Card, ListGroup, ListGroupItem, Col, Row, Container, Form, Input} from 'reactstrap'
import firebase from '../auth/firebase';



class ProfilePage extends Component{


  constructor(props){
    super(props);

    this.state ={
      show: false
    };

  }

  set = name => event => {
    console.log(event.target.value)  
    this.setState({[name]: event.target.value});
  }

  componentDidMount(){
    this.fetchData()
  }

  async fetchData(){
    try{
      let userID = firebase.auth().currentUser
      let profileDB = await firebase.database().ref(`profile/${userID.uid}`).once('value')
      this.setState({
        username: userID.displayName,
        level: profileDB.val().point,
        description: profileDB.val().description,
        image: profileDB.val().imageLink
      })

    }
    catch(err){
      console.log(err)
    }
  }

  handleSubmit = async (event) => {
    const {username, description, image} = this.state;
    let userID = firebase.auth().currentUser
    let profileDB = firebase.database().ref(`profile/${userID.uid}`)
    event.preventDefault()

    console.log(description.length)
    if(description.length > 200){
      return alert('Your description has surpassed the maximum amount!')
    }
    try {
      await profileDB.update(
            {
              username: username,
              description: description,
              imageLink: image
            }).then(userID.updateProfile({
              displayName: username
            }))
      alert('Your Profile has been updated!')
    } catch (err) {
      console.log(err)
    }
  }

  handleClose = () =>{
    this.setState({
      show: false
    })
  }
  
  handleShow = () => {
    this.setState({
      show: true
    })
  }
  
  render(){
      
      return (
      <div>
        <Container className='mt-5 justify-content-center'>
          <h1>Your Profile</h1>
          <form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm={4}>
              <button type='button' className='border-0' onClick={this.handleShow}>
                <img 
                alt='Profile'
                className='img-thumbnail'
                src={this.state.image}
                />
              </button>
             
              <Card style={{ width: '18rem' }}>
                <Card.Body>
                  <Card.Title>
                    <input 
                      value={this.state.username || ''} 
                      className='border-0 form-control'
                      onChange={this.set('username')}
                    />
                  </Card.Title>
                  <Card.Text className='form-control border-0'>
                  Level: {this.state.level}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Enter image link to update your profile!</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input 
                  className='form-control'
                  onChange={this.set('image')}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Col sm={4}>
              <Card>
                <Card.Body>
                  <h5>Description</h5>
                <Card.Text>
                  <input 
                    value={this.state.description || ''} 
                    className='border-0 form-control'
                    onChange={this.set('description')}
                    />
                </Card.Text>
                </Card.Body>
              </Card>
              <input type="submit" value="Submit" className=' btn btn-success'/>
            </Col>
            </Row>
          </form>
        </Container>
      </div>
      );
}
}

export default ProfilePage;

