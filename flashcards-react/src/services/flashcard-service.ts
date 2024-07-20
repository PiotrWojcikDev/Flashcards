import axios from 'axios';
import { ApiPaths } from '../api/constants';

export const addFlashcard = async (flashcardObj: any) => {
  const response = await axios.post(`${ApiPaths.Flashcards}/addFlashcard`, flashcardObj);
  return response.data;
};

export const updateFlashcard = async (flashcardObj: any) => {
  const response = await axios.put(`${ApiPaths.Flashcards}/${flashcardObj.flashcardId}`, flashcardObj);
  return response.data;
};

export const deleteFlashcard = async (flashcardId: string) => {
  const response = await axios.delete(`${ApiPaths.Flashcards}/${flashcardId}`);
  return response.data;
};