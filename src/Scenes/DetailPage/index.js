import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

export default function DetailPage() {
  const objWeatherDetails = useSelector((state) => state.ui.get('objWeatherDetails'));
  const history = useHistory();

  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        direction="column"
        style={styles.gridContainer}>
        <CssTextField
          id="txt_celcius"
          label="Celcius"
          defaultValue={JSON.stringify(objWeatherDetails.celcius)}
          InputProps={{
            readOnly: true,
          }} />
        <CssTextField
          id="txt_fanrenheit"
          label="Fahrenheit"
          defaultValue={JSON.stringify(objWeatherDetails.fahrenheit)}
          InputProps={{
            readOnly: true,
          }} />
        <Button
          onClick={() => {
            history.goBack()
          }}
          style={styles.button}
          variant="contained"
          color="primary">
          Back
        </Button>
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
  },
  button: {
    width: '100%',
    marginTop: '20px',
    textTransform: 'none',
  },
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
