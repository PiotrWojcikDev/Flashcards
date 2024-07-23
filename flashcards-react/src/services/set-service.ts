import axios from 'axios';
import { ApiPaths } from '../api/constants';

export const addSet = async (setObj: any) => {
  const response = await axios.post(`${ApiPaths.Sets}/addSet`, setObj);
  return response.data;
};

export const getSetById = async (setId: string) => {
  const response = await axios.get(`${ApiPaths.Sets}/${setId}`);
  return response.data;
};

export const getAllSetsByUserId = async (userId: string) => {
  const response = await axios.get(`${ApiPaths.Sets}/user/${userId}`);
  return response.data;
};

export const getAllFlashcardsBySetId = async (setId: string) => {
  const response = await axios.get(`${ApiPaths.Sets}/${setId}/flashcards`);
  return response.data;
};

export const updateSet = async (setObj: any) => {
  const response = await axios.put(`${ApiPaths.Sets}/${setObj.setId}`, setObj);
  return response.data;
};

export const deleteSet = async (setId: string) => {
  const response = await axios.delete(`${ApiPaths.Sets}/${setId}`);
  return response.data;
};