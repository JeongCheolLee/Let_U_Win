import {React} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function BasicTextFields(props) {
    const classes = useStyles();
    const textFieldOnChange = (e) => {
        props.getSearchTextFromSearchBar(e.target.value);
    }


    return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={(e) => {e.preventDefault();}}>
        <TextField onChange={textFieldOnChange} id="standard-basic" label="참피온 이름"/>
        {/* <TextField id="filled-basic" label="Filled" variant="filled" />
        <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
    </form>
    );
}
