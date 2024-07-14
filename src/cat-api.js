import axios from 'axios';

axios.defaults.headers.common['x-api-key'] = 'live_gxgjQnhWOmuLM1HnX3cVq3dgGL4uUxL46KCr7FdEC3Wao89CeaXS3EMyZMKUo7zD';  // Înlocuiți "cheia ta" cu cheia API primită

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/images/search', {
      params: { breed_ids: breedId }
    });
    return response.data[0];
  } catch (error) {
    throw new Error('Failed to fetch cat information');
  }
}
