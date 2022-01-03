import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export default function MultilineTextFields(props) {
    const myPick = props.myPick;
    const enemyPick = props.enemyPick;
    const defaultValue = `${myPick}로 ${enemyPick}을 상대할 때 꿀팁을 알려주게나!`;

    const [value, setValue] = React.useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const clickHandler = () => {
        console.log('clickHandler clicked');
        let commentData = {
            myPick: myPick,
            enemyPick: enemyPick,
            name: '익명의 소환사',
            comment: value,
        };
        axios
            .post(
                'http://localhost:3001/comments/',
                JSON.stringify(commentData),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((res) => {
                console.log(res);
                console.log('자네의 꿀팁이 성공적으로 저장되었소');
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div id="rappeer">
            <div style={{ display: 'flex' }}>
                <TextField
                    style={{
                        backgroundColor: 'white',
                        fontSize: '0.1rem',
                        color: 'yellow',
                        fontFamily: ['궁서', '궁서체'],
                    }}
                    placeholder={defaultValue}
                    label="챔피언 팁 전수"
                    multiline
                    rows={4}
                    value={value}
                    onChange={handleChange}
                />
                <Button style={{}} variant="contained" onClick={clickHandler}>
                    제출
                </Button>
            </div>
        </div>
    );
}
