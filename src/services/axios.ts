import Axios from 'axios'
import { configure } from 'axios-hooks';
import { LRUCache } from 'lru-cache'

export const baseURL = 'https://api.themoviedb.org/3';
export const basePosterCardURL = 'https://image.tmdb.org/t/p/w220_and_h330_face';

const axios = Axios.create({
  baseURL,
  timeout: 3000,
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_MDB_TOKEN}`,
  },
})
const cache = new LRUCache({ max: 10 })

configure({ axios, cache });
