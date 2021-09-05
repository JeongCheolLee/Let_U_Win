import {React, useState} from 'react';

//test

function Home({history}) {
    const [lane, setLane] = useState("none");

    const changeHandler = (e) => {
        setLane(e.target.value);
    }

    const btnClickHandler = () => {
        history.push({
            pathname:"/pickorder",
            state:lane
        });
    }

    return (
        <div>
            <select name="lane" onChange={changeHandler}>
                <option value="none" selected>which?</option>
                <option value="top">top</option>
                <option value="jungle">jungle</option>
                <option value="mid">mid</option>
                <option value="bottom">bottom</option>
                <option value="supporter">supporter</option>
            </select>
            <button onClick={btnClickHandler}>OK</button>
        </div>
    )
}

export default Home
