document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('formulario');

    formulario.addEventListener('submit', function(evento) {
        const nombre = document.getElementById('nombre').value.trim();
        const materia = document.getElementById('materia').value.trim();
        const prioridad = document.getElementById('prioridad').value;

        if (nombre === "") {
            evento.preventDefault();
            alert("Por favor, ingresa el nombre de la actividad.");
            return;
        }

        if (materia === "") {
            evento.preventDefault();
            alert("Por favor, ingresa la materia correspondiente.");
            return;
        }

        if (prioridad === "") {
            evento.preventDefault();
            alert("Por favor, selecciona el nivel de prioridad.");
            return;
        }
    });
});