import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Redirect } from 'react-router-dom';
import { Row, Col, Card, Image } from 'react-bootstrap';
import firebase from '../auth/firebase';
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
        // console.log(item.imageFileName)
        // console.log(gameImage) //for location purposes and then put to database
        return (
            <>
                <button className='text-center p-0' onClick={() => 
                    setTrigger(true, item)
                }>
                    <Image style={
                        {
                            resize:'cover',
                            width: '100%',
                        }
                    } src={item.imageFileName} />
                </button>
                <span className='game-list-name'>{item.name}</span>
                <br></br>
                <span style={ { color: 'white', fontSize:'100%' } }>{item.description}</span>
            </>
        )
    }
}

class Home extends Component {
    constructor() {
        super()
        this.state = {
            buttonPopUp : false,
            gameShowed : {},
            gameList : null,
            isLoading : true
        }
    }

    componentDidMount() {
        this.GetData()
    }

    async GetData() {
        try{
            const snapshot = await firebase.database().ref('game-list').once('value')
            this.setState({
                isLoading: false,
                gameList: Object.values(snapshot.val())
            })

            console.log(this.state.gameList)
        } catch (error) {
            console.log(error)
        }
    }

    get Content () {
        const gameDetailTrigger = (isPopUp, item=null) => {
            this.setState({
                buttonPopUp: isPopUp
            })
            if(isPopUp) {
                this.setState({
                    gameShowed: {
                        name: item.name,
                        description: item.description,
                        route: item.route
                    }
                })
            } else {
                this.setState({
                    gameShowed:{}
                })
            }
        }
        const gameList = this.state.gameList
        
        return (
            <div className='bg-black'>
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
                            {gameList.map((item, index) => {
                                const triggerr = this.setTrigger
                                return(
                                    <Col className='col-md-3 col-6 mb-5' key={index}>
                                        <GameCard item={item} setTrigger={gameDetailTrigger}/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Container>
                    <GameDetailPopUp trigger={this.state.buttonPopUp} setTrigger={gameDetailTrigger}>
                        <h3>{this.state.gameShowed.name}</h3>
                        <p>{this.state.gameShowed.description}</p>
                        <a className='btn btn-success' href={this.state.gameShowed.route}>Play!</a>
                    </GameDetailPopUp>
                </Container>
            </div>
        )
    }

    get Loader () {
        return(
            <h1>Loading...</h1>
        )
    }

    render() {
        return(
            <>
                {this.state.isLoading ? this.Loader : this.Content}
            </>
        )
    }
}

export default Home;