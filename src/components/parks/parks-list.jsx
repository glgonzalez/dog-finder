import React, {useEffect, useState} from 'react';
import {
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch
} from '@material-ui/core';
import {useClient, useApiContext} from '../api';
import { useParkContext } from './park-context';

const useStyles = makeStyles(theme => {
  return {
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    switch: {
      height: '48px'
    }
  };
});

export const ParkList = () => {
  const {setCoordinates, setZoom} = useApiContext()
  const { parkUrl, setParks, showParks, setShowParks } = useParkContext();
  const [park, setPark] = useState({});
  const parks = useClient(parkUrl);
  const classes = useStyles();

  useEffect(() => {
    if(parks) {
      setParks(parks);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parks]);

  const handleChange = (event) => {
    const value = event.target.value;
    setPark(value);
    setCoordinates([value.longitude, value.latitude]);
    setZoom([11]);
  };

  return (
    <form autoComplete='on'>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='park-simple'>Parks</InputLabel>
        <Select 
          disabled={!showParks}
          onChange={handleChange} 
          value={park} 
          displayEmpty
          name="park"
          inputProps={{
            name: 'park',
            id: 'park-simple',
          }}>
            {parks ? parks.results.map(park => {
              return (
                <MenuItem value={park} key={park.name}>
                  <div>{park.name}</div>
                </MenuItem>
              )
            }) : null}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <FormControlLabel 
          className={classes.switch}
          label='Show Parks'
          checked={showParks}
          control={<Switch
            onChange={(e) => {
              const checked = e.target.checked;
              setShowParks(checked);
              setPark({});
            }}
            color="default"/>}
        />
      </FormControl>
    </form>
  );
}