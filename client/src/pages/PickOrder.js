import React from 'react'

import { Link } from 'react-router-dom'


function PickOrder({location, match}) {
    return (
      <div>
        <h1>Let U Win</h1>
        <p>
          {location.state}
        </p>

        <body>
          <Link to={`${match.url}/firstpick`}> 
            <button> 선픽인가요?</button>
          </Link>

          <Link to={`${match.url}/lastpick`}>
            <button> 후픽인가요?</button>
          </Link>
          
        </body>
      </div>
    )
}

export default PickOrder
