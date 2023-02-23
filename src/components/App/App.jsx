import { useState, useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from '../SearchBar';
import ImageGallery from '../ImageGallery';
import AppContainer from '../AppContainer';
import LoadingMoreButton from '../LoadingMoreButton';
import imageAPI from '../Services';
import Spinner from '../Spinner';
import Modal from '../Modal';
import Footer from '../Footer';

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [pictures, setPictures] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [spinner, setSpinner] = useState(false);
  const [loadingMoreButtonState, setLoadingMoreButtonState] = useState(false);
  const [loadingMoreButtonVisibility, setLoadingMoreButtonVisibility] =
    useState(false);

  const [fullImage, setFullImage] = useState('');
  const [altTags, setAltTags] = useState('');

  const picturesPerPage = useRef(12);

  useEffect(() => {
    if (!inputValue) {
      return;
    }

    setSpinner(true);

    imageAPI(inputValue, currentPage, picturesPerPage)
      .then(({ hits, totalHits }) => {
        setLoadingMoreButtonVisibility(true);
        setPictures(images => (images = [...images, ...hits]));

        if (currentPage === 1) {
          toast.success(`Wow! We found ${totalHits} pictures`);
          window.scroll(0, 0);
        }

        const countPages = Math.ceil(totalHits / picturesPerPage.current);

        if (currentPage >= countPages) {
          setLoadingMoreButtonVisibility(false);
          toast.info(
            `You have looked at all the countries in your query "${inputValue}". Please start your search from the beginning`
          );
        }
      })
      .catch(() =>
        toast.error(
          `Sorry, there are no images "${inputValue}". Please try again.`
        )
      )
      .finally(() => {
        setSpinner(false);
      });
  }, [inputValue, currentPage]);

  const updateState = inputValue => {
    setInputValue(inputValue);
    setPictures([]);
    setCurrentPage(1);
    setLoadingMoreButtonState(false);
    setLoadingMoreButtonVisibility(false);
  };

  const handleFormSubmit = inputData => {
    if (inputData !== inputValue && inputData.trim() !== '') {
      updateState(inputData);
    } else {
      return toast.warn('New input must be different from existing!');
    }
  };

  const handleLoadingMoreButton = () => {
    setLoadingMoreButtonState(true);

    setCurrentPage(prevState => prevState + 1);

    setLoadingMoreButtonState(false);
  };

  const onSelectedImage = (fullImagePath, imageTags) => {
    setFullImage(fullImagePath);
    setAltTags(imageTags);
  };

  const onCloseByEscape = () => setFullImage('');

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />

      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} onImageClick={onSelectedImage} />
      )}

      {spinner && <Spinner isActive={spinner} />}

      {loadingMoreButtonVisibility && (
        <LoadingMoreButton
          onClick={handleLoadingMoreButton}
          buttonState={loadingMoreButtonState}
        />
      )}

      {fullImage && (
        <Modal
          activeImage={fullImage}
          activeTags={altTags}
          onClose={onCloseByEscape}
        />
      )}
      <ToastContainer theme="dark" newestOnTop />
      <Footer />
    </AppContainer>
  );
}
