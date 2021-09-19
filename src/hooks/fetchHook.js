import { useState } from "react";
import {createUrlParams} from '../helpers/common';

const initialResult = {
  data: [],
  meta: {},
  pagination: {}
}

const TOKEN_KEY = 'dc6zaTOxFJmzC' 

const FetchHook = () => {
  const [result, setResult] = useState(initialResult)
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const getResult = async ({ text = '', page = 0, limit = 0 }) => {
    const params = createUrlParams(
      {
        api_key: TOKEN_KEY,
        q: text,
        offset: Number(limit) * Number(page),
        limit: Number(limit)
      },
      ['q', 'api_key', 'offset', 'limit']
    );
    setLoading(true);

    
    fetch(`/v1/gifs/search?${params}`)
      .then(response => response.json())
      .then(data => {
        setResult(data);
        setLoading(false)
      })
      .catch(error => {
        console.error(error)
        setError(error);
        setLoading(false);
      })
  }
  return [{ error, result, isLoading }, getResult]
}

export default FetchHook;