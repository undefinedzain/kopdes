import { callApi, getAPIEndpoint } from './endpoint';
import { token } from './storage';

const fetchData = async (path) => {
  try {
    const endpoint = getAPIEndpoint(path, 'GET');
    const response = await callApi(endpoint);
    return response?.data;
  } catch (err) {
    console.error(`Failed to fetch data`, err);
  }
};

const fetchDataWithAuth = async (path) => {
  try {
    const endpoint = getAPIEndpoint(path, 'GET', {
      Authorization: token(),
    });

    const response = await callApi(endpoint);
    return response?.data;
  } catch (err) {
    console.error(`Failed to fetch data`, err);
  }
};

export {
  fetchData,
  fetchDataWithAuth,
}