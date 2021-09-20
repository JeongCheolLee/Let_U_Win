import React from 'react'

function Detail({location}) {
    return (
        <div>
            상세페이지
            <br/>
            내픽:{location.state.myPick}
            <br/>
            상대픽:{location.state.enemyPick}
            <br/>
        </div>
    )
}

export default Detail