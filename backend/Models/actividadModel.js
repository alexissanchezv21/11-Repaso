const conectar= require('../config/database');

async function registrarActividad(nombre, materia, estado, prioridad) {
    const sql= `
    INSERT INTO actividades(nombre, materia, estado, prioridad)
    VALUES (?,?,?,?)`;

    const db= await conectar();
    const [resultado]=await db.execute(sql, [
        nombre,
        materia,
        estado,
        prioridad
    ]);
    return resultado.insertId;
}

async function consultarActividades() {
    const sql= `SELECT * FROM  actividades`;
    const db= await conectar();
    const [filas] = await db.execute(sql);
    return filas;
}

async function actualizarEstado(id, estado) {
    const sql= `UPDATE actividades 
    SET estado = ? 
    WHERE id = ?`;
    const db= await conectar();
    const [resultado] = await db.execute(sql, 
        [estado, id]);
    return resultado.affectedRows;
}

async function eliminarActividad(id) {
    const sql = `DELETE FROM actividades 
    WHERE id = ?`;
    const db = await conectar();
    const [resultado] = await db.execute(sql, [id]);
    return resultado.affectedRows;
}
module.exports=
{
    registrarActividad,
    consultarActividades,
    actualizarEstado,
    eliminarActividad
};