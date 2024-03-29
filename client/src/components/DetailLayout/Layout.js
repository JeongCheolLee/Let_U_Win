import { React, useState } from 'react';
import styled from 'styled-components';
import RuneContainer from '../RuneContainer';
import { VersusContainer, DetailTable, CommentInputBox, CommentTable } from '.';
import StickyBox from 'react-sticky-box';
import IconButton from '@mui/material/IconButton';
// import { styled } from '@mui/material';

function Layout(props) {
    const [comment, setComment] = useState('');

    const homeBtnClick = () => {
        props.history.push({
            pathname: '/',
        });
    };

    const GridContainer = styled.div`
        display: grid;
        grid-template-columns: 1fr 3fr 1fr;
        grid-template-rows: 3fr 4fr 4fr;
        width: 99vw;
        height: 150vh;
        // background-color: black;
        padding: 10px;
        row-gap: 30px;
    `;

    const GridItem = styled.div`
        // background-color: white;
        // border: 2px solid pink;
        margin: 1px;
    `;

    const SideBar = styled(GridItem)`
        text-align: center;
        grid-row: span 3;
    `;

    const CommentSideBar = styled(SideBar)`
        position: sticky;
        top: 0;
        margin-left: 2rem;
        margin-top: 3rem;
    `;

    const LeftSideBar = styled(GridItem)`
        grid-row: span 3;
    `;

    return (
        <GridContainer>
            <LeftSideBar>
                <IconButton onClick={homeBtnClick}>Let U Win</IconButton>
            </LeftSideBar>
            <GridItem>
                <VersusContainer
                    myPick={props.myPick}
                    enemyPick={props.enemyPick}
                    lane={props.lane}
                ></VersusContainer>
            </GridItem>
            <CommentSideBar>
                <StickyBox offsetTop={20} offsetBottom={20}>
                    <CommentTable
                        myPick={props.myPickEn}
                        enemyPick={props.enemyPickEn}
                    ></CommentTable>
                    <CommentInputBox
                        myPick={props.myPick}
                        enemyPick={props.enemyPick}
                        myPickEn={props.myPickEn}
                        enemyPickEn={props.enemyPickEn}
                        setComment={setComment}
                        comment={comment}
                    ></CommentInputBox>
                </StickyBox>
            </CommentSideBar>
            <GridItem>
                <DetailTable
                    myPick={props.myPick}
                    enemyPick={props.enemyPick}
                    myPickEn={props.myPickEn}
                    enemyPickEn={props.enemyPickEn}
                    lane={props.lane}
                    pageGoBack={props.pageGoBack}
                ></DetailTable>
            </GridItem>
            <GridItem>
                <h1 style={{ fontWeight: 'bold' }}>추천 룬</h1>
                <RuneContainer
                    lane={props.lane}
                    myPick={props.myPick}
                    enemyPick={props.enemyPick}
                    myPickEn={props.myPickEn}
                    enemyPickEn={props.enemyPickEn}
                    // style={props.perkStyles}
                    // activation={props.perkActivation}
                    // stat={props.perkStat}
                    pageGoBack={props.pageGoBack}
                ></RuneContainer>
            </GridItem>
        </GridContainer>
    );
}

export default Layout;
