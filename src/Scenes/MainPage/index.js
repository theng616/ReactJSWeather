import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setWeatherDetails, setLoading } from '../../Redux/actions/uiActions';

export default function MainPage() {
  const aryCityName = [
    {
      value: 'Kuala Lumpur',
      label: 'Kuala Lumpur',
    },
    {
      value: 'Singapore',
      label: 'Singapore',
    }
  ];
  const [strAPIKey, setAPIKey] = useState('ff9f895b2e884d6680530135202710');
  const [strCityName, setCityName] = useState('');
  const [strAlertMessage, setAlertMessage] = useState('');
  const [blnAlertDialog, setAlertDialog] = useState(false);
  const blnLoading = useSelector((state) => state.ui.get('blnLoading'));

  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event) => {
    setCityName(event.target.value);
  };

  const handleAlertDialogON = (strAlertTemp) => {
    setAlertMessage(strAlertTemp);
    setAlertDialog(true);
  };

  const handleAlertDialogOFF = () => {
    setAlertDialog(false);
  };

  const requestWeatherAPI = () => {
    dispatch(setLoading(true))
    fetch(`http://api.weatherapi.com/v1/current.json?key=${strAPIKey}&q=${strCityName}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
    })
    .then(response => { return response.json(); })
    .then(data => {
      let strErrorMessage = "There's an error occured, please try again."
      if (data.error !== undefined && data.error !== null) {
        if (data.error.code !== undefined && data.error.code !== null) {
          if (data.error.code == 1003) {
            strErrorMessage = 'Please select City Name';
          }
        }
      }
      
      if (data.current !== undefined && data.current !== null) {
        if (data.current.temp_c !== undefined && data.current.temp_c !== null
          && data.current.temp_f !== undefined && data.current.temp_f !== null) {
          dispatch(setWeatherDetails({
            celcius: data.current.temp_c,
            fahrenheit: data.current.temp_f,
          }))
          dispatch(setLoading(false))
          history.push("/detailpage");
          return;
        }
      }

      dispatch(setLoading(false))
      handleAlertDialogON(strErrorMessage)
    })
    .catch((error) => {
      handleAlertDialogON(error.message);
    });
  }

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={styles.gridContainer}>
        <CssTextField
          id="txt_api_key"
          label="Your API Key"
          defaultValue="ff9f895b2e884d6680530135202710"
          InputProps={{
            readOnly: true,
          }} />
        <CssTextField
          id="txt_city_name"
          select
          label="Select"
          value={strCityName}
          onChange={handleChange}
          helperText="Please select City Name">
          {aryCityName.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </CssTextField>
        {
          blnLoading
          ?
          <CircularProgress
            style={styles.circularProgress} />
          :
          <Button
            onClick={() => {
              requestWeatherAPI()
            }}
            style={styles.button}
            variant="contained"
            color="primary">
            Submit
          </Button>
        }
        <Dialog
          open={blnAlertDialog}
          onClose={handleAlertDialogOFF}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description">
          <DialogTitle id="alert-dialog-title">{"Alert!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {strAlertMessage}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAlertDialogOFF} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </>
  );
}

const styles = {
  gridContainer: {
    minHeight: '100vh',
    padding: '10%',
  },
  gridView: {
    width: '80%',
    align: 'center',
  },
  button: {
    width: '100%',
    marginTop: '20px',
    textTransform: 'none',
  },
  circularProgress: {
    marginTop: '20px',
  }
}

const CssTextField = withStyles({
  root: {
    "& .MuiFormLabel-root": {
      color: '#fc3552',
      fontWeight: 'bold',
    },
    width: '100%',
    marginTop: '20px',
  },
})(TextField);
