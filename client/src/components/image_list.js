import {React, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import {useHistory} from "react-router";
import { Link } from 'react-router-dom';



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
  const history = useHistory();
  const [pick, setPick] = useState("____");

  const changeHandler = (e) => {
    e.preventDefault()
    setPick(e.target.alt)
  }

  return (
  <div>
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList} cols={6}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img onClick = {changeHandler} value = {item.title} src={item.img} alt={item.title} style={{cursor: "pointer"}}>
            </img>
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
      {console.log(pick)}
    </div>

    <div className = {classes.title} style = {{marginLeft: '20px', marginTop: '50px', fontSize: '25px'}} align = "center">
      {pick}, 훌륭한 선택의 표본입니다!
      
      <Link to={{pathname:"/enemypick", state: pick}}> 
            <button style = {{marginLeft: '20px'}}> 선택 완료</button>
      </Link>
    </div>


  </div>
  );
}