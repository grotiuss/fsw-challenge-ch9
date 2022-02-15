import React, { Component } from 'react';
import { Card, Container, ListGroup, ListGroupItem } from 'react-bootstrap';

import firebase from '../auth/firebase';

class ProfileList extends Component{
    constructor(props){
        super(props);
    
        this.state ={
            isLoading:true,
        };
    }

    componentDidMount(){
        this.getData()
    }

    async getData(){
        try {
            const snapshot = await firebase.database().ref('profile').once('value')
            this.setState({
                isLoading: false,
                value: snapshot.val()
            })
        } catch (error) {
            console.log(error)
        }
    }

    get listOfUsers(){
        const { value } = this.state;
        return(
            <div>
                <div className='row text-center'>
                {Object.keys(value).map(function(name, index){
                        return (
                                <Card style={{ width: '18rem' }} key={index} className='m-3'>
                                    <Card.Img variant="top" 
                                    style={{width: '100%', height: '15vw', objectFit: 'contain'}}
                                     src={value[name].imageLink}
                                     className='rounded-3 img-thumbnail'
                                     />
                                     <Card.Title>{value[name].name}</Card.Title>
                                    <Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroupItem>Description: {value[name].description}</ListGroupItem>
                                        <ListGroupItem>Level: {value[name].point}</ListGroupItem>
                                    </ListGroup>
                                    </Card.Body>
                                </Card>
                        )
                })}
                </div>
            </div>
        )
    }

    Loader(){
        return <h3>Loading...</h3>

    }

    render(){
        return(
            <div>
                <Container>

                    {this.state.isLoading ? this.Loader : this.listOfUsers}

                </Container>
            </div>
        )
    }
}

export default ProfileList;
