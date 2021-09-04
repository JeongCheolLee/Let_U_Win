import React from 'react'

function Home() {
    return (
        <div>
            <select name="lane">
                <option value="none">which?</option>
                <option value="top">top</option>
                <option value="jungle">jungle</option>
                <option value="mid">mid</option>
                <option value="bottom">bottom</option>
                <option value="supporter">supporter</option>

            </select>
        </div>
    )
}

export default Home
