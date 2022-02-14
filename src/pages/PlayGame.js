import React, { useState, useEffect } from 'react'
import PlayGame from './PlayGame.css'

import firebase from '../auth/firebase';

import { Row, Col } from 'reactstrap'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

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
  const [finalResult, setFinalResult] = useState(null)

  const [totalWin, setTotalWin] = useState(0)
  const [totalLose, setTotalLose] = useState(0)
  const [totalDraw, setTotalDraw] = useState(0)
  const [totalPlay, setTotalPlay] = useState(0)



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

  
  const pointToDB = async (points) =>{
    let snapshot = await dbGame.once('value')
    let profileSnapshot = await dbProfile.once('value')

    await dbProfile.update({point: profileSnapshot.val().point + points})
    if(snapshot.val() == null){
      dbGame.update({
        point: points,
      })
    }else{
      let currentDBInfo = snapshot.val().point
      dbGame.update({
        point: currentDBInfo + points,
      })
    }
  }

  const statToDB = async (name) => {
    let snapshot = await dbGame.once('value')
    
    if(snapshot.val() == null){
      console.log('updated with null')
      dbGame.update({
        win: 0,
        lose: 0,
        draw: 0
      }).then(dbGame.update({[name]: 1}))
    }else{
      var currentDBInfo = snapshot.val()
      if(name == 'win'){
        console.log('updated with win')
        dbGame.update({win: currentDBInfo.win + 1})
      }else if(name == 'lose'){
        console.log('updated with lose')
        dbGame.update({lose: currentDBInfo.lose + 1})
      }else if(name == 'draw'){
        console.log('updated with draw')
        dbGame.update({draw: currentDBInfo.draw + 1})
      }
    }
  }

  useEffect(() => {
    checkResult()
  }, [userChoice, computerChoice])

  const checkResult = () => {
    switch (userChoice + computerChoice) {
      case 'scissorspaper':
      case 'rockscissors':
      case 'paperrock':
        setResult('YOU WIN!')
        setnumofWinUser(numofWinUser + 1)
        setStringResult((old) => [...old, 'win'])
        break
      case 'paperscissors':
      case 'scissorsrock':
      case 'rockpaper':
        setResult('YOU LOSE!')
        setnumofWinComp(numofWinComp + 1)
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

  // Modal State
  const [modal, setModal] = useState(false)
  // Toggle for Modal
  const toggle = () => setModal(!modal)

  useEffect(() => {
    if (stringResult.length == 3) {
      checkFinalResult()
    }
  }, [stringResult])

  const checkFinalResult = () => {
    const counts = {}
    stringResult.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1
    })

    setTotalPlay(totalPlay + 1)

    if (numofWinUser == numofWinComp) {
      setFinalResult('Draw')
      setTotalDraw(totalDraw + 1)
      pointToDB(1)
      statToDB('draw')
    } else if (numofWinUser > numofWinComp) {
      setFinalResult('Win')
      setTotalWin(totalWin + 1)
      pointToDB(2)
      statToDB('win')
    } else if (numofWinUser < numofWinComp) {
      setFinalResult('Lose')
      setTotalLose(totalLose + 1)
      pointToDB(0)
      statToDB('lose')
    }
    setModal(true)
  }

  const reset = () => {
    setComputerChoice(null)
    setUserChoice(null)
    setResult(null)
    setIndexResult(null)
  }

  const resetRound = () => {
    setStringResult([])
    setnumofWinComp(0)
    setnumofWinUser(0)
    setFinalResult(null)
    toggle()
    reset()
  }

  return (
    <div className="play-game">
      <div className="pt-3">
        <div className="card-info d-flex justify-content-between">
          <h3>Rock Paper Scissors</h3>
          <div className="text-center card-score d-flex justify-content-center align-items-center">
            <h5 style={{ marginRight: '10px' }}>Win</h5>
            <h3 className="font-weight-bold" style={{ fontSize: '40px' }}>
              {totalWin}
            </h3>
          </div>
          <div className="text-center card-score d-flex justify-content-center align-items-center">
            <h5 style={{ marginRight: '10px' }}>Lose</h5>
            <h3 className="font-weight-bold" style={{ fontSize: '40px' }}>
              {totalLose}
            </h3>
          </div>
          <div className="text-center card-score d-flex justify-content-center align-items-center">
            <h5 style={{ marginRight: '10px' }}>Draw</h5>
            <h3 className="font-weight-bold" style={{ fontSize: '40px' }}>
              {totalDraw}
            </h3>
          </div>
          <div className="text-center card-score d-flex justify-content-center align-items-center">
            <h5 style={{ marginRight: '10px' }}>Play</h5>
            <h3 className="font-weight-bold" style={{ fontSize: '40px' }}>
              {totalPlay}
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

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Hasil Permainan</ModalHeader>
        <ModalBody>Hasil : {finalResult}</ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={resetRound}>
            Selesai
          </Button>{' '}
          <Button color="primary" onClick={resetRound}>
            Lanjut Lagi
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Ngegame
