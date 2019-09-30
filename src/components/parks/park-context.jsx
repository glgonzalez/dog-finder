import React, {createContext, useContext, useState, useMemo} from 'react';

const Context = createContext();

export const ParkProvider = ({children}) => {
  const [parkUrl, setParkUrl] = useState('http://dogfinder.emboldhealth.com/parks?limit=100&offset=0');
  const [parks, setParks] = useState(null);
  const [showParks, setShowParks] = useState(true);
  const parkContext = useMemo(() => {
    return {
      parkUrl,
      setParkUrl,
      parks,
      setParks,
      showParks,
      setShowParks
    };
  }, [parkUrl, parks, showParks]);

  return <Context.Provider value={parkContext} children={children} />;
};

export const useParkContext = () => {
  return useContext(Context);
}

