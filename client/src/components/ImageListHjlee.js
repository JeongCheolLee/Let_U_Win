import {React, useState} from 'react';
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
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스1',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스2',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스3',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스4',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스5',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스6',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스7',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스8',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스9',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스10',
    winrate: '55%'
  },
  {
    img: '/images/champions/Aphelios.jpg',
    title: '아펠리오스11',
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
    width: 550,
    // height: 184,
  },
  title: {
    fontSize: '0.6rem',
    fontFamily: ['궁서', '궁서체'],
    fontWeight: 'bold',
  }
}));


export default function ImageListHjlee(props) {
  const classes = useStyles();
  const [pick, setPick] = useState("____");

  const imgOnClickHandler = (e) => {
      console.log(e.target.alt);
      props.getMyPickFromImageList(e.target.alt);
  }



  return (
  <div>
    <div className={classes.root}>
      <ImageList rowHeight={100} className={classes.imageList} cols={6}>
        {itemData.map((item) => (
          <ImageListItem style={{height:'90px', width:'90px'}} key={item.title}>
            <img onClick={imgOnClickHandler} src={item.img} alt={item.title} style={{cursor: "pointer", width:'90px'}}/>
            <ImageListItemBar 
              title={item.title}
              classes={{title:classes.title}}
              style={{ height: '20px', textAlign:'left'}
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  </div>
  );
}