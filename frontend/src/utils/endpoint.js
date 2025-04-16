import axios from 'axios';

const API_ENDPOINT = process.env.NEXT_PUBLIC_BASE_URL;

// Define available HTTP methods
const IAPIEndpointMethod = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'];

/**
 * Create a full API endpoint object
 */
const getAPIEndpoint = (path, method, headers = {}) => {
  const cleanedPath = path.startsWith('/') ? path.slice(1) : path;
  const cleanedBase = API_ENDPOINT.endsWith('/')
    ? API_ENDPOINT.slice(0, -1)
    : API_ENDPOINT;
  const url = `${cleanedBase}/${cleanedPath}`;

  return {
    url,
    method,
    headers,
  };
};

/**
 * Axios method handlers
 */
const AxiosFetch = {
  GET: async ({ url, config }) => await axios.get(url, config),
  POST: async ({ url, body, config }) => await axios.post(url, body, config),
  PUT: async ({ url, body, config }) => await axios.put(url, body, config),
  PATCH: async ({ url, body, config }) => await axios.patch(url, body, config),
  DELETE: async ({ url, config }) => await axios.delete(url, config),
  OPTIONS: async ({ url, config }) => await axios.options(url, config),
};

/**
 * Generic axios fetch based on endpoint object
 */
const axiosFetch = async (endpoint, body) => {
  const config = endpoint.headers ? { headers: endpoint.headers } : {};
  const method = endpoint.method?.toUpperCase() || 'GET';

  if (!AxiosFetch[method]) {
    throw new Error(`Unsupported HTTP method: ${method}`);
  }

  return await AxiosFetch[method]({
    url: endpoint.url,
    body,
    config,
  });
};

/**
 * Unified fetch handler with error handling
 */
const axiosFetchHandler = async (endpoint, body) => {
  try {
    const response = await axiosFetch(endpoint, body);
    return response.data;
  } catch (err) {
    if (err.response) {
      const { error } = err.response.data || {};
      console.log(error ?? 'Server responded with an error');
    } else if (err.request) {
      console.log('Server is not responding');
    } else {
      console.log(err.message ?? 'Unexpected error occurred');
    }
  }
};

/**
 * Public API function for calling an endpoint and getting typed response
 */
const callApi = async (endpoint, body) => {
  return await axiosFetchHandler(endpoint, body);
};

export {
  getAPIEndpoint,
  axiosFetch,
  axiosFetchHandler,
  callApi,
  IAPIEndpointMethod,
};
