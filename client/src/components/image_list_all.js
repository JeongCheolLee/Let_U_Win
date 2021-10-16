import {React} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';

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
    height: 550,
    alignContent:'flex-start',
  },
  title: {
    fontSize: '0.6em',
    fontFamily: ['궁서', '궁서체'],
    fontWeight: 'bold',
  }
}));


export default function ImageListAll (props) {
    const classes = useStyles();
    const itemData = props.filteredChampionsList;
    const imgOnClickHandler = (e) => {
    //   console.log(e.target.alt);
        props.getPickFromImageList(e.target.alt);
    }


    return (
      <div className={classes.root}>
        <ImageList rowHeight={100} className={classes.imageList} cols={6}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img onClick = {imgOnClickHandler} value = {item.title} src={item.img} alt={item.title} style={{cursor: "pointer"}}>
              </img>
              <ImageListItemBar 
                title={item.title}
                classes={{title:classes.title}}
                style={{ height: '20px'}
                }
              />
            
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }