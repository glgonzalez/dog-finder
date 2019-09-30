import { useState, useEffect } from 'react';

export const useClient = (url) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const getData = async () => {
    try {
      const response = await fetch(url);
      setResult(await response.json());
    } catch (e) {
      throw new Error(e);
    }
  }

  return result;
};