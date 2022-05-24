if (localStorage.getItem("modoElegido") == null) { localStorage.setItem("modoElegido", "Diurno"); }
let modoElegido = localStorage.getItem("modoElegido");

if (modoElegido == "Nocturno") {
    body.classList.toggle("nocturno");
    nombreModo.textContent = 'Modo Diurno';
} else { nombreModo.textContent = 'Modo Nocturno'; }

modo.addEventListener("click", function() {
    let modoElegido = localStorage.getItem("modoElegido");
    body.classList.toggle("nocturno");
    if (body.classList.value == "body diurno") {
        menuHamburguesa.setAttribute("style", "background-image: url('imagenes/close.svg')");
    } else { menuHamburguesa.setAttribute("style", "background-image: url('imagenes/close-modo-noct.svg')"); }
    if (modoElegido == "Diurno") {
        localStorage.setItem("modoElegido", "Nocturno");
        nombreModo.textContent = 'Modo Diurno';
    } else {
        localStorage.setItem("modoElegido", "Diurno");
        nombreModo.textContent = 'Modo Nocturno';
    }
});