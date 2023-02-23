import React from 'react';
import PropTypes from 'prop-types';
import { AppDiv } from '../AppContainer/App.styled';

const AppContainer = ({ children }) => {
  return <AppDiv>{children}</AppDiv>;
};

AppContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppContainer;
