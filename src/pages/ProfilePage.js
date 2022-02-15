import React, { Component } from 'react';
//import { Button } from 'reactstrap';
import { Card, ListGroup, ListGroupItem, Col, Row} from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import Navbar from './partials/Navbar'

class ProfilePage extends Component{
    render(){
  return (
    <>
<Navbar />
<Container >
<Row>
    <Col>
{' '}
<Card style={{ width: '18rem' }}>
<Card.Img variant="top" src="https://media.istockphoto.com/photos/handara-gate-bali-picture-id1137010913?k=20&amp;m=1137010913&amp;s=612x612&amp;w=0&amp;h=qeHQgAgKdRWJA_p_OmKq3GBKZMAuskkg-o7MJTR_Vzs=" />
  <Card.Body>
    <Card.Title>MEDHAWI</Card.Title>
    <Card.Text>
      Pro Player.
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem>Description</ListGroupItem>
    <ListGroupItem>Point</ListGroupItem>
    {/* <ListGroupItem>Vestibulum at eros</ListGroupItem> */}
  </ListGroup>
</Card>
</Col>

<Col md={{ span: 9, offset: 0 }}>
<Card>
  <Card.Body>Description.</Card.Body>
</Card>
</Col>
</Row>
</Container>
</>
);
}
}

export default ProfilePage;

