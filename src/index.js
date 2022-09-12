import Notiflix from 'notiflix';
import renderHtmlItems from './js/renderHTML';
//
const axios = require('axios');
const form = document.querySelector('#search-form');
const { renderHtml, gallery } = renderHtmlItems;
const morePicturesBtn = document.querySelector('.load-more');

//
form.addEventListener('submit', getPictures);
//
morePicturesBtn.addEventListener('click', anyPictures);
//
let userInput;
let page = 1;
let perPage = 40;
//

//

async function getPictures(e) {
  try {
    e.preventDefault();
    gallery.innerHTML = '';
    morePicturesBtn.classList.add(`is-hidden`);
    userInput = e.currentTarget.searchQuery.value;
    if (userInput) {
      const response = await axios.get(
        `https://pixabay.com/api/?key=29826556-a4f91074fca654992db1f732d&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
      );
      if (response.data.totalHits === 0) {
        Notiflix.Notify.failure(
          `"Sorry, there are no images matching your search query. Please try again."`
        );
      } else {
        Notiflix.Notify.success(
          `Hooray! We found ${response.data.totalHits} images.`
        );

        renderHtml(response);
        if (perPage * page < response.data.totalHits) {
          morePicturesBtn.classList.remove(`is-hidden`);
        }
      }
    } else {
      Notiflix.Notify.failure(`Please input name picture`);
    }
  } catch (error) {
    Notiflix.Notify.failure('oops');
    console.log(error);
  }
}
//
async function anyPictures() {
  try {
    page += 1;
    morePicturesBtn.classList.add(`is-hidden`);
    const response = await axios.get(
      `https://pixabay.com/api/?key=29826556-a4f91074fca654992db1f732d&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
    );
    if (perPage * page > response.data.totalHits) {
      Notiflix.Notify.success(
        "We're sorry, but you've reached the end of search results."
      );
    } else {
      renderHtml(response);
      morePicturesBtn.classList.remove(`is-hidden`);
      scroll();
    }
  } catch (error) {
    Notiflix.Notify.failure('oops');
    console.log(error);
  }
}
function scroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 6,
    behavior: 'smooth',
  });
}
