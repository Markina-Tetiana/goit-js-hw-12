//Запит на сервер та обробка відповіді
export const fetchPhotosByQuery = searchedQuery => {
  const searchParams = new URLSearchParams({
    key: '48307902-b3b0ba5bf2bf175d4af253477',
    q: searchedQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};
