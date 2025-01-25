import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGalleryCard } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function onSearchFormSubmit(event) {
  event.preventDefault();
  const searchedQuery = searchFormEl.elements.user_query.value.trim();
  if (searchedQuery === '') {
    iziToast.error({
      message: ' Please fill this field. The field should not be empty!',
      position: 'topRight',
    });
    return;
  }
  gallery.innerHTML = '';
  loader.style.display = 'block';

  fetchPhotosByQuery(searchedQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      const imageCards = data.hits.map(createGalleryCard).join('');
      gallery.innerHTML = imageCards;
      lightbox.refresh();
    })
    .catch(error => {
      iziToast.error({
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
      console.log(error);
    })
    .finally(() => {
      loader.style.display = 'none';
    });
}
searchFormEl.addEventListener('submit', onSearchFormSubmit);
