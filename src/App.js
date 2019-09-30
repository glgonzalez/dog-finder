import React from 'react';
import { Map } from './components/map';
import { ApiProvider } from './components/api';
import './App.css';
import { DogProvider } from './components/dogs/dog-context';
import { ParkProvider } from './components/parks';

function App() {
  return (
    <div className="App">
      <ApiProvider>
        <DogProvider>
          <ParkProvider>
            <Map />
          </ParkProvider>
        </DogProvider>
      </ApiProvider>
    </div>
  );
}

export default App;
