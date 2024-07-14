import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('.breed-select');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');
  const catInfo = document.querySelector('.cat-info');

  async function loadBreeds() {
    try {
      loader.style.display = 'block';
      breedSelect.style.display = 'none';
      error.style.display = 'none';

      const breeds = await fetchBreeds();
      breedSelect.innerHTML = breeds.map(breed => `<option value="${breed.id}">${breed.name}</option>`).join('');
      breedSelect.style.display = 'block';
    } catch (err) {
      error.style.display = 'block';
    } finally {
      loader.style.display = 'none';
    }
  }

  breedSelect.addEventListener('change', async () => {
    const breedId = breedSelect.value;

    if (!breedId) return;

    try {
      loader.style.display = 'block';
      catInfo.style.display = 'none';
      error.style.display = 'none';

      const catData = await fetchCatByBreed(breedId);
      const breed = catData.breeds[0];

      catInfo.innerHTML = `
        <img src="${catData.url}" alt="${breed.name}">
        <h2>${breed.name}</h2>
        <p>${breed.description}</p>
        <p><strong>Temperament:</strong> ${breed.temperament}</p>
      `;
      catInfo.style.display = 'block';
    } catch (err) {
      error.style.display = 'block';
    } finally {
      loader.style.display = 'none';
    }
  });

  loadBreeds();
});
