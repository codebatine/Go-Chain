// errorHandler.js

export const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
    return {
      message: error.response.data.message || 'An error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    // The request was made but no response was received
    console.error('Request data:', error.request);
    return { message: 'No response received from server', status: null };
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error message:', error.message);
    return { message: error.message, status: null };
  }
};
