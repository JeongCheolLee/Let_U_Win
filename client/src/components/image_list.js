import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';

const itemData = [
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/aatrox.jpg?raw=true',
    title: 'aatrox',
  }, 
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/ahri.jpg?raw=true',
    title: 'ahri',
  },
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/akali.jpg?raw=true',
    title: 'akali',
  },
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/akshan.jpg?raw=true',
    title: 'akshan',
  },
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/anivia.jpg?raw=true',
    title: 'anivia',
  },
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/Aphelios.jpg?raw=true',
    title: 'aphelios',
  },

];



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  imageList: {
    width: 500,
    height: 450,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
})); 

export default function TitlebarImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList} cols={6}>
        <ImageListItem key="Subheader" cols={6} style={{ height: 'auto' }}>
          <ListSubheader component="div">Champions</ListSubheader>
        </ImageListItem>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title}/>
            <ImageListItemBar
              title={item.title} style={{ height: '20px'}}  
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

//
