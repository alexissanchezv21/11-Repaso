const actividadModel= require('../Models/actividadModel');

async function registrarActividad(req, res) {
    try{
        const nombre= req.body.nombre;
        const materia= req.body.materia;
        const estado= req.body.estado;
        const prioridad= req.body.prioridad;

        if (typeof nombre !== 'string' || !nombre.trim() ||
            typeof materia !== 'string' || !materia.trim() ||
            typeof estado !== 'string' || !estado.trim() ||
            typeof prioridad !== 'string' || !prioridad.trim()
        )
        {
            return res.status(400).send('Datos del registro invalidos');
        }

        const id=await  actividadModel.registrarActividad(
            nombre.trim(),
            materia.trim(),
            estado.trim(),
            prioridad.trim(),
        );

        const parametros= new URLSearchParams ({
            id:id,
            nombre:nombre.trim(),
            estado:estado.trim(),
            prioridad:prioridad.trim()
        });
        res.redirect('/consultar.html?' + parametros.toString());
    }
    catch(error){
        console.error('Error al guardar la actividad:', error);
        res.status(500).send('Error al registrar la actividad');
    }
    
}

async function consultarActividades(req, res) {
    try{
        const actividades = await actividadModel.consultarActividades();
        res.json(actividades);

    }
    catch (error){
        console.error('Error al consultar actividades:', error);
        res.status(500).send('Error al consultar los datos');
    }
}

async function actualizarEstado(req, res) {
    try{
        const id= req.params.id;
        const estado= req.body.estado;

        if(!estado){
            return res.status(400).send('Falta el estado');
        }

        await actividadModel.actualizarEstado(id, estado);
        res.status(200).send('Estado actualizado');   
    }
    catch (error){
        console.error('Error al actualizar el estado:', error);
        res.status(500).send('Error al actualizar');
    }
}

async function eliminarActividad(req, res) {
    try{
        const id= req.params.id;
        await actividadModel.eliminarActividad(id);
        res.status(200).send('Actividad eliminada');
    }
    catch (error){
        console.error('Error al eliminar la actividad:', error);
        res.status(500).send('Error al eliminar');
    }
}

module.exports = {
        registrarActividad,
        consultarActividades,
        actualizarEstado,
        eliminarActividad
    }