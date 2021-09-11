import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';


const itemData = [
  {
    img: '/images/champions/aatrox.jpg',
    title: '아트록스',
    winrate: '55%'
  }, 
  {
    img: '/images/champions/ahri.jpg',
    title: '아리',
    winrate: '55%'
  },
  {
    img: '/images/champions/akali.jpg',
    title: '아칼리',
    winrate: '55%'
  },
  {
    img: '/images/champions/akshan.jpg',
    title: '아크샨',
    winrate: '55%'
  },
  {
    img: '/images/champions/anivia.jpg',
    title: '애니비아',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
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
  

  const defaultMessage = (
    <div >
      <br />
      <br />
      <br />
      기본메시지입니다.
    </div>
  )

  const choice = (arg) =>{

    return(
      <div style={{fontFamily: '궁서', fontWeight: 'bold', fontSize: '25px'}}>
        역시, {arg}는 탁월한 선택입니다.
      </div>
    );
  }


  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList} cols={6}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img onClick = { () => choice(item.title)} src={item.img} alt={item.title} style={{cursor: "pointer"}}/>
            <ImageListItemBar 
              title={item.title}
              subtitle={item.winrate}
              classes={{title:classes.title}}
              style={{ height: '40px'}
              }
            />
          
            {/* <ImageListItemBar
              title={'시발'}
              classes={{title:classes.bar}}
              style={{height:'40px', display:'block'}}
            /> */}

          </ImageListItem>
        ))}
      </ImageList>
      {defaultMessage}
    </div>

  );
}

//
