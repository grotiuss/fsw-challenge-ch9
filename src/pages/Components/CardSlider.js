import React, { Component } from 'react'
import { Row, Col,  Container } from 'react-bootstrap';
import styled from 'styled-components'
import { MdClose } from 'react-icons/md';

import firebase from '../../auth/firebase';

import './CardSlider.css'
  
const Card = (props) => (
    <div className="card" style={{height: '30vh'}}>
        <img src={ props.imgUrl } alt={ props.alt || 'Image' } />
        <div className="card-content text-center mt-1 mt-sm-3 pb-0">
            <h5>{ props.title }</h5>
            <span>{ props.content }</span>
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

    constructor(props){
        super(props)
        this.state = {
            gameURL: props.url,
            leaderBoardData: null,
            cardsData: null,
            isLoading: true
        }
    }

    componentDidMount() {
        this.GetData()
    }

    async GetData() {
       if(this.state.gameURL == '-') {
            this.setState({
                isLoading: false
            })
       } else {
            const snapshot = await firebase.database().ref('games/'+ this.state.gameURL ).once('value')
            const datas = Object.entries(snapshot.val())
            datas.sort(function(a,b){
                return(b[1].point - a[1].point)
            })
            const keys = []
            datas.forEach(data => {
                keys.push(data[0])
            })
        // ====== Find names ======
            const snapshot_1 = await firebase.database().ref('profile').once('value')
            const uids = Object.keys(snapshot_1.val())
            const profiles = Object.values(snapshot_1.val())
            const profiles_obj = []
            for(let i = 0; i<uids.length; i++) {
                profiles_obj.push({
                    token: uids[i],
                    name: profiles[i].name
                })
            }
        // ========================
            const leaderboardData = []
            keys.forEach(key => {
                profiles_obj.forEach(data => {
                    if(data.token == key)
                        leaderboardData.push(data)
                })
            })
            
            const cardsData = []
            let count = 1
            leaderboardData.forEach(data => {
                cardsData.push({
                    id: count,
                    title: count++,
                    content: data.name,
                    imgUrl: 'https://unsplash.it/200/20'+count
                })
            })
            this.setState({
                leaderBoardData: leaderboardData,
                cardsData: cardsData,
                isLoading: false
            })
       }
    }

    get Loader() {
        return(
            <h1 style={{color: 'black'}}>loading...</h1>
        )
    }

    get Content() {
        const cardsData = this.state.cardsData
        if(cardsData) {
            return(
                <div>
                    <CardContainer cards={ cardsData } />
                </div>
            )
        } else {
            return(
                <h3>No data.</h3>
            )
        }
    }
    
    render () {
        return(
            <>
                {this.state.isLoading ? this.Loader : this.Content}
            </>
        );
    }
}

export default CardSlider;