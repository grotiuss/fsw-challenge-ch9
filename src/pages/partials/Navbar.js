import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Navbar.css';
import firebase from '../../auth/firebase'
import { AuthContext } from "../../auth/Auth";

import { Container, Collapse, Nav, Navbar,  NavbarBrand, NavbarToggler, NavItem, NavDropdown } from 'react-bootstrap';

class Navbars extends Component {
    static contextType = AuthContext
    
    showLog(){
        /* const userID = firebase.auth().currentUser.uid
         firebase.database().ref(`profile/${userID}`).update({description: "Hi my name is Medhawi!"}) */
        const user = firebase.auth().currentUser;

        if(user != null){
            return(
                <>
                    <Nav.Link className='text-success fw-bold'>{user.displayName}</Nav.Link>
                    <Nav.Link className='border-end me-1'></Nav.Link>
                    <Nav.Link onClick={() => firebase.auth().signOut()}>Sign Out</Nav.Link>
                </>
            )
        }else{
            console.log("User is not signed in!")
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
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <Nav.Link href="/Profile">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            
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