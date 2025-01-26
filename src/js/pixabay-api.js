//Запит на сервер та обробка відповіді
import axios from 'axios';

export const fetchPhotosByQuery = async (searchedQuery, currentPage) => {
  const axiosOptions = {
    params: {
      key: '48307902-b3b0ba5bf2bf175d4af253477',
      q: searchedQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 15,
    },
  };

  try {
    const response = await axios.get(`https://pixabay.com/api/`, axiosOptions);
    return response.data;
  } catch (error) {
    throw new Error(error.response.status);
  }
};
