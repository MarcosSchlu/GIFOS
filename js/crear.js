const paso1 = document.querySelector('.uno');
const paso2 = document.querySelector('.dos');
const paso3 = document.querySelector('.tres');
const reloj = document.querySelector('.reloj');
const luzCamara = document.querySelector('.luzcamara');
const h1Crear = document.querySelector('.h1crear');
const h3Crear = document.querySelector('.h3crear');
const video = document.querySelector('.video')
const grabar = document.querySelector('.grabar')
const previsualizar = document.querySelector('.previsualizar')
const overPrevisualizar = document.querySelector('.overlayprevisualizar')

let grabacion = 0;
let grabador;
let grabando = false;

function getVideoGrabacion() {
    navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
                height: { max: 480 }
            }
        })
        .then(function(stream) {
            h1Crear.innerHTML = "";
            h3Crear.innerHTML = "";
            video.style.display = "block";
            botonCrear.style.display = "flex";
            botonCrear.innerHTML = "Grabar";
            video.srcObject = stream;
            video.play();
            grabacion = 1;
            botonCrear.addEventListener('click', () => {
                if (grabacion == 1) {
                    grabando = !grabando;
                    paso1.style.background = "var(--background)";
                    paso1.style.color = "var(--color-texto)";
                    paso2.style.background = "var(--color-texto)";
                    paso2.style.color = "var(--background)";
                    botonCrear.innerHTML = "Finalizar";
                    if (grabando === true) {
                        this.disabled = true;
                        grabador = RecordRTC(stream, {
                            type: 'gif',
                            frameRate: 1,
                            quality: 10,
                            width: 360,
                            hidden: 240,
                            onGifRecordingStarted: function() {
                                console.log('Comenzo a Grabar')
                            },
                        });
                        grabador.startRecording();
                        transcurrido()
                        grabador.camera = stream;
                    } else {
                        this.disabled = true;
                        grabador.stopRecording(detenerGrabacion);
                        grabando = false;
                        grabacion = 2;
                        console.log('Termino de Grabar')
                    }
                }
            });
        });
}

function detenerGrabacion() {
    grabador.camera.stop();
    let form = new FormData();
    form.append("file", grabador.getBlob(), 'creado.gif');
    reloj.innerHTML = "REPETIR CAPTURA";
    botonCrear.innerHTML = "Subir";
    video.style.display = "none";
    previsualizar.style.display = "flex";
    botonCrear.addEventListener('click', () => {
        if (grabacion == 2) {
            subirGif(form)
            console.log('Subiendo Gif');
            overPrevisualizar.style.display = "flex";
            overPrevisualizar.style.backgroundImage = " var(--cargando)";
            overPrevisualizar.style.backgroundRepeat = "no-repeat";
            overPrevisualizar.style.backgroundSize = "22px";
            overPrevisualizar.style.backgroundPosition = "50% 40%";
        }
    })
    objectURL = URL.createObjectURL(grabador.getBlob());
    previsualizar.src = objectURL;
    previsualizar.classList.remove('ocultar');
    grabador.destroy();
    grabador = null;

}

botonCrear.addEventListener('click', () => {
    if (grabacion == 0) {
        botonCrear.style.display = "none";
        luzCamara.style.display = "block";
        paso1.style.background = "var(--color-texto)";
        paso1.style.color = "var(--background)";
        h1Crear.innerHTML = "??Nos das acceso a tu c??mara?";
        h3Crear.innerHTML = "El acceso a tu camara ser?? v??lido s??lo por el tiempo en el que est??s creando el GIFO.";
        getVideoGrabacion();
    }
});

reloj.addEventListener('click', () => {
    location.reload();
    getVideoGrabacion()
})

function transcurrido() {
    let segundos = 0;
    let minutos = 0;
    let timer = setInterval(() => {
        if (grabando) {
            if (segundos < 60) {
                if (segundos <= 9) {
                    segundos = '0' + segundos;
                }
                reloj.innerHTML = `00:00:0${minutos}:${segundos}`;
                segundos++;
            } else {
                minutos++;
                segundos = 0;
            }
        } else {
            clearInterval(timer)
        }
    }, 1000);
}

function subirGif(gif) {
    paso2.style.background = "var(--background)";
    paso2.style.color = "var(--color-texto)";
    paso3.style.background = "var(--color-texto)";
    paso3.style.color = "var(--background)";
    botonCrear.innerHTML = "Subiendo Gif";
    fetch('https://upload.giphy.com/v1/gifs?api_key=kMevsWFsdbQeo04z4MJknh4dzpRBkmPj', {
            method: 'POST',
            body: gif,
        }).then(res => {
            console.log(res.status)
            if (res.status != 200) {}
            return res.json();
        }).then(data => {
            const gifId = data.data.id;
            console.log("id del gif: ", gifId);
            botonCrear.innerHTML = "Subido !!";
            overPrevisualizar.style.backgroundImage = " var(--exito)";
            overPrevisualizar.innerHTML = "GIFO subido con ??xito";
            reloj.innerHTML = "CREAR NUEVO";
            guardarGif(gifId);
            console.log("Guardo el Gif en localStorage");
        })
        .catch(error => {
            console.error('Error al subir el Gif:', error)
        });
}

const fetchGif = async(url) => {
    const respuesta = await fetch(url)
    data = await respuesta.json();
    return await data;
}

const traerGif = async(url) => {
    const resultado = await fetchGif(url)
    return resultado
}

async function guardarGif(id) {
    let url = 'https://api.giphy.com/v1/gifs/' + id + '?api_key=kMevsWFsdbQeo04z4MJknh4dzpRBkmPj';
    let gifCreado = await traerGif(url);
    arrayMisGifs = [];
    if (localStorage.getItem("misGifosLocalStorage") !== null) {
        arrayMisGifs = JSON.parse(localStorage.getItem("misGifosLocalStorage"));
    }
    arrayGif = {
        'id': id,
        'titulo': gifCreado.data.title,
        'usuario': gifCreado.data.username,
        'url': gifCreado.data.images.original.url
    };
    arrayMisGifs.push(arrayGif);
    localStorage.setItem("misGifosLocalStorage", JSON.stringify(arrayMisGifs));
    const urlgif = gifCreado.data.images.original.url;
    link.style.opacity = 1;
    link.setAttribute("urlgif", urlgif);
    descargaGif.setAttribute("urlgif", urlgif);
    descargaGif.setAttribute("titulogif", "gif");
    descargaGif.style.opacity = 1;
    descargaGif.style.zIndex = 2;
    descargaGif.style.zIndex = 2;
    descargaGif.style.top = "25%";
    descargaGif.style.zIndex = 2;
    descargaGif.style.left = "60%";
    console.log("Proceso Terminado");
}

descargaGif.addEventListener("click", descargar);

link.addEventListener('click', (evento) => {
    let urlgif = evento.target.attributes.getNamedItem('urlgif').value;
    let aux = document.createElement("input");
    aux.value = urlgif;
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert("Link del Gif Copiado al Portapapeles");
});