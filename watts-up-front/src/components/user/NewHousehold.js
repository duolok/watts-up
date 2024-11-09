import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import NewHouseholdForm from './NewHouseholdForm';

const NewHouseholdComponent = () => {
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    setCityList(['City1', 'City2', 'City3']);
  }, []);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} sm={10} md={8} lg={6}>
        <NewHouseholdForm cityList={cityList} />
      </Grid>
    </Grid>
  );
};

export default NewHouseholdComponent;
