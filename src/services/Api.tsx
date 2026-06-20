import axios from 'axios';
import { API } from '../components';
import API2 from '../components/GetEnv2';
import type { Root2 } from '../@types';

export async function getApi() {
    const response = await axios.get(
        `${API}`
    )
    return response.data
}

export async function getOneApi() {
    const response = await axios.get(
        `${API2}`
    )
    return response.data
}
const fetchMovies = async (searchQuery:Root2) => {
  // Agar qidiruv matni bo'sh bo'lsa, hamma kinolarni yoki bo'sh massiv qaytaramiz
  const url = searchQuery 
    ? `https://api.tvmaze.com/search/shows?q=${searchQuery}`
    : `https://api.tvmaze.com/shows`;
    
  const response = await axios.get(url);
  return response.data;
};
export default fetchMovies