import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import './Home.css'

import { Container } from 'reactstrap';
import Navbar from './partials/Navbar'

function Home() {
    let styleObj = { fontSize: '80px' }
  return (
    <>
        <Navbar />
        <Container id='header' className='mt-5' fluid>
            <Container className='Container pt-5 pt-md-2 pt-lg-5'>
                <Row className="justify-content-center mt-xxl-3">
                    <Col xs={12} sm={12} md={8} className="text-center">
                        <h1>PLAY TRADISIONAL GAME</h1>
                        <p className="body" style={ { fontWeight: 'bold' } }>Exprience new traditional game play</p>
                        <a href="/game" className="btn main-button btn-warning mt-3" target="_blank">
                            <Row className="justify-content-center">
                                <Col className='text-center' style={
                                    {
                                        whiteSpace: 'nowrap',
                                        fontWeight: 'bold'
                                    }
                                }>
                                    PLAY NOW
                                </Col>
                            </Row>
                            {/* <div className="row">
                                <div className="col-9 text-center" style={ { whiteSpace: 'nowrap', fontWeight: 'bold' } }>
                                    PLAY NOW
                                </div>
                            </div> */}
                        </a>
                    </Col>
                </Row>
            </Container>
        </Container>
    </>
  );
}

export default Home;