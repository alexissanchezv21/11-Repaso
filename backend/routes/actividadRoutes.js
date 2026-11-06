const express = require('express');
const router = express.Router();

const actividadController = require('../controllers/actividadController');
router.post('/actividad', actividadController.registrarActividad);
router.get('/actividades', actividadController.consultarActividades);
router.put('/actividad/:id', actividadController.actualizarEstado);
router.delete('/actividad/:id', actividadController.eliminarActividad);

module.exports=router;