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
import {useDogContext} from './dog-context';

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

export const DogsList = () => {
  const {setCoordinates, setZoom} = useApiContext()
  const { dogUrl, setDogs, showDogs, setShowDogs } = useDogContext();
  const [dog, setDog] = useState({name: ''});
  const dogs = useClient(dogUrl);
  const classes = useStyles();

  useEffect(() => {
    if(dogs) {
      setDogs(dogs);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dogs]);

  const handleChange = (event) => {
    const value = event.target.value;
    setDog(value);
    setCoordinates([value.longitude, value.latitude]);
    setZoom([11]);
  };

  return (
    <form autoComplete='on'>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='dog-simple'>Dogs</InputLabel>
        <Select 
          disabled={!showDogs}
          onChange={handleChange} 
          value={dog} 
          displayEmpty
          name="dog"
          inputProps={{
            name: 'dog',
            id: 'dog-simple',
          }}>
            {dogs ? dogs.results.map(dog => {
              return (
                <MenuItem value={dog} key={dog.name}>
                  <div>{dog.name}</div>
                </MenuItem>
              )
            }) : null}
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <FormControlLabel 
          className={classes.switch}
          label='Show Dogs'
          control={<Switch
            checked={showDogs}
            onChange={(e) => {
              const checked = e.target.checked;
              setShowDogs(checked);
              setDog({});
            }}
            color="default"/>}
        />
      </FormControl>
    </form>
  );
}