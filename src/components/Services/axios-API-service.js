import axios from 'axios';

const BASE_URL = `https://pixabay.com/api/?`;

async function imageAPI(inputValue, currentPage, picturesPerPage, updateState) {
  console.log('Image API', inputValue);
  const axiosOptions = {
    params: {
      key: '30549938-651b5d539a57bc16112485a48',
      q: inputValue,
      image_type: 'photo',
      page: currentPage,
      orientation: 'horizontal',
      per_page: picturesPerPage,
      safesearch: true,
      editors_choice: true,
    },
  };

  const {
    data: { hits, totalHits },
    status,
  } = await axios.get(BASE_URL, axiosOptions);

  if (status !== 200 || totalHits === 0) {
    throw new Error(
      `Sorry, there are no pictures for the "${inputValue}". Please try again.`
    );
  } else return { hits, totalHits };
}

export default imageAPI;
