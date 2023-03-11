// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const handler = async (event) => {
  try {
    const num1 = event.queryStringParameters.num1 || false;
    const num2 = event.queryStringParameters.num2 || false;

    if (!num1 || !num2 || !isNumeric(num1) || !isNumeric(num2)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please provide num1 and num2!" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ suma: parseInt(num1) + parseInt(num2) }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
