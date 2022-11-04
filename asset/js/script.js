let personajeJugador,
  personajeEnemigo,
  ataqueEnemigo,
  ataqueJugador,
  vidasJugador = 3,
  vidasRival = 3;
const personajes = [
    "sheldon",
    "leonard",
    "rajesh",
    "howard",
    "penny",
    "bernadette",
  ],
  idAtaques = [
    "selec-piedra",
    "selec-papel",
    "selec-tijera",
    "selec-lagarto",
    "selec-spock",
  ],
  ataquesTodos = ["PIEDRA", "PAPEL", "TIJERA", "LAGARTO", "SPOCK"];

function iniciarJuego() {
  ocultarMostrar("elegir-ataque", "none");
  ocultarMostrar("parte-2", "none");
  document.getElementById("reiniciar").style.visibility = "hidden";
  let botonPersonajeJugador = document.getElementById("selec-personaje");
  botonPersonajeJugador.addEventListener("click", selecPersonajeJugador);
  seleccionJugador(false);
  let botonReiniciar = document.getElementById("reiniciar");
  botonReiniciar.addEventListener("click", () => {
    location.reload();
  });
  let botonReglasAbrir = document.getElementById("boton-reglas");
  let iconBotonReglas = document.querySelector("#boton-reglas span");
  if (window.innerWidth <= 450) {
    botonReglasAbrir.addEventListener("click", () => {
      if (iconBotonReglas.innerHTML === "help") {
        ocultarMostrar("div-reglas-juego", "flex");
        iconBotonReglas.innerHTML = "close";
        console.log("REGLAS ABIERTAS");
      } else if (iconBotonReglas.innerHTML === "close") {
        ocultarMostrar("div-reglas-juego", "none");
        iconBotonReglas.innerHTML = "help";
        console.log("REGLAS CERRADAS");
      }
    });
    botonReglasAbrir.addEventListener("mouseout", () => {
      ocultarMostrar("div-reglas-juego", "none");
      iconBotonReglas.innerHTML = "help";
    });
  } else {
    botonReglasAbrir.addEventListener("click", () => {
      if (iconBotonReglas.innerHTML === "help") {
        ocultarMostrar("div-reglas-juego", "flex");
        iconBotonReglas.innerHTML = "close";
      } else if (iconBotonReglas.innerHTML === "close") {
        ocultarMostrar("div-reglas-juego", "none");
        iconBotonReglas.innerHTML = "help";
      }
    });
    botonReglasAbrir.addEventListener("mouseover", () => {
      ocultarMostrar("div-reglas-juego", "flex");
      iconBotonReglas.innerHTML = "close";
    });
    botonReglasAbrir.addEventListener("mouseout", () => {
      ocultarMostrar("div-reglas-juego", "none");
      iconBotonReglas.innerHTML = "help";
    });
  }
}
function ocultarMostrar(id, valorDisplay) {
  let seccion = document.getElementById(id);
  seccion.style.display = valorDisplay;
}
function seleccionJugador(botonDesabilitar) {
  selecAtaqueJugador("selec-piedra", "PIEDRA", botonDesabilitar);
  selecAtaqueJugador("selec-papel", "PAPEL", botonDesabilitar);
  selecAtaqueJugador("selec-tijera", "TIJERA", botonDesabilitar);
  selecAtaqueJugador("selec-lagarto", "LAGARTO", botonDesabilitar);
  selecAtaqueJugador("selec-spock", "SPOCK", botonDesabilitar);

  function selecAtaqueJugador(idBoton, nombreAtaque, desabilitarBoton) {
    let botonNombre = document.getElementById(idBoton);
    if (desabilitarBoton) {
      botonNombre.disabled = desabilitarBoton;
    } else {
      botonNombre.addEventListener("click", () => {
        ataqueJugador = nombreAtaque;
        let imagenAtaqueJugador = document.querySelector(
          `button[id='${idBoton}'] img`
        ).src;
        document.querySelector("div[id='vs-ataque-jugador'] img").src =
          imagenAtaqueJugador;

        selecionRival("ataque-rival", true, idAtaques);
        combate();
      });
    }
  }
}
function selecPersonajeJugador() {
  let jugador = document.querySelector(
    "#elegir-personaje input[type='radio']:checked"
  );
  if (jugador) {
    ocultarMostrar("elegir-ataque", "block");
    ocultarMostrar("parte-2", "flex");
    ocultarMostrar("elegir-personaje", "none");
    let nombreJugador = jugador.attributes.id.value;
    let imagenJugador = document.querySelector(
      `label[for='${nombreJugador}'] img`
    ).src;
    document.getElementById("mascota-jugador").innerHTML = nombreJugador;
    document.querySelector("label[id='vs-personajes-jugador'] img").src =
      imagenJugador;
    personajeJugador = nombreJugador;
    document.getElementById("vida-jugador").innerHTML =
      '<i class="fi fi-ss-heart"></i><i class="fi fi-ss-heart"></i><i class="fi fi-ss-heart"></i>';
    selecionRival("mascota-rival", false, personajes);
  } else {
    alert("SELECCIONA UN PERSONAJE");
  }
}
function selecionRival(idCambiar, esAtaque, seleccionTodo) {
  let seleccionAleatoria = Math.floor(Math.random() * seleccionTodo.length);
  if (esAtaque) {
    ataqueEnemigo = ataquesTodos[seleccionAleatoria];
    imagenAleatoria = seleccionTodo[seleccionAleatoria];
    let imagenAtaqueRival = document.querySelector(
      `button[id='${imagenAleatoria}'] img`
    ).src;
    document.querySelector("div[id='vs-ataque-rival'] img").src =
      imagenAtaqueRival;
  } else if (seleccionTodo[seleccionAleatoria] != personajeJugador) {
    personajeEnemigo = seleccionTodo[seleccionAleatoria];
    document.getElementById(idCambiar).innerHTML = personajeEnemigo;
    let imagenRival = document.querySelector(
      `label[for='${personajeEnemigo}'] img`
    ).src;
    document.querySelector("label[id='vs-personajes-rival'] img").src =
      imagenRival;
    document.getElementById("vida-rival").innerHTML =
      '<i class="fi fi-ss-heart"></i><i class="fi fi-ss-heart"></i><i class="fi fi-ss-heart"></i>';
  } else {
    selecionRival("mascota-rival", false, personajes);
  }
}
function combate() {
  let vidasCorazon = [
    "-",
    '<i class="fi fi-ss-heart"></i>',
    '<i class="fi fi-ss-heart"></i><i class="fi fi-ss-heart"></i>',
  ];
  if (ataqueEnemigo == ataqueJugador) {
    mensajes("EMPATE", "");
  } else if (
    (ataqueEnemigo == "PIEDRA" && ataqueJugador == "PAPEL") ||
    (ataqueEnemigo == "PAPEL" && ataqueJugador == "TIJERA") ||
    (ataqueEnemigo == "TIJERA" && ataqueJugador == "PIEDRA") ||
    (ataqueEnemigo == "LAGARTO" && ataqueJugador == "PIEDRA") ||
    (ataqueEnemigo == "SPOCK" && ataqueJugador == "LAGARTO") ||
    (ataqueEnemigo == "TIJERA" && ataqueJugador == "SPOCK") ||
    (ataqueEnemigo == "LAGARTO" && ataqueJugador == "TIJERA") ||
    (ataqueEnemigo == "PAPEL" && ataqueJugador == "LAGARTO") ||
    (ataqueEnemigo == "SPOCK" && ataqueJugador == "PAPEL") ||
    (ataqueEnemigo == "PIEDRA" && ataqueJugador == "SPOCK")
  ) {
    mensajes(
      "Ganaste",
      'Rival -<i class="fi fi-ss-heart" id="icon-mensaje"></i>'
    );
    document.getElementById("vida-rival").innerHTML =
      vidasCorazon[--vidasRival];
  } else {
    mensajes(
      "Perdiste",
      `${personajeJugador} -<i class="fi fi-ss-heart" id="icon-mensaje"></i>`
    );
    document.getElementById("vida-jugador").innerHTML =
      vidasCorazon[--vidasJugador];
  }
  revisarVidas();
}
function revisarVidas() {
  if (vidasRival == 0) {
    mensajes("Felicidades", "ganaste la partida");
    seleccionJugador(true);
    document.getElementById("reiniciar").style.visibility = "visible";
  } else if (vidasJugador == 0) {
    mensajes("Lo sentimos", "perdiste la partida");
    seleccionJugador(true);
    document.getElementById("reiniciar").style.visibility = "visible";
  }
}
function mensajes(mensaje1, mensaje2) {
  let seccionMensaje1 = document.getElementById("mensaje1");
  seccionMensaje1.innerHTML = mensaje1;
  let seccionMensaje2 = document.getElementById("mensaje2");
  seccionMensaje2.innerHTML = mensaje2;
}
window.addEventListener("load", iniciarJuego);
