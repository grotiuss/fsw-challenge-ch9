import React, { Component } from 'react';
//import { Button } from 'reactstrap';
import { Card, ListGroup, ListGroupItem, Col, Row} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Navbar from './partials/Navbar'

class ProfilePage extends Component{
    render(){
      return (
      <div>
        <Container className='mt-5 justify-content-center'>
          <h1>Your Profile</h1>
        <Row>

          <Col sm={4}>
          <img 
          className='img-thumbnail'
          src="https://media.istockphoto.com/photos/handara-gate-bali-picture-id1137010913?k=20&amp;m=1137010913&amp;s=612x612&amp;w=0&amp;h=qeHQgAgKdRWJA_p_OmKq3GBKZMAuskkg-o7MJTR_Vzs=" />
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>MEDHAWI</Card.Title>
              <Card.Text>
                Pro Player.
              </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Description</ListGroupItem>
              <ListGroupItem>Point</ListGroupItem>
            </ListGroup>
          </Card>
        </Col>

        <Col sm={4}>
          <Card>
            <Card.Body>Description.</Card.Body>
          </Card>
        </Col>
        </Row>
        </Container>
      </div>
      );
}
}

export default ProfilePage;

