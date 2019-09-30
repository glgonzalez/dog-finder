import React from 'react';
import { Map } from './components/map';
import { ApiProvider } from './components/api';
import './App.css';
import { DogProvider } from './components/dogs/dog-context';
import { ParkProvider } from './components/parks';
import { ErrorBoundary } from './components/error';

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <ApiProvider>
          <DogProvider>
            <ParkProvider>
              <Map />
            </ParkProvider>
          </DogProvider>
        </ApiProvider>
      </ErrorBoundary>
    </div>
  );
}

export default App;
