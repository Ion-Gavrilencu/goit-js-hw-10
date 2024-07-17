


import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_gxgjQnhWOmuLM1HnX3cVq3dgGL4uUxL46KCr7FdEC3Wao89CeaXS3EMyZMKUo7zD';

const API_URL = 'https://api.thecatapi.com/v1';

export const fetchBreeds = async () => {
  const response = await axios.get(`${API_URL}/breeds`);
  return response.data;
};

export const fetchCatByBreed = async (breedId) => {
  const response = await axios.get(`${API_URL}/images/search?breed_ids=${breedId}`);
  return response.data[0];
};

