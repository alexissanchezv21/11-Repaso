const express = require('express');
const path = require('path');
require('dotenv').config();

const actividadRoutes = require('./routes/actividadRoutes');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

app.use('/', actividadRoutes);

app.listen(3005, ()=>{
    console.log('Servidor ejecutándose en el puerto 3005');
});