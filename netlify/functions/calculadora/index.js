// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
function isNumeric(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

const operaciones = {
  sumar: (num1, num2) => num1 + num2,
  restar: (num1, num2) => num1 - num2,
  multiplicar: (num1, num2) => num1 + num2,
  dividir: (num1, num2) => num1 + num2
};

const handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: "Please provide num1 and num2!",
      };
    }

    const body = JSON.parse(event.body);

    if (!body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please provide num1 and num2!" }),
      };
    }

    const operacion = body.operacion;
    const num1 = body.num1 || false;
    const num2 = body.num2 || false;

    if (!num1 || !num2 || !isNumeric(num1) || !isNumeric(num2)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Please provide num1 and num2!" }),
      };
    }

    if (!operaciones[operacion]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: `Operación no válida: "${operacion}". Operaciones disponibles: ` + Object.keys(operaciones).join(", ") }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ resultado: operaciones[operacion](parseInt(num1), parseInt(num2)) }),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
