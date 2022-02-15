import React, { Component } from 'react'
import { Row, Col,  Container } from 'react-bootstrap';
import styled from 'styled-components'
import { MdClose } from 'react-icons/md';

import './CardSlider.css'
  
const Card = (props) => (
    <div className="card">
      <img src={ props.imgUrl } 
        alt={ props.alt || 'Image' } />
      <div className="card-content text-center mt-1 mt-sm-3">
        <h5>{ props.title }</h5>
        <p>{ props.content }</p>
      </div>
    </div>
  );
  
  const CardContainer = (props) => (
    <div className="cards-container">
      {
        props.cards.map((card) => (
          <Card title={ card.title }
            content={ card.content }
            imgUrl={ card.imgUrl } />
        ))
      }
    </div>
  );
  
  class CardSlider extends Component {
    render () {
      const cardsData = [
        {id: 1, title: 'CARD 1', content: 'Clark Kent', imgUrl: 'https://unsplash.it/200/200'},
        {id: 2, title: 'CARD 2', content: 'Bruce Wayne', imgUrl: 'https://unsplash.it/201/200'},
        {id: 3, title: 'CARD 3', content: 'Peter Parker', imgUrl: 'https://unsplash.it/200/201'},
        {id: 4, title: 'CARD 4', content: 'Tony Stark', imgUrl: 'https://unsplash.it/201/201'},
        {id: 5, title: 'CARD 5', content: 'Reed Richards', imgUrl: 'https://unsplash.it/202/200'}
      ]
      
      return(
        <div>
          <CardContainer cards={ cardsData } />
        </div>
      );
    }
  }

export default CardSlider;