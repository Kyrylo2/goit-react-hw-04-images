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
        onClick={() => {
          console.log('Clicking image item');
          return onImageClick(largeImageURL, tags);
        }}
        loading="lazy"
      />
    </ImageGalleryItemLi>
  );
};

export default ImageGallery;
