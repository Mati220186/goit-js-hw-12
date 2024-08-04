import axios from 'axios';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector(`#searchForm`);
const gallery = document.querySelector(`#gallery`);
const loadMoreImage = document.querySelector(`#loadMore`);
const loader = document.querySelector(`#loader`);
let query = ``;
let page = 1;
let perPage = 40;

form.addEventListener(`submit`, async event => {
  event.preventDefault();
  query = document.querySelector('#searchQuery').value.trim();
  page = 1;
  gallery.innerHTML = ``;
  loadMoreImage.style.display = `none`;
  await fetchImages();
});

loadMoreImage.addEventListener(`click`, async () => {
  page += 1;
  loader.style.display = `none`;
  await fetchImages();
});

async function fetchImages() {
  const apiKey = '45239691-411c9704351f7c72c1a4b78aa';
  const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

  loader.style.display = 'flex';

  try {
    const response = await axios.get(apiUrl);
    const data = response.data;
    console.log(data);

    if (data.hits.length > 0) {
      loader.style.display = 'none';
      displayImages(data.hits);
      console.log(data.hits);
      loadMoreImage.style.display = ``;

      if (page * perPage >= data.totalHits) {
        loadMoreImage.style.display = `none`;
        iziToast.info({
          title: 'Informacja',
          message: "Were sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      }
    } else {
      loadMoreImage.style.display = `none`;
      iziToast.info({
        title: 'Informacja',
        message: 'No images found. Please try a different search query.',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.info({
      title: 'Error',
      message: 'Error fetching images:',
      position: 'topRight',
      color: 'red',
    });
  }
}

function displayImages(images) {
  images.forEach(image => {
    const aElement = document.createElement('a');
    aElement.href = image.largeImageURL;
    aElement.dataset.lightbox = 'gallery';
    aElement.dataset.title = image.tags;

    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('image-info');
    infoDiv.innerHTML = `
            <div>
                <span class="label">Likes:</span>
                <span>${image.likes}</span>
            </div>
            <div>
                <span class="label">Views:</span>
                <span>${image.views}</span>
            </div>
            <div>
                <span class="label">Comments:</span>
                <span>${image.comments}</span>
            </div>
            <div>
                <span class="label">Downloads:</span>
                <span>${image.downloads}</span>
            </div>`;
    gallery.appendChild(aElement);
    aElement.appendChild(imgElement);
    aElement.appendChild(infoDiv);
  });
  smoothScroll();
  const lightbox = new SimpleLightbox('#gallery a', {});
  lightbox.refresh();
}
function smoothScroll() {
  const firstImage = document.querySelector('#gallery img');
  if (firstImage) {
    const { height: cardHeight } = firstImage.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 3,
      behavior: 'smooth',
    });
  }
}
