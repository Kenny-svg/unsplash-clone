import axios from 'axios';

// const API_URL = 'https://api.unsplash.com';
const accessKey = process.env.VUE_APP_UNSPLASH_ACCESS_KEY;

export const fetchPhotos = async (query) => {
  const response = await  axios.get('https://api.unsplash.com/photos', {
    headers: {
      query, 
      Authorization: `Client-ID ${accessKey}` 
      // 661683
    }
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error fetching data:', error); 
  });
  
  return response.data.results;

 
};
