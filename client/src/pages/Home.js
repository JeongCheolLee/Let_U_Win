import {React, useState} from 'react';
import {Button, Container} from '@material-ui/core';

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
        <div align='center'>
            {/* <div>
                <select name="lane" onChange={changeHandler}>
                    <option value="none" selected>which?</option>
                    <option value="top">top</option>
                    <option value="jungle">jungle</option>
                    <option value="mid">mid</option>
                    <option value="bottom">bottom</option>
                    <option value="supporter">supporter</option>
                </select>
                <button onClick={btnClickHandler}>OK</button>
            </div> */}
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
            <Button>4</Button>
            <Button>5</Button>
        </div>
    )
}

export default Home
