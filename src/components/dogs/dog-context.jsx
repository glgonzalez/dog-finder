import React, {createContext, useContext, useState, useMemo} from 'react';

const Context = createContext();

export const DogProvider = ({children}) => {
  const [dogUrl, setDogUrl] = useState('http://dogfinder.emboldhealth.com/dogs?limit=100&offset=0');
  const [dogs, setDogs] = useState(null);
  const [showDogs, setShowDogs] = useState(true);
  const dogContext = useMemo(() => {
    return {
      dogUrl,
      setDogUrl,
      dogs,
      setDogs,
      showDogs,
      setShowDogs
    };
  }, [dogUrl, dogs, showDogs]);

  return <Context.Provider value={dogContext} children={children} />;
};

export const useDogContext = () => {
  return useContext(Context);
}

