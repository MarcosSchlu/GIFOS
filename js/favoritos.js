arrayFavoritos = [];
if (localStorage.getItem("favLocalStorage") !== null) {
    arrayFavoritos = JSON.parse(localStorage.getItem("favLocalStorage"));
}

if (arrayFavoritos.length > 0) {
    if (contenedorSinFavoritos) {
        contenedorSinFavoritos.innerHTML = "";
    }
}

function agregarFavoritos(evento) {
    let idgif = evento.target.attributes.getNamedItem('idgif').value;
    let urlgif = evento.target.attributes.getNamedItem('urlgif').value;
    let titulogif = evento.target.attributes.getNamedItem('titulogif').value;
    let usuariogif = evento.target.attributes.getNamedItem('usuariogif').value;
    let corazongif = evento.target.className;
    if (corazongif != 'corazon') {
        evento.target.setAttribute("class", "corazon");
        for (i = 0; i < arrayFavoritos.length; i++) {
            if (arrayFavoritos[i].id == idgif) {
                arrayFavoritos.splice(i, 1);
            }
        }
        localStorage.setItem("favLocalStorage", JSON.stringify(arrayFavoritos));
    } else {
        let fav = {
            "id": idgif,
            "titulo": titulogif,
            "usuario": usuariogif,
            "url": urlgif
        };

        arrayFavoritos.push(fav);
        localStorage.setItem("favLocalStorage", JSON.stringify(arrayFavoritos));
        evento.target.setAttribute("class", "corazon corazonActivo");
    }
}

const getGifaHtml = (gif, clase) => {
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

function mostrarFavoritos() {
    let cantidadFavoritos = arrayFavoritos.length;
    if (cantidadFavoritos > 12) { botonVerMas.style.display = "block"; }
    const clase = 'resultadoimagenesbusqueda';
    for (i = 0; i < cantidadFavoritos; i++) {
        misFavoritos.appendChild(getGifaHtml(arrayFavoritos[i], clase))
    }
    let items = Array.from(document.querySelectorAll(".resultadoimagenesbusqueda"));
    cantidad = 12;
    items.forEach(function(item, index) {
        if (index > cantidad - 1) {
            item.classList.add('ocultar');
        }
    });
}

if (misFavoritos) {
    mostrarFavoritos()
}