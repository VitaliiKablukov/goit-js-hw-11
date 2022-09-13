import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
const gallery = document.querySelector('.gallery');

function renderHtml(data) {
  let pageUrl = [];
  data.data.hits.map(pirtueUrl => {
    const renderHtml = `<div class="photo-card">
  <a class="gallery__item" href="${pirtueUrl.largeImageURL}"><img  src=${pirtueUrl.webformatURL} alt="${pirtueUrl.tags}" loading="lazy" /></a>
  <div class="info">
    <p class="info-item">
      <b>Likes<br>${pirtueUrl.likes}</b>
    </p>
    <p class="info-item"> 
      <b>Views<br>${pirtueUrl.views}</b>
    </p>
    <p class="info-item">
      <b>Comments<br>${pirtueUrl.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads<br>${pirtueUrl.downloads}</b>
    </p>
  </div>
</div>`;
    pageUrl.push(renderHtml);
  });
  gallery.innerHTML = pageUrl.join('');
  const lightBoxGallery = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });
  0;
  lightBoxGallery.refresh();
}

export default { renderHtml, gallery };
