import Notiflix from 'notiflix';
const axios = require('axios');
const form = document.querySelector('#search-form');

form.addEventListener('submit', getPictures);
async function getPictures(e) {
  e.preventDefault();
  const userInput = e.currentTarget.searchQuery.value;
  let pageUrl = [];
  await axios
    .get(
      `https://pixabay.com/api/?key=29826556-a4f91074fca654992db1f732d&q=${userInput}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(function (response) {
      Notiflix.Notify.success(`Запит:${userInput} виконаний успішно`);
      response.data.hits.map(pirtueUrl => pageUrl.push(pirtueUrl.pageURL));
    })
    .catch(function (error) {
      Notiflix.Notify.failure('oops');
      console.log(error);
    });
  console.log(pageUrl);
  for (let pictures of pageUrl) {
    console.log(pictures);
    axios
      .get(
        `https://pixabay.com/api/?key=29826556-a4f91074fca654992db1f732d&q=${pictures}`
      )
      .then(function (response) {
        Notiflix.Notify.success(`Запит виконаний успішно`);
        console.log(response);
      })
      .catch(function (error) {
        Notiflix.Notify.failure('oops');
        console.log(error);
      });
  }
}
