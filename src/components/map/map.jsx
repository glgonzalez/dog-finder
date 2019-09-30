/* eslint-disable react/style-prop-object */
import React, { Fragment, useState } from 'react';
import ReactMapboxGl, {Layer, Feature, Popup} from "react-mapbox-gl";
import { AppBar, Toolbar, makeStyles, Button } from '@material-ui/core';
import {useApiContext} from '../api';
import { DogsList, useDogContext } from '../dogs';
import { ParkList, useParkContext} from '../parks';


const token = 'pk.eyJ1IjoiZ2xnb256YWxleiIsImEiOiJjazB5eGk5bmIwa2RjM2NwMXJ1aTljYWZ3In0.Mx70Q07SPVcv6wm4V2v0uQ';

const Mapbox = ReactMapboxGl({
  accessToken: token
});

const useStyles = makeStyles(theme => ({
  map: {
    width: '100%',
    height: '100%'
  }
}));


export const Map = () => {
  const {coordinates, zoom, setCoordinates, setZoom} = useApiContext();
  const {dogs, showDogs} = useDogContext();
  const {parks, showParks} = useParkContext();
  const [popup, setPopup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const classes = useStyles();

  const resetMap = () => {
    setCoordinates([0,0]);
    setZoom([1]);
  }

  return (
    <Fragment>
      <AppBar position='relative' color='default'>
        <Toolbar>
          <DogsList />
          <ParkList />
          <Button onClick={resetMap} variant='outlined'>Reset Map</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.map}>
        <Mapbox 
          style='mapbox://styles/mapbox/streets-v8'
          containerStyle={{width: '100%', height: '100%'}}
          renderChildrenInPortal={true}
          center={coordinates}
          zoom={zoom}>
            {showPopup && popup ? <Popup
              coordinates={[popup.longitude, popup.latitude]}>
              {popup.name}
            </Popup> : null}
            {showDogs ? <Layer
              type="symbol"
              layout={{ "icon-image": "dog-park-11" }}>
                {dogs ? 
                  dogs.results.map(dog => (
                    <Feature 
                      coordinates={[dog.longitude, dog.latitude]} 
                      key={dog.name} 
                      onClick={() => {
                        if(showPopup && popup && popup.name === dog.name) {
                          setShowPopup(false);
                        } else {
                          setShowPopup(true);
                          setPopup(dog);
                        }
                      }}/>
                  ))   
                : null}
            </Layer> : null}

            {showParks ? <Layer
              type="symbol"
              layout={{ "icon-image": "park-11" }}>
                {parks ? 
                  parks.results.map(park => (
                    <Feature 
                      coordinates={[park.longitude, park.latitude]} 
                      key={park.name} 
                      onClick={() => {
                        if(showPopup && popup && popup.name === park.name) {
                          setShowPopup(false);
                        } else {
                          setShowPopup(true);
                          setPopup(park);
                        }
                      }}/>
                  ))
                : null}
            </Layer> : null}
        </Mapbox>
      </div>
    </Fragment>
  );
};