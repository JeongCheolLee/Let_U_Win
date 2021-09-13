import React from 'react'
import { Link } from 'react-router-dom'


function PickOrder({location, match}) {

    const lane = location.state
    const goongseo = {fontWeight:"bold", fontFamily:["궁서","궁서체"]}


    return (
      <div style = {{...goongseo, marginTop: '30px', fontSize: '50px' }} align = 'center'>
        <p>
          {lane} 포지션을 선택하셨습니다.
        </p>

          <Link to={{pathname:`${match.url}/firstpick`, state: lane}}> 
            <button style = {{marginTop: '70px',marginRight: '100px', color: 'black'}}> 선픽이신가요?</button>
          </Link>

          <Link to={`${match.url}/lastpick`}>
            <button style = {{marginTop: '70px', marginLeft: '100px', color: 'black'}}> 후픽이신가요?</button>
          </Link>
          
      </div>
    )
}

export default PickOrder
