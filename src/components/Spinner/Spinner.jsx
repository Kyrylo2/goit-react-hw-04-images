import React from 'react';
import PropagateLoader from 'react-spinners/PropagateLoader';

const override = {
  display: 'block',
  margin: '50px auto 0px auto',
  height: '100vh',
  borderColor: 'red',
};

const Spinner = ({ isActive }) => {
  return (
    <PropagateLoader
      cssOverride={override}
      color="#9c27b0"
      loading={isActive}
    />
  );
};

export default Spinner;
