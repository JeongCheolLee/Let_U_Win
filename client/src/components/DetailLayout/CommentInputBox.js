import { React, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import BackendURL from '../../shared/BackendURL';

export default function CommentInputBox(props) {
    const myPick = props.myPickEn;
    const enemyPick = props.enemyPickEn;
    const myPickKr = props.myPick;
    const enemyPickKr = props.enemyPick;
    const defaultValue = `${myPickKr}로 ${enemyPickKr}을 상대할 때 꿀팁을 알려주게나!`;

    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const clickHandler = () => {
        console.log(props.comment);
        console.log('clickHandler clicked');
        props.setComment(() => {
            console.log('setComment');
            return value;
        });
        console.log(props.comment);

        let commentData = {
            myPick: myPick,
            enemyPick: enemyPick,
            name: '익명의 소환사',
            comment: value,
        };
        axios
            .post(`${BackendURL}/comments/`, JSON.stringify(commentData), {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                console.log(res);
                console.log('자네의 꿀팁이 성공적으로 저장되었소');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div id="wrappeer">
            <div
                style={{
                    display: 'flex',
                    paddingTop: '10px',
                    width: '100%',
                    height: '7rem',
                    justifyContent: 'space-between',
                }}
            >
                <TextField
                    style={{
                        backgroundColor: 'white',
                        fontSize: '0.1rem',
                        color: 'yellow',
                        fontFamily: ['궁서', '궁서체'],
                        width: '75%',
                    }}
                    placeholder={defaultValue}
                    label="챔피언 팁 전수"
                    multiline
                    rows={3}
                    value={value}
                    onChange={handleChange}
                />
                <Button
                    sx={{ width: '15%', height: '100%' }}
                    variant="contained"
                    onClick={clickHandler}
                >
                    전수!
                </Button>
            </div>
        </div>
    );
}
