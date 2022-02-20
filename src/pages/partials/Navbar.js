import React, { Component } from 'react';

import './Navbar.css';
import firebase from '../../auth/firebase'
import { AuthContext } from "../../auth/Auth";

import { Container, Collapse, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import LoadingAnimation from '../Components/LoadingAnimation_1'

class Navbars extends Component {
    static contextType = AuthContext
    constructor(props) {
        super(props)
        this.state = {
            data: {
                id: null,
                username: null,
                asAdmin: false
            },
            isLoading: true
        }
    }

    componentDidMount() {
        this.getUserData()
    }

    getUserData(){
        this.setState({
            data: {
                id: this.props.userSession.id,
                username: this.props.userSession.username,
                asAdmin: this.props.userSession.asAdmin
            },
            isLoading: true
        })
    }

    signOut() {
        localStorage.removeItem("token")
        this.props.history.push('/')
    }
    
    showLog(){
        if(this.state.data.username){
            return(
                <>
                    <Nav.Link className='text-success fw-bold' href='/profile'>{this.state.data.username}</Nav.Link>
                    <Nav.Link className='border-end me-1'></Nav.Link>
                    <Nav.Link onClick={this.signOut} href="/">Sign Out</Nav.Link>
                </>
            )
        }else{
            return(
                <>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                </>
            )
        }
        
    }
    
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" bg="black" variant="dark">
                <Container>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <NavDropdown title="Others" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="profile-list">See other user</NavDropdown.Item>
                            <NavDropdown.Divider />
                            {/* <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                            
                        </NavDropdown>
                        </Nav>
                        <Nav>
                            {this.showLog()}
                            
                            {/* <Nav.Link onClick={() => firebase.auth().signOut()}>Sign out</Nav.Link>

                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link> */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        )
    }
}

export default Navbars;