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
        <Container id='header' className='pt-5 pt-xs-5 pt-sm-5 pt-md-1' fluid>
            <Container className='Container pt-sm-3 pt-lg-5'>
                <Row className="justify-content-center pt-5 pt-sm-5">
                    <Col xs={12} sm={12} md={8} className="text-center pt-sm-5 pt-xl-5">
                        {/* <h1>PLAY TRADISIONAL GAME</h1> */}
                        <h1>Hasil test commit grotiuss</h1>
                        <p className="body" style={ { fontWeight: 'bold' } }>Exprience new traditional game play</p>
                        <a href="/game" class="btn main-button btn-warning mt-3" target="_blank">
                            <div class="row">
                                <div class="col-3"><i class="fas fa-play"></i></div>
                                <div class="col-9 text-center" style={ { whiteSpace: 'nowrap', fontWeight: 'bold' } }>
                                    PLAY NOW
                                </div>
                            </div>
                        </a>
                    </Col>
                </Row>
            </Container>
            <Container fluid>
                    <div className="position-absolute bottom-0 start-50 translate-middle-x text-center">
                        <a href="#" style={ {color: "white", fontWeight: "bold", textDecoration: "none"} }>
                            <p>THE STORY</p>
                            <i class="fas fa-angle-double-down"></i>
                        </a>
                    </div>
            </Container>
        </Container>
    </>
  );
}

export default Home;