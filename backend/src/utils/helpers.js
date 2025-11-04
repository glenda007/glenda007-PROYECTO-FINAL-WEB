const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

const calculateCartTotal = (items) => {
  return items.reduce((total, item) => {
    return total + (item.gameId?.price || 0);
  }, 0);
};

const errorResponse = (message, statusCode = 500) => {
  return {
    success: false,
    error: message,
    statusCode
  };
};

const successResponse = (data, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    message,
    data,
    statusCode
  };
};

module.exports = {
  isValidObjectId,
  calculateCartTotal,
  errorResponse,
  successResponse
};