const sumaQueryString = document.querySelector("button.sumaquerystring");
sumaQueryString.addEventListener("click", () => {
  document.querySelector("#error").innerHTML = "";
  document.querySelector("#resultado").innerHTML = "";
  const num1 = document.querySelector("input[name=\"num1\"]");
  const num2 = document.querySelector("input[name=\"num2\"]");

  // forma alternativa de construir la query string
  // fetch("./.netlify/functions/suma?" + new URLSearchParams({ num1: num1.value, num2: num2.value }))

  fetch(`./.netlify/functions/suma?num5=${num1.value}&num2=${num2.value}`)
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
