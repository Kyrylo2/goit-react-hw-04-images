import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import { ImageGalleryUl } from './ImageGallery.styled.js';

const ImageGallery = ({ pictures, onImageClick }) => {
  const imageGalleryItems = useMemo(() => {
    return pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
      return (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          largeImageURL={largeImageURL}
          tags={tags}
          onImageClick={onImageClick}
        />
      );
    });
  }, [pictures, onImageClick]);

  return <ImageGalleryUl>{imageGalleryItems}</ImageGalleryUl>;
};

ImageGallery.propTypes = {
  pictures: PropTypes.array,
  onImageClick: PropTypes.func,
};

export default ImageGallery;
