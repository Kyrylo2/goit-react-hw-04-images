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
  // const [totalPages, setTotalPages] = useState(0);
  const [loadingMoreButtonState, setLoadingMoreButtonState] = useState(false);
  const [loadingMoreButtonVisibility, setLoadingMoreButtonVisibility] =
    useState(false);
  const [showModal, setShowModal] = useState(false);
  const [fullImage, setFullImage] = useState(null);
  const [altTags, setAltTags] = useState(null);

  const picturesPerPage = useRef(12);
  // const firstRander = useRef(true);

  // useEffect (async () => {
  //   if(firstRander.current) {
  //     return
  //   }

  //   try {
  //     setSpinner(true)

  //   const data = await getPictures();

  //       const { hits, totalHits } = data;

  //       setPictures(prevState => ([...prevState, ...hits]));
  //   } catch (e) {
  //     console.log(e);
  //   }

  // }, [inputValue, currentPage])

  useEffect(() => {
    console.log('useEffect called with App');
    console.log('inputValue called with App: ', inputValue);
    const fetchData = async () => {
      try {
        setSpinner(true);
        const data = await getPictures();
        console.log(data);
        const { hits, totalHits } = data;
        setPictures(prevPictures => [...prevPictures, ...hits]);

        if (currentPage === 1) {
          toast.success(`Wow! We found ${totalHits} pictures`);
          window.scroll(0, 0);
        }

        const totalPages = Math.ceil(totalHits / picturesPerPage.current);
        console.log('totalPages', totalPages);

        console.log(
          'totalPages > 1 || currentPage < totalPages',
          totalPages > 1 || currentPage < totalPages
        );

        if (totalPages > 1 || currentPage < totalPages) {
          setLoadingMoreButtonVisibility(true);
        }

        if (currentPage >= totalPages) {
          setLoadingMoreButtonVisibility(false);
          toast.info(
            `You have looked at all the countries in your query "${inputValue}". Please start your search from the beginning`
          );
        }
      } catch (e) {
        if (loadingMoreButtonVisibility === true) {
          setLoadingMoreButtonVisibility(false);
        }
        toast.info(e.message);
      } finally {
        setSpinner(false);
      }
    };

    if (!inputValue) {
      return;
    }

    fetchData();
  }, [inputValue, currentPage]);

  const updateState = (inputValue = '') => {
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

  const getPictures = async () => {
    setSpinner(true);
    console.log(inputValue, currentPage, picturesPerPage);
    try {
      return await imageAPI(inputValue, currentPage, picturesPerPage);
    } catch (e) {
      throw new Error(e.message);
    } finally {
      setSpinner(false);
    }
  };

  const handleLoadingMoreButton = async () => {
    setLoadingMoreButtonState(true);

    setCurrentPage(prevState => prevState + 1);

    await getPictures();
    setLoadingMoreButtonState(false);
  };

  //------ modal methods --------------------------------
  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  useEffect(() => {
    console.log('Далі тугл модал буде', fullImage, altTags);
  }, [fullImage, altTags]);

  const handleImagePicked = (fullImagePath, imageTags) => {
    console.log('handleImagePicked', fullImagePath, imageTags);
    setFullImage(fullImagePath);
    setAltTags(imageTags);
    toggleModal();
  };

  // const handleImagePicked = (fullImagePath, imageTags) => {
  //   console.log('handleImagePicked', fullImagePath, imageTags);
  //   setFullImage(fullImagePath);
  //   setAltTags(imageTags);

  //   console.log(fullImage, altTags);

  //   toggleModal();
  // };

  return (
    <AppContainer>
      <Searchbar onSubmit={handleFormSubmit} />

      <ImageGallery pictures={pictures} onImageClick={handleImagePicked} />

      {spinner && <Spinner isActive={spinner} />}

      {loadingMoreButtonVisibility && (
        <LoadingMoreButton
          onClick={handleLoadingMoreButton}
          buttonState={loadingMoreButtonState}
        />
      )}

      {showModal && (
        <Modal
          activeImage={fullImage}
          activeTags={altTags}
          onClose={toggleModal}
        />
      )}
      <ToastContainer theme="dark" newestOnTop />
      <Footer />
    </AppContainer>
  );
  // }
}
