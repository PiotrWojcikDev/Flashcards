import axios from 'axios';
import { ApiPaths } from '../api/constants';

export const loginService = async (loginObj: any) => {
  const response = await axios.post(`${ApiPaths.Auth}/login`, loginObj);
  return response.data;
};

export const registerService = async (registerObj: any) => {
  const response = await axios.post(`${ApiPaths.Auth}/register`, registerObj);
  return response.data;
};


export const login = (userId: string) => {
    localStorage.setItem('userId', userId);
}

export const logout = () => {
    localStorage.removeItem('userId');
}

export const getLoggedInUserId = () => {
    return localStorage.getItem('userId');
}
