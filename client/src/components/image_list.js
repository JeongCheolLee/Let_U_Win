import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

const itemData = [
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/aatrox.jpg?raw=true',
    title: '아트록스',
    winrate: '55%'
  }, 
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/ahri.jpg?raw=true',
    title: '아리',
    winrate: '55%'
  },
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/akali.jpg?raw=true',
    title: '아칼리',
    winrate: '55%'
  },
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/akshan.jpg?raw=true',
    title: '아크샨',
    winrate: '55%'
  },
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/anivia.jpg?raw=true',
    title: '애니비아',
    winrate: '55%'
  },
  {
    img: 'https://github.com/JeongCheolLee/Let_U_Win/blob/main/client/test(temp)/Aphelios.jpg?raw=true',
    title: '아펠리오스',
    winrate: '55%'
  },

];


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  //  backgroundColor: theme.palette.background.paper,
    
  },
  imageList: {
    width: 700,
    height: 184,
  },
  title: {
    fontSize: 'smaller',
    fontFamily: '궁서',
    fontWeight: 'bold'
  }
})); 

export default function TitlebarImageList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList} cols={6}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img src={item.img} alt={item.title}/>
            <ImageListItemBar 
              title={item.title}
              subtitle={item.winrate}
              classes={{title:classes.title}}
              style={{ height: '40px'}
              }  
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}

//
