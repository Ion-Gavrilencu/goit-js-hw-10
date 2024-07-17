import SlimSelect from 'slim-select';

import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

const showLoader = () => {
  loader.classList.add('is-active');
};

const hideLoader = () => {
  loader.classList.remove('is-active');
};

const populateBreeds = async () => {
  try {
    showLoader();
    breedSelect.style.display = 'none';
    error.style.display = 'none';
    const breeds = await fetchBreeds();
    const options = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
    breedSelect.innerHTML = options;
    new SlimSelect({
      select: breedSelect
    });
    breedSelect.style.display = 'block';
  } catch (err) {
    error.style.display = 'block';
    Notiflix.Notify.failure('Failed to fetch breeds');
  } finally {
    hideLoader();
  }
};

breedSelect.addEventListener('change', async event => {
  const breedId = event.target.value;
  try {
    showLoader();
    catInfo.style.display = 'none';
    error.style.display = 'none';
    const cat = await fetchCatByBreed(breedId);
    const { url, breeds } = cat;
    const { name, description, temperament } = breeds[0];
    catInfo.innerHTML = `
      <img src="${url}" alt="${name}">
      <div>
        <h2>${name}</h2>
        <p>${description}</p>
        <p><strong>Temperament:</strong> ${temperament}</p>
      </div>
    `;
    catInfo.style.display = 'flex';
  } catch (err) {
    error.style.display = 'block';
    Notiflix.Notify.failure('Failed to fetch cat information');
  } finally {
    hideLoader();
  }
});

populateBreeds();



