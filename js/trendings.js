let numero = 0;

botonSliderDerecha.addEventListener("click", function() {
    numero++;
    mostrarTrending(numero);
});

botonSliderIzquierda.addEventListener("click", function() {
    numero--;
    mostrarTrending(numero);
});

const fetchGifos = async(url) => {
    const respuesta = await fetch(url)
    data = await respuesta.json();
    return await data;
}

const traerGifos = async(url) => {
    const resultado = await fetchGifos(url)
    return resultado
}

const getGifosHtml = (gif, clase) => {
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

async function mostrarTrending(numero) {
    let url = 'https://api.giphy.com/v1/gifs/trending?api_key=kMevsWFsdbQeo04z4MJknh4dzpRBkmPj&limit=25&rating=g';
    let gifsTrending = await traerGifos(url);
    resultadoTrending.innerHTML = '';
    nuevoNumero = numero + 3;
    const cantGif = gifsTrending.data.length;
    for (i = numero; i < nuevoNumero; i++) {
        arrayTrending = {
            'id': gifsTrending.data[i].id,
            'titulo': gifsTrending.data[i].title,
            'usuario': gifsTrending.data[i].username,
            'url': gifsTrending.data[i].images.original.url
        };
        const clase = 'resultadoimagenes';
        if ((numero < cantGif) && (numero >= 0)) {
            listadoTrending.appendChild(getGifosHtml(arrayTrending, clase))
        }
        numero++;
    }
}

mostrarTrending(numero);
let listadoTrending = resultadoTrending;