import React from 'react';
import StandardImageList from '../components/image_list'

function FirstPick(location) {

    console.log(location.state)

    return (
        <div>
            <h1>{location.state}선픽이시군요!</h1>

            {StandardImageList()}

        </div>
    )
}

export default FirstPick
