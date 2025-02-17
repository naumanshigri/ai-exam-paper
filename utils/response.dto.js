/**
 * Utility to send a structured response for success cases
 * @param {Object} res - Express response object
 * @param {number} code - HTTP status code
 * @param {string} message - Response message
 * @param {Object | Array} [data] - Response data (optional)
 * @returns {Object} Express response object
 */
exports.successResponse = async (res, code, message, data = []) => {
  const response = {
    code,
    message,
    body: data,
  };
  return res.status(code).json(response);
};

/**
 * Utility to handle and send error responses
 * @param {Object} res - Express response object
 * @param {Object} err - Error object or string
 * @returns {Object} Express response object
 */
exports.errorResponse = async (res, err) => {
  console.error("Error:", err); // Log error for debugging
  const message = err.message || err;
  return res.status(400).json({
    code: 400,
    message,
    body: [],
  });
};
