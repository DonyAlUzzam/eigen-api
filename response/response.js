exports.successResponse = (data, message = 'Success') => {
    return { status: 'success', message, data };
  };
  
  exports.errorResponse = (message = 'Error', data = null) => {
    return { status: 'error', message, data };
  };
  