import React from 'react'
import { Link } from 'react-router-dom'


function PickOrder({history ,location, match}) {

    const lane = location.state

    return (
      <div>
        <h1>Let U Win</h1>
        <p>
          {lane}
        </p>


          <Link to={`${match.url}/firstpick`}> 
            <button> 선픽인가요?</button>
          </Link>

          <Link to={`${match.url}/lastpick`}>
            <button> 후픽인가요?</button>
          </Link>
          

      </div>
    )
}

export default PickOrder
