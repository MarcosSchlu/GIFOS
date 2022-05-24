const traerSugerencias = async letras => {
    const url = `https://api.giphy.com/v1/tags/related/${letras}?api_key=kMevsWFsdbQeo04z4MJknh4dzpRBkmPj&limit=4&lang=es`;
    const response = await fetch(url);
    const jsonRes = await response.json();
    return jsonRes;
}

const traerSugerenciasElementos = (sugerencias) => {
    const arraySugerencias = []
    sugerencias.data.forEach(sug => {
        const elementoDiv = document.createElement('div');
        elementoDiv.innerHTML = `<li class="iconobusqueda">${sug.name}</li>`;
        elementoDiv.addEventListener('click', (ev) => {
            let input = inputBusqueda;
            input.value = ev.target.textContent;
            let evento = document.createEvent('Event');
            evento.initEvent('keypress');
            evento.which = evento.keyCode = 13;
            input.dispatchEvent(evento);
            contenedorSugerencias.innerHTML = '';

        })
        arraySugerencias.push(elementoDiv)
    })
    return arraySugerencias;
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

const actualizarSugerencias = async(ev) => {
    const terms = ev.target.value;
    if (terms == "") {
        contenedorSugerencias.innerHTML = '';
        inputBusqueda.style.borderBottom = '0px solid #9CAFC3';
        contenedorBusqueda.innerHTML = '';
        contenedorBusqueda.style.margin = '0';
        textoBusqueda.innerHTML = '';
        botonVerMas.style.display = "none";
        trending.style.display = "block";
    }
    if (terms.length <= 1) return;
    inputBusqueda.style.borderBottom = '1px solid #9CAFC3';
    const sugerenciasJson = await traerSugerencias(terms);
    const sugerenciaElementos = traerSugerenciasElementos(sugerenciasJson);
    contenedorSugerencias.innerHTML = '';
    sugerenciaElementos.forEach(elem => {
        contenedorSugerencias.appendChild(elem)
    })
}

if (inputBusqueda) {
    inputBusqueda.addEventListener('input', actualizarSugerencias);
    inputBusqueda.addEventListener('keypress', busqueda);
}


function busqueda(e) {
    if ((e.key === 'Enter') || (e.keyCode === 13)) {
        const texto = inputBusqueda.value;
        if (texto == '') { return; }
        inputBusqueda.style.borderBottom = 'none';
        funcionMostarBusqueda(texto);
        mostrarBusqueda(texto);
    }
}

const fetchGifs = async(url) => {
    const respuesta = await fetch(url)
    data = await respuesta.json();
    return await data;
}

const traerGifs = async(url) => {
    const resultado = await fetchGifs(url)
    return resultado
}

const getGifHtml = (gif, clase) => {
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

function getTrendingTerms() {
    let URL = `https://api.giphy.com/v1/trending/searches?api_key=kMevsWFsdbQeo04z4MJknh4dzpRBkmPj&lang=es&limit=5`;
    fetch(URL)
        .then(data => data.json())
        .then(json => {
            const searchterms = document.getElementById("trensearch");
            const searDivs = [];
            json.data.forEach((texto) => {
                searDivs.push(`<div class="clickable" onclick="mostrarBusqueda('${texto}')">${texto}</div>`);
            });
            searchterms.innerHTML = searDivs.join(',&nbsp');
        });
}

getTrendingTerms()

async function mostrarBusqueda(texto) {
    let url = 'https://api.giphy.com/v1/gifs/search?api_key=kMevsWFsdbQeo04z4MJknh4dzpRBkmPj&q=' + texto + '&limit=&offset=0&rating=g&lang=es'
    let gifsBusqueda = await traerGifs(url);
    const cantGif = gifsBusqueda.data.length;
    let listadoBusqueda = contenedorBusqueda;
    if (cantGif == 0) {
        textoBusqueda.innerHTML = "Busqueda no Encontrada";
        const errorImg = document.createElement("img");
        const errorP = document.createElement("p");
        errorP.style.fontSize = "22px";
        errorP.style.color = "#50E3C2";
        errorP.innerHTML = "Intenta con otra Cosa";
        errorImg.setAttribute('src', "imagenes/icon-busqueda-sin-resultado.svg");
        errorImg.style.width = '150px';
        errorImg.style.height = '150px';
        errorImg.style.display = 'flex';
        errorImg.style.justifyContent = 'center';
        errorImg.style.paddingTop = '150px';
        errorImg.style.marginLeft = 'auto';
        errorImg.style.marginRight = 'auto';
        textoBusqueda.appendChild(errorImg);
        textoBusqueda.appendChild(errorP);
    } else {
        if (cantGif > 12) { botonVerMas.style.display = "block"; }
        const clase = 'resultadoimagenesbusqueda';
        for (i = 0; i < cantGif; i++) {
            arrayBusqueda = {
                'id': gifsBusqueda.data[i].id,
                'titulo': gifsBusqueda.data[i].title,
                'usuario': gifsBusqueda.data[i].username,
                'url': gifsBusqueda.data[i].images.original.url
            };
            listadoBusqueda.appendChild(getGifHtml(arrayBusqueda, clase))
        }
        let items = Array.from(document.querySelectorAll(".resultadoimagenesbusqueda"));
        cantidad = 12;
        items.forEach(function(item, index) {
            if (index > cantidad - 1) {
                item.classList.add('ocultar');
            }
        });
    }
}

function funcionMostarBusqueda(titulo) {
    textoBusqueda.innerHTML = titulo;
    trending.style.display = "none";
    contenedorBusqueda.style.margin = "25px 0 ";
    contenedorBusqueda.innerHTML = '';
    contenedorSugerencias.innerHTML = '';
}