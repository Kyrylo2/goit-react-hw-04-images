import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageGalleryItemLi,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled.js';

const ImageGallery = ({
  id,
  webformatURL,
  largeImageURL,
  tags,
  onImageClick,
}) => {
  return (
    <ImageGalleryItemLi key={id}>
      <ImageGalleryItemImage
        src={webformatURL}
        alt={tags}
        onClick={() => onImageClick(largeImageURL, tags)}
        loading="lazy"
      />
    </ImageGalleryItemLi>
  );
};

ImageGallery.propTypes = {
  id: PropTypes.number,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
