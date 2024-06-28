export const handleApiError = (error) => {
  if (error.response) {
    console.error('Response data:', error.response.data);
    console.error('Response status:', error.response.status);
    console.error('Response headers:', error.response.headers);
    return {
      message: error.response.data.message || 'An error occurred',
      status: error.response.status,
    };
  } else if (error.request) {
    console.error('Request data:', error.request);
    return { message: 'No response received from server', status: null };
  } else {
    console.error('Error message:', error.message);
    return { message: error.message, status: null };
  }
};
