function descargar(evento) {
    let url = evento.target.attributes.getNamedItem('urlgif').value;
    let nombre = evento.target.attributes.getNamedItem('titulogif').value;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = function() {
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL(this.response);
        let tag = document.createElement('a');
        tag.href = imageUrl;
        tag.download = nombre;
        document.body.appendChild(tag);
        tag.click();
        document.body.removeChild(tag);
    }
    xhr.send();
}