import { React } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import itemData from '../data/ItemDataFirst';

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
    fontFamily: ['궁서', '궁서체'],
<<<<<<< HEAD
    fontWeight: 'bold'
    
  }
=======
    fontWeight: 'bold',
  },
>>>>>>> lastpick
}));

export default function TitlebarImageList(props) {
  const classes = useStyles();

  const changeHandler = (e) => {
    e.preventDefault();
    props.getMyPickFromImageList(e.target.alt);
  };

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList} cols={6}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              onClick={changeHandler}
              value={item.title}
              src={item.img}
              alt={item.title}
              style={{ cursor: 'pointer' }}
            ></img>
            <ImageListItemBar
              title={item.title}
              subtitle={item.winrate}
              classes={{ title: classes.title }}
              style={{ height: '40px' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
