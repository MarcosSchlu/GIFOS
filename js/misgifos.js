arrayMisGifs = [];
if (localStorage.getItem("misGifosLocalStorage") !== null) {
    arrayMisGifs = JSON.parse(localStorage.getItem("misGifosLocalStorage"));
}

if (arrayMisGifs.length > 0) {
    if (contenedorSinGif) {
        contenedorSinGif.innerHTML = "";
    }
}

const obtenergif = (gif, clase) => {
    let arrayGif = gif;
    const divContenedor = document.createElement('div');
    if (arrayFavoritos[0]) {
        if (arrayFavoritos.find(f => f.id == gif.id)) { estadoFavorito = "corazon corazonActivo"; } else { estadoFavorito = "corazon"; }
    } else {
        estadoFavorito = "corazon";
    }
    const template =
        `<div class="${clase}">
	<img src="${gif.url}" alt="${gif.titulo}" class="imagen" corazongif="${estadoFavorito}" idgif="${gif.id}" usuariogif="${gif.usuario}" titulogif="${gif.titulo} "urlgif="${gif.url}" />
	<div class="overlay"></div>
	<div class="usuario">${gif.usuario}</div>
	<div class="titulo">${gif.titulo}</div>
	<div class="descarga" titulogif="${gif.titulo} "urlgif="${gif.url}"></div>
	<div class="${estadoFavorito}" id="corazon" corazongif="${estadoFavorito}" idgif="${gif.id}" usuariogif="${gif.usuario}" titulogif="${gif.titulo} "urlgif="${gif.url}"></div>
	<div class="ampliar" corazongif="${estadoFavorito}" idgif="${gif.id}" usuariogif="${gif.usuario}" titulogif="${gif.titulo} "urlgif="${gif.url}"></div>
	<div class="url" idgif="${gif.url}"></div></div>`;
    divContenedor.innerHTML = template;
    divContenedor.querySelector('#corazon').addEventListener("click", agregarFavoritos);
    divContenedor.querySelector('.descarga').addEventListener("click", descargar);
    divContenedor.querySelector('.ampliar').addEventListener("click", ampliar);
    divContenedor.querySelector('.imagen').addEventListener("click", ampliar);
    return divContenedor;
}

if (botonVerMas) {
    botonVerMas.addEventListener("click", function() {
        ocultos = Array.from(document.querySelectorAll(".ocultar"));
        ocultos.forEach(function(item, index) {
            if (index < cantidad) { item.classList.remove('ocultar'); }
            if (document.querySelectorAll('.ocultar').length === 0) { botonVerMas.style.display = "none"; }
        });
    });
}

function mostrarMisGifs() {
    let cantidadGif = arrayMisGifs.length;
    if (cantidadGif > 12) {
        botonVerMas.style.display = "block";
    }
    const clase = "resultadoimagenesbusqueda";
    for (i = 0; i < cantidadGif; i++) {
        misGifs.appendChild(obtenergif(arrayMisGifs[i], clase));
    }
    let items = Array.from(
        document.querySelectorAll(".resultadoimagenesbusqueda")
    );
    cantidad = 12;
    items.forEach(function(item, index) {
        if (index > cantidad - 1) {
            item.classList.add("ocultar");
        }
    });
}

if (misGifs) {
    mostrarMisGifs();
}