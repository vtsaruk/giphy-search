import React, { useEffect} from 'react';
import { useLocation } from "react-router-dom";
import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
} from '@mui/material/';
import { Pagination } from './';
import FetchHook from '../hooks/fetchHook';
import { parserUrlParams } from '../helpers/common';

function GifsList(){
  const { search } = useLocation();
  const [{ error, result, isLoading }, getResult] = FetchHook();
  const urlParams = parserUrlParams(search.replace('?', ''));
  
  useEffect (()=>{ 
    getResult(urlParams);
  },[search])

  const count = result.pagination ? result.pagination.count : 0;

  return (
      <Box 
        minHeight="400px"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isLoading ? <CircularProgress /> :
          <Box>
            <ImageList>
              {result.data.map(_ => (
              <ImageListItem key={_.id}>
                <img src={_.images['480w_still'].url}  alt=""/>
              </ImageListItem>
              ))}
            </ImageList>
            {count > 0 && <Pagination count={count}/>}
          </Box>
        }
      </Box>
  )
}

export default GifsList;