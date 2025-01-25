//Функція для створення розмітки
export function createGalleryCard({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `<li class="gallery-item">
            <a href="${largeImageURL}" class="gallery__item">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" />
      <div class="gallery__info">
        <p><b>Likes:</b> ${likes}</p>
        <p><b>Views:</b> ${views}</p>
        <p><b>Comments:</b> ${comments}</p>
        <p><b>Downloads:</b> ${downloads}</p>
      </div>
    </a>
        </li>`;
}
