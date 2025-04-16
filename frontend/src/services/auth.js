import { callApi, getAPIEndpoint } from '@/utils/endpoint';
import { token } from '@/utils/storage';

const login = async (body) => {
  const endpoint = getAPIEndpoint('/login', 'POST');

  try {
    const response = await callApi(endpoint, body);
    return response;
  } catch (error) {
    console.error('login is error:', error);
    throw error;
  }
};

const sendResetPasswordLink = async (body) => {
  const endpoint = getAPIEndpoint('/forgot-password', 'POST');

  try {
    const response = await callApi(endpoint, body);
    return response;
  } catch (error) {
    console.error('sendResetPasswordLink is error:', error);
    throw error;
  }
};

const resetPassword = async (body) => {
  const endpoint = getAPIEndpoint('/reset-password', 'POST');

  try {
    const response = await callApi(endpoint, body);
    return response;
  } catch (error) {
    console.error('resetPassword is error:', error);
    throw error;
  }
};

const updateUserProfile = async (body) => {
  const endpoint = getAPIEndpoint('/profile', 'PUT', {
    Authorization: token(),
  });

  try {
    const response = await callApi(endpoint, body);
    return response;
  } catch (error) {
    console.error('updateUserProfile is error:', error);
    throw error;
  }
};

const getUserProfile = async (body) => {
  const endpoint = getAPIEndpoint('/profile', 'GET', {
    Authorization: token(),
  });

  try {
    const response = await callApi(endpoint, body);
    return response;
  } catch (error) {
    console.error('getUserProfile is error:', error);
    throw error;
  }
};

export {
  login,
  sendResetPasswordLink,
  resetPassword,
  updateUserProfile,
  getUserProfile,
};
