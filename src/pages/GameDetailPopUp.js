import React, {Component} from 'react'
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components'
import { MdClose } from 'react-icons/md';

import CardSlider from './Components/CardSlider'

import './GameDetailPopUp.css'

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

function PlayButton(props) {
    const url = props.url
    if(url != '-') {
        const ref = 'play/'+ url
        return(
            <a className='btn btn-warning' href={ref}> Play!</a>
        )
    } else  {
        return(
            <a className='btn btn-secondary' href='#'> Play!</a>
        )
    }
}

function GameDetailPopUp(props) {
    return (props.trigger) ? (
        <div className="popup">
            <div className="popup-inner">
                <CloseModalButton className='close-btn' onClick={() => props.setTrigger(false)}></CloseModalButton>
                <Row>
                    <Col className='game-detail-img col-sm-5 col-md-5'></Col>
                    <Col className="popup-content col-sm-7 col-md-7 col-12">
                        <Row>
                            <Col className="col-12">
                                <h3><b>{props.data.name}</b></h3>
                                <p>{props.data.description}</p>
                                <PlayButton url={props.data.route} />
                            </Col>
                            <Col className="col-12 mt-1 mt-xs-5 text-end pe-5">
                                <h4><b>Leaderboard</b></h4>
                                <CardSlider url={props.data.route} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </div>
    ) : "";
}

export default GameDetailPopUp;