import { React, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

const useStyles = makeStyles((theme) => ({
    imageList: {
        width: 560,
        height: 550,
        alignContent: 'flex-start',
    },
    title: {
        fontSize: '0.6em',
        fontFamily: ['궁서', '궁서체'],
        fontWeight: 'bold',
    },
    titleWrap: {
        margin: '8px',
    },
}));

export default function ImageListHjlee(props) {
    const classes = useStyles();

    const itemData = props.filteredChampionsList;
    const imgOnClickHandler = (e) => {
        props.getPickFromImageList(e.target.alt);
    };

    return (
        <div>
            <ImageList rowHeight="auto" className={classes.imageList} cols={6}>
                {itemData.map((item) => (
                    <ImageListItem
                        style={{ height: '90px', width: '90px' }}
                        key={item.id}
                    >
                        <img
                            onClick={imgOnClickHandler}
                            src={
                                'http://ddragon.leagueoflegends.com/cdn/11.19.1/img/champion/' +
                                item.image.full
                            }
                            alt={item.name}
                            style={{ cursor: 'pointer', width: '90px' }}
                        />
                        <ImageListItemBar
                            title={item.name}
                            classes={{
                                title: classes.title,
                                titleWrap: classes.titleWrap,
                            }}
                            style={{ height: '30px', textAlign: 'left' }}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}
