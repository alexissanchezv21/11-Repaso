//Arranque de pagina
document.addEventListener('DOMContentLoaded', cargarActividades);

//Mostrar las actividades
async function cargarActividades() {
    const respuesta = await fetch('http://localhost:3005/actividades');
    const actividades = await respuesta.json();
    
    const tabla = document.getElementById('tabla-actividades');
    tabla.innerHTML = ''; // Limpiar

    actividades.forEach(act => {
        // Variables para ver qué opción del select debe aparecer seleccionada
        const selPendiente = act.estado === 'Pendiente' ? 'selected' : '';
        const selProceso = act.estado === 'En proceso' ? 'selected' : '';
        const selCompletada = act.estado === 'Completada' ? 'selected' : '';

        // Insertar la fila directamente en la tabla
        tabla.innerHTML += `
            <tr>
                <td>${act.id}</td>
                <td>${act.nombre}</td>
                <td>${act.materia}</td>
                <td>${act.prioridad}</td>
                <td>
                    <select class="estado-select" onchange="actualizarEstado(${act.id}, this.value)">
                        <option value="Pendiente" ${selPendiente}>Pendiente</option>
                        <option value="En proceso" ${selProceso}>En proceso</option>
                        <option value="Completada" ${selCompletada}>Completada</option>
                    </select>
                </td>
                <td>
                    <button class="btn-eliminar" onclick="eliminarActividad(${act.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

//Modificar el estado
async function actualizarEstado(id, nuevoEstado) {
    await fetch(`http://localhost:3005/actividad/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
    });
    
    cargarActividades();
}

//Eliminar actividad
async function eliminarActividad(id) {
    if (confirm('¿Eliminar esta actividad?')) {
        await fetch(`http://localhost:3005/actividad/${id}`, { 
            method: 'DELETE' 
        });
        
        cargarActividades();
    }
}