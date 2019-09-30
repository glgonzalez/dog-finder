import React, {createContext, useContext, useState, useMemo} from 'react';

const Context = createContext();

export const ApiProvider = ({children}) => {
  const [coordinates, setCoordinates] = useState([0,0]);
  const [zoom, setZoom] = useState([1]);
  const apiContext = useMemo(() => {
    return {
      coordinates,
      setCoordinates,
      zoom,
      setZoom
    };
  }, [coordinates, zoom]);

  return <Context.Provider value={apiContext} children={children} />;
};

export const useApiContext = () => {
  return useContext(Context);
}

