import React from 'react';
import PropTypes from 'prop-types';
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

Spinner.propTypes = {
  isActive: PropTypes.bool.isRequired,
};

export default Spinner;
