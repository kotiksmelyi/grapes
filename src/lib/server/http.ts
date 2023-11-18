import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://78.140.241.174:8100/',
});
