import React, { Component, useState } from 'react';
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

import GameDetailPopUp from './GameDetailPopUp'

class GameCard extends Component {
    render() {
        const { item, setTrigger} = this.props
        const gameImage = require('./rock-paper-scissor.jpg')
        return (
            <>
                <button className='text-center p-0' onClick={() => {
                    setTrigger(item, true)
                }}>
                    <Image style={
                        {
                            resize:'cover',
                            width: '100%'
                        }
                    } src={gameImage} />
                </button>
                <span className='game-list-name'>{item.name}</span>
                <br></br>
                <span style={ { color: 'white', fontSize:'100%' } }>{item.description}</span>
            </>
        )
    }
}

function Home() {
    let styleObj = { fontSize: '80px' }
    const [buttonPopUp, setButtonPopUp] = useState(false);
    const [gameShowed, setGameShowed] = useState('')

    const setTrigger = (item, popup = true) => {
        setButtonPopUp(popup)
        setGameShowed(item)
        console.log(item)
    }

    const gameList = [
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
                            <a href="#game-list" className="btn main-button btn-warning mt-3" id='text-main-button'  style={
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
                                    <GameCard  item={item} setTrigger={setTrigger}/>
                                </Col>
                            )
                        })}
                    </Row>
                
                </Container>
                <GameDetailPopUp trigger={buttonPopUp} setTrigger={setButtonPopUp} >
                    <h3>{gameShowed.name}</h3>
                    <p>{gameShowed.description}</p>
                </GameDetailPopUp>
            </Container>
        </body>
    );
}

export default Home;