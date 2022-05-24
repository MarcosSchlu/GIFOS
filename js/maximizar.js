function ampliar(evento) {
    modal.style.display = "flex";
    let idgif = evento.target.attributes.getNamedItem('idgif').value;
    let urlgif = evento.target.attributes.getNamedItem('urlgif').value;
    let titulogif = evento.target.attributes.getNamedItem('titulogif').value;
    let usuariogif = evento.target.attributes.getNamedItem('usuariogif').value;
    let corazongif = evento.target.attributes.getNamedItem('corazongif').value;
    ampliada.setAttribute("style", "background-image: url('" + urlgif + "')");
    ampliada.style.backgroundRepeat = "no-repeat";
    ampliada.style.backgroundSize = "100% 100%";
    titulo.innerHTML = titulogif;
    usuario.innerHTML = usuariogif;
    corazon.setAttribute("class", corazongif);
    corazon.setAttribute("titulogif", titulogif);
    corazon.setAttribute("usuariogif", usuariogif);
    corazon.setAttribute("idgif", idgif);
    corazon.setAttribute("urlgif", urlgif);
    corazon.addEventListener("click", agregarFavoritos);
    descarga.setAttribute("urlgif", urlgif);
    descarga.setAttribute("titulogif", titulogif);
    document.querySelector('.descargamodal').addEventListener("click", descargar);
}
if (cerrarModal) {
    cerrarModal.addEventListener("click", function() {
        modal.style.display = "none";
    });
}