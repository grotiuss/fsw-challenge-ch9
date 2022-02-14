import React, { useState, useEffect } from 'react'
import PlayGame from './PlayGame.css'

import firebase from '../auth/firebase';
import { AuthContext } from "../auth/Auth";

import { Row, Col } from 'reactstrap'

//icon
import Paper from '../images/icon-paper.svg'
import Rock from '../images/icon-rock.svg'
import Scissors from '../images/icon-scissors.svg'
import Refresh from '../images/refresh.png'



const Ngegame = () => {
  const [userChoice, setUserChoice] = useState(null)
  const [computerChoice, setComputerChoice] = useState(null)
  const [result, setResult] = useState(null)
  const [indexResult, setIndexResult] = useState(null)
  const [stringResult, setStringResult] = useState([])
  const [numofWinUser, setnumofWinUser] = useState(0)
  const [numofWinComp, setnumofWinComp] = useState(0)



  const userID = firebase.auth().currentUser.uid
  const dbGame = firebase.database().ref(`games/rps/${userID}`)
  const dbProfile = firebase.database().ref(`profile/${userID}`)

  const choices = [
    {
      name: 'rock',
      border: 'blue',
      icon: Rock,
    },
    {
      name: 'scissors',
      border: 'red',
      icon: Scissors,
    },
    {
      name: 'paper',
      border: 'yellow',
      icon: Paper,
    },
  ]

  const handleClick = (value) => {
    setUserChoice(value)
    generateComputerChoice()
  }

  const generateComputerChoice = () => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)].name
    setComputerChoice(randomChoice)
  }

  
  const gameToDatabase = async (points) =>{
    const snapshot = await dbGame.once('value')
    const profileSnapshot = await dbProfile.once('value')
    dbProfile.update({point: profileSnapshot.val().point + points})
    if(snapshot.val() == null){
      dbGame.update({point: points})
    }else{
      var currentDBPoint = snapshot.val().point
      dbGame.update({point: currentDBPoint + points})
    }
  }

  useEffect(() => {
    checkResult()
  }, [userChoice, computerChoice])

  const checkResult = () => {
    console.log('3. checking result')
    switch (userChoice + computerChoice) {
      case 'scissorspaper':
      case 'rockscissors':
      case 'paperrock':
        setResult('YOU WIN!')
        setnumofWinUser( + 1)
        setStringResult((old) => [...old, 'win'])
        break
      case 'paperscissors':
      case 'scissorsrock':
      case 'rockpaper':
        setResult('YOU LOSE!')
        setnumofWinComp( + 1)
        setStringResult((old) => [...old, 'lose'])

        break
      case 'rockrock':
      case 'paperpaper':
      case 'scissorsscissors':
        setResult(`IT'S A DRAW!`)
        setStringResult((old) => [...old, 'draw'])
        break
    }
    const indexOfResult = choices.findIndex((i) => i.name == computerChoice)
    setIndexResult(indexOfResult)
  }

  useEffect(() => {
    if (stringResult.length == 3) {
      console.log(stringResult)
      checkFinalResult()
    }
  }, [stringResult])

  const checkFinalResult = () => {
    const counts = {}
    stringResult.forEach(function (x) {
      console.log(x)
      counts[x] = (counts[x] || 0) + 1
    })

    if(numofWinUser == numofWinComp){
      console.log('Result: draw');
      gameToDatabase(1)
    }else if(numofWinUser > numofWinComp){
      console.log('Result: win bro');
      gameToDatabase(2)

    }else if(numofWinUser < numofWinComp){
      console.log('Result: kamu kalah ')
    }

  }

  const reset = () => {
    setComputerChoice(null)
    setUserChoice(null)
    setResult(null)
    setIndexResult(null)
    console.log('reset')
  }

  return (
    <div className="play-game">
      <div className="pt-3">
        <div className="card-info d-flex justify-content-between">
          <h3>Rock Paper Scissors</h3>
          Final Result : {stringResult} 
          <button className="btn-rules">Rules</button>
          <div className="text-center card-score d-flex justify-content-center align-items-center">
            <h5 style={{ marginRight: '10px' }}>Score</h5>
            <h3 className="font-weight-bold" style={{ fontSize: '40px' }}>
              2
            </h3>
          </div>
        </div>

        <div className="game-play">
          <Row cols="12">
            <Col cols="4">
              {choices.map((choice) => (
                <div className="mt-4" key={choice.name}>
                  <div
                    className="btn-game d-flex justify-content-center align-items-center"
                    style={{ border: `10px solid ${choice.border}` }}
                    onClick={() => {
                      handleClick(choice.name)
                    }}
                  >
                    <img src={choice.icon} alt="halo" />
                  </div>
                </div>
              ))}
            </Col>
            <Col cols="4" className="d-flex justify-content-center align-items-center">
              <div className="text-center mt-5">
                {computerChoice && (
                  <div className="bg-success py-2 px-3" style={{ borderRadius: '10px' }}>
                    <h2 style={{ color: 'white' }}>{result}</h2>
                  </div>
                )}
                <div style={{ marginTop: '50px' }} className="reset" onClick={reset}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="white" className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z" />
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
                  </svg>
                </div>
              </div>
            </Col>
            <Col cols="4" className="d-flex justify-content-end align-items-center">
              <div className="mt-4">
                <div className="btn-game d-flex justify-content-center align-items-center btn-game-computer" style={{ border: `10px solid green` }}>
                  {computerChoice ? <img src={choices[indexResult]?.icon} alt="halo" /> : <div>Loading...</div>}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}

export default Ngegame
