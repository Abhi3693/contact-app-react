import { useState } from 'react';

function useFetch() {
  const [isLoading, setIsLoading] = useState(true);
  const headers = { 'Content-Type': 'application/json' };

  function makeApiCall(url, method = 'GET', body = null) {
    return fetch(url, {
      method: method,
      headers: headers,
      body: body,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(({ error }) => {
          return Promise.reject(error);
        });
      })
      .then((data) => {
        setIsLoading(false);
        return data;
      })
      .catch((error) => {
        setIsLoading(false);
        return { error };
      });
  }

  return {
    makeApiCall,
    isLoading,
  };
}

export default useFetch;
