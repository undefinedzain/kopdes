import { callApi, getAPIEndpoint } from '@/utils/endpoint';
import { fetchData, fetchDataWithAuth } from '@/utils/fetch';
import { userDetail } from '@/utils/storage';

const getCooperativeTypes = () => fetchData('/cooperative/types');
const getNIKs = (nik) => fetchData(`cooperative/by-nik/${nik}`);

const registerNewCooperative = async (body) => {
  const endpoint = getAPIEndpoint('cooperative/register', 'POST', {
    'Content-Type': 'multipart/form-data',
  });

  const formData = new FormData();
  Object.entries(body).forEach(([key, value]) => {
    if (value instanceof File || value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === 'object') {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  try {
    const response = await callApi(endpoint, formData);
    return response.data;
  } catch (error) {
    console.error('registerNewCooperative call error:', error);
    throw error;
  }
};

const getCooperativeByID = async (id) => fetchDataWithAuth(`/cooperative/by-cooperative-id/${id}`);

const checkCooperative = () => userDetail()?.roles?.find(
  (item) => item?.cooperativeId !== null
);

export {
  getCooperativeTypes,
  registerNewCooperative,
  getNIKs,
  getCooperativeByID,
  checkCooperative,
};
