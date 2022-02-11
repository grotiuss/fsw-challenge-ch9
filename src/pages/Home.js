import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Row, Col, Card, Image } from 'react-bootstrap';
import './Home.css'

import { Container, Button } from 'reactstrap';
import Navbar from './partials/Navbar'

// function GameCard(name) {
//     return(
//         <h2>name</h2>
//     )
// }

class GameCard extends Component {
    render() {
        const { title, description, imageFileName } = this.props
        const gameImage = require('./rock-paper-scissor.jpg')
        return (
            <>
                <div className='text-center pb-3'>
                    <Image style={
                        {
                            resize:'cover',
                            height: '100%',
                            width: '100%'
                        }
                    } src={gameImage} />

                </div>
                <span className='game-list-name'>{title}</span>
                <br></br>
                <span style={ { color: 'white', fontSize:'100%' } }>{description}</span>
            </>
        )
    }
}

function Home() {
    let styleObj = { fontSize: '80px' }
    const gameList = [
        {
            name: 'Rock Paper Scissors',
            description: 'Permaianan suit batu gunting kertas'
        },
        {
            name: 'Snake and Stair',
            description: 'Permainan ular tangga'
        },
        {
            name: 'Ludo',
            description: 'Permainan ludo'
        },
        {
            name: 'Rock Paper Scissors',
            description: 'Permaianan suit batu gunting kertas'
        },
        {
            name: 'Snake and Ladder',
            description: 'Permainan ular tangga'
        },
        {
            name: 'Ludo',
            description: 'Permainan ludo'
        },
        {
            name: 'Snake and Ladder',
            description: 'Permainan ular tangga'
        },
        {
            name: 'Ludo',
            description: 'Permainan ludo'
        }
    ]
    return (
        <body className='bg-black'>
            <Container id='header' fluid>
                <Container className='Container pt-5 pt-md-2 pt-lg-5'>
                    <Row className="justify-content-center mt-xxl-3">
                        <Col xs={12} sm={12} md={8} className="text-center">
                            <h1>PLAY TRADISIONAL GAME</h1>
                            <p className="body" style={ { fontWeight: 'bold' } }>Exprience new traditional game play</p>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={12} md={12} className="text-center">
                            <a href="#game-list" className="btn main-button btn-warning mt-3" id='text-main-button' target="_blank"  style={
                                {
                                    whiteSpace: 'nowrap',
                                    fontWeight: 'bold'
                                }
                            }>
                                PLAY NOW  
                            </a>
                        </Col>
                    </Row>
                </Container>
            </Container>
            <br />
            <Container id='game-list' className = 'pt-5 pt-sm-1' fluid>
                <Container>
                    <Row className='justify-content-center'>
                        <Col className='text-center'>
                            <h1>GAMES</h1>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <Row className='justify-content-center mt-3'>
                        {gameList.map((item) => {
                            return(
                                <Col className='col-md-3 col-6 mb-5'>
                                    <GameCard title={item.name} description={item.description} imageFileName={'ladida'} />
                                </Col>
                            )
                        })}
                    </Row>
                
                </Container>
            </Container>
        </body>
    );
}

export default Home;