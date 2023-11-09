const inputBusqueda = document.getElementById("buscador");
const botonBusqueda = document.getElementById("botonBusqueda");
const main = document.querySelector("main");

// Declarar una variable para almacenar los datos de la API
let data = null;

function getPersonajes(done) {
  const results = fetch("https://rickandmortyapi.com/api/character");

  results
    .then(response => response.json())
    .then(apiData => {
      data = apiData; // Asignar los datos a la variable data
      done(apiData);
    });
}

function mostrarPersonajes(data) {
  data.results.forEach(personaje => {
    const article = document.createRange().createContextualFragment(/*html */`
      <article>
        <div class="image-container">
          <img src="${personaje.image}" alt="Personaje">
        </div>
        <h2>${personaje.name}</h2>
        <span>${personaje.species}</span>
      </article>
    `);
    main.appendChild(article);
  });
}

getPersonajes(mostrarPersonajes);

// Escuchar el evento clic del botón de búsqueda
botonBusqueda.addEventListener("click", function () {
  const terminoBusqueda = inputBusqueda.value.toLowerCase();

  if (!data) {
    // Si los datos aún no se han cargado, no realizar la búsqueda
    alert("Espere a que los datos se carguen completamente.");
    return;
  }

  // Filtrar los personajes que coincidan con el término de búsqueda
  const resultados = data.results.filter(personaje => {
    const nombreEnMinusculas = personaje.name.toLowerCase();
    return nombreEnMinusculas.includes(terminoBusqueda);
  });

  // Limpiar el contenido actual del main
  main.innerHTML = "";

  // Mostrar los resultados de la búsqueda
  resultados.forEach(personaje => {
    const article = document.createRange().createContextualFragment(/*html */`
      <article>
        <div class="image-container">
          <img src="${personaje.image}" alt="Personaje">
        </div>
        <h2>${personaje.name}</h2>
        <span>${personaje.species}</span>
      </article>
    `);
    main.appendChild(article);
  });
});
