import React, { useEffect, useState, useRef } from 'react'
import {  useHistory, useLocation } from "react-router-dom"
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  TextField,
} from '@mui/material/'
import { createUrlParams, parserUrlParams } from '../helpers/common';

const DELAY_TIME = 300;
const initialFilters = {
  page: 0,
  text: '',
  limit: 0,
}
const keysList = Object.keys(initialFilters);

function NavPanel () {
  const { search } = useLocation();
  const urlParams = parserUrlParams(search.replace('?', ''))
  const [filters, setFilters] = useState({ ...initialFilters, ...urlParams });
  const history = useHistory();
  const timeoutRef = useRef();
  
  const changeFilters = (key, value) => setFilters(
    (filters) => ({...filters, [key]: value})
  )

  const handleChangelimit = ({target: { value }}) => changeFilters('limit', value)
  const handleChangeText = ({target: { value }}) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      changeFilters('text', value)
    }, DELAY_TIME);
  }

  useEffect(()=>{
    const query = createUrlParams(filters, keysList);
    history.push(`/?${query}`);
  },
  [filters]);

  const { text, limit } = filters;

  return (
    <Box marginBottom="2rem">
        <Typography variant="h3" component="h3" marginBottom="0.5rem">
          Search
        </Typography>
        <Box marginBottom="1rem" display="flex" flexWrap="wrap">
          <Box>
            <TextField
              id="outlined-basic"
              label="Search gifs"
              variant="outlined"
              defaultValue={text}
              onChange={handleChangeText}
            />
          </Box>
          <Box marginLeft="2rem">
            <FormControl component="fieldset">
              <FormLabel component="legend">limit</FormLabel>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                defaultValue={limit}
                onChange={handleChangelimit}
                >
                <FormControlLabel value="5" control={<Radio />} label="5" />
                <FormControlLabel value="10" control={<Radio />} label="10" />
                <FormControlLabel value="20" control={<Radio />} label="20" />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
  )
}

export default NavPanel;