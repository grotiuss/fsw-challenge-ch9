import React, { Component } from 'react'

import './LoadingAnimation_1.css'

class LoadingAnimation extends Component {
    render() {
        return(
            <>
                <div class="loader">
                    <div class="outer"></div>
                    <div class="middle"></div>
                    <div class="inner"></div>
                </div>

            </>
        )
    }
}

export default LoadingAnimation;