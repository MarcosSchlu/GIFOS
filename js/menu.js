menuHamburguesa.addEventListener("click", function() {
    if (menu.style.display === "block") {
        menu.style.display = "none";
        menuhamburguesa.setAttribute("style", "background-image: url('imagenes/burger.svg')");
        menuhamburguesa.setAttribute("style", "color: #FFFFFF");
    } else {
        if (modoElegido == "Diurno") {
            menuhamburguesa.setAttribute("style", "background-image: url('imagenes/close.svg')");
        } else {
            menuhamburguesa.setAttribute("style", "background-image: url('imagenes/close-modo-noct.svg')");
        }
        menu.style.display = "block";
    }
});