const buttonSumaJson = document.querySelector("button.sumajson");
buttonSumaJson.addEventListener("click", () => {
  document.querySelector("#error").innerHTML = "";
  document.querySelector("#resultado").innerHTML = "";
  const num1 = document.querySelector("input[name=\"num1\"]");
  const num2 = document.querySelector("input[name=\"num2\"]");
  fetch("./.netlify/functions/sumajson", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      num1: num1.value,
      num2: num2.value
    })
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        throw new Error(data.error);
      }
      const resultado = document.querySelector("#resultado");
      resultado.innerHTML = data.suma;
    }).catch(err => {
      const error = document.querySelector("#error");
      error.innerHTML = err;
    });
});
