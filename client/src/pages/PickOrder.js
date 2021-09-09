import React from 'react'
import { Link } from 'react-router-dom'


function PickOrder({location, match}) {

    const lane = location.state

    return (
      <div>
        <h1>Let U Win</h1>
        <p>
          {lane} 포지션을 선택하셨습니다.
        </p>


          <Link to={{pathname:`${match.url}/firstpick`, state: lane}}> 
            <button> 선픽이신가요?</button>
          </Link>

          <Link to={`${match.url}/lastpick`}>
            <button> 후픽이신가요?</button>
          </Link>
          

      </div>
    )
}

export default PickOrder
