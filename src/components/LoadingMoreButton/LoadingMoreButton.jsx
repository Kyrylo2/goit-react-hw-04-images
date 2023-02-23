import React from 'react';
import PropTypes from 'prop-types';
import LoadingButton from '@mui/lab/LoadingButton';
import DownloadingOutlinedIcon from '@mui/icons-material/DownloadingOutlined';

const LoadingMoreButton = ({ onClick, buttonState }) => {
  return (
    <LoadingButton
      loading={buttonState}
      loadingPosition="start"
      color="secondary"
      variant="contained"
      onClick={onClick}
      size="medium"
      startIcon={<DownloadingOutlinedIcon />}
      sx={{ margin: '0 auto' }}
    >
      Render more
    </LoadingButton>
  );
};

LoadingMoreButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  buttonState: PropTypes.bool.isRequired,
};

export default LoadingMoreButton;
