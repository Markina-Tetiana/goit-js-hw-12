import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { createGalleryCard } from './js/render-functions';
import { fetchPhotosByQuery } from './js/pixabay-api';

const searchFormEl = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loaderBottom = document.querySelector('.loader-bottom');
const loadMoreBtnEl = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

let page = 1;
let searchedQuery = '';

async function onSearchFormSubmit(event) {
  event.preventDefault();
  searchedQuery = searchFormEl.elements.user_query.value.trim();
  if (searchedQuery === '') {
    iziToast.error({
      message: ' Please fill this field. The field should not be empty!',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  loadMoreBtnEl.classList.add('is-hidden');
  gallery.innerHTML = '';
  loader.style.display = 'block';

  try {
    const data = await fetchPhotosByQuery(searchedQuery, page);
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

    if (data.hits.length === 15 && data.totalHits > 15) {
      loadMoreBtnEl.classList.remove('is-hidden');
    }

    scrollPage();
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.log(error);
  } finally {
    loader.style.display = 'none';
  }
}

function scrollPage() {
  const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

searchFormEl.addEventListener('submit', onSearchFormSubmit);
loadMoreBtnEl.addEventListener('click', onLoadMoreBtnClick);

async function onLoadMoreBtnClick() {
  try {
    page++;
    loaderBottom.style.display = 'block';
    const data = await fetchPhotosByQuery(searchedQuery, page);
    const imageCards = data.hits.map(createGalleryCard).join('');
    gallery.insertAdjacentHTML('beforeend', imageCards);

    lightbox.refresh();
    scrollPage();

    if (data.hits.length < 15 || page >= Math.ceil(data.totalHits / 15)) {
      loadMoreBtnEl.classList.add('is-hidden');
      loadMoreBtnEl.removeEventListener('click', onLoadMoreBtnClick);
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    loaderBottom.style.display = 'none';
  }
}
