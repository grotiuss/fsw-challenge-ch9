import React from 'react'
import './LandingPage.css'
import rps from '../images/rockpaperstrategy-1600.jpg'

export default function LandingPage(){
    return(
        <div>
            <div>
                <div className='judul'>
                    <div className='container mt-5'>
                        <div className='row m-3'>
                            <h1 className=" text-uppercase col" style={{ color: "white" }}>
                                PLAY TRADITIONAL GAME
                                <br/>
                                <button className='btn mt-5 position-relative'>
                                <a href="/register" className="btn-lg m-2 border-white" style={{ color: "white", backgroundColor: "#F3AF34" }}>
                                    Get Started!
                                </a>
                                <a href="/login" className="btn-lg m-2 btn-primary border-white" style={{ color: "white", }}>
                                    Log In
                                </a>
                            </button>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='jelas'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <h1>Pilihan game yang sangat banyak!</h1>
                        </div>
                        <div className='col-md-6'>
                            <img src={rps} className='image-rps' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}