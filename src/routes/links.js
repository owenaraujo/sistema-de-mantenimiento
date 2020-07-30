const express= require('express');
const router= express.Router();
// conexion base de Datos
const pool = require ('../database');
const { query, request } = require('express');
// add maquina
router.get('/add',(req,res) => {
    res.render ('links/add');
});
router.post('/add', async (req, res)=>{
    const {
        equipo,tipo, codificacion, marca, modelo, serial, funcionamiento, observaciones} = req.body;
    const newlink ={
        equipo,
        codificacion,
        tipo,  
        marca, 
        modelo, 
        serial,
        funcionamiento, 
        observaciones
    };
    await pool.query('INSERT INTO lista_maquinas set ?',[newlink]);
        req.flash('success','equipo registrado')
        res.redirect('/links');        
}); 
router.get('/', async (req,res) =>{
    const links = await pool.query('SELECT * FROM lista_maquinas');
        res.render('links/lista_maquinas',{links});
});

// delete maquina
router.get('/delete/:id', async (req,res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM lista_maquinas WHERE  ID= ?',[id]);
    req.flash('success','equipo borrado')

        res.redirect('/links');
});
// edit maquina 
router.get('/edit/:id', async (req,res) =>{
    const {id} = req.params;
     const links = await pool.query('SELECT * FROM lista_maquinas WHERE  ID= ?',[id]);
    res.render('links/edit',{link:links[0]});
        
});
router.post('/edit/:id',async (req, res)=>{
const {id}= req.params;
const {
    equipo,tipo, codificacion, marca, modelo, serial, funcionamiento, observaciones} = req.body;
const newlink ={
    equipo,
    codificacion,
    tipo,  
    marca, 
    modelo, 
    serial,
    funcionamiento, 
    observaciones
};
await pool.query('UPDATE  lista_maquinas set ? WHERE  ID= ?',[newlink, id])
req.flash('success','equipo editado')

res.redirect('/links')
})

// add product
router.get('/productos/addproduct',(req,res) => {
    res.render ('links/productos/addproduct');
});
router.post('/productos/addproduct', async (req, res)=>{
    const {
        producto,cantidad, precio_por_lote,precio_unitario,codificacion,peso } = req.body;
    const newproduct ={
        producto,
        cantidad,
        precio_por_lote,  
        precio_unitario, 
        codificacion,
        peso
    };
    await pool.query('INSERT INTO lista_productos set ?',[newproduct]);
    req.flash('success',' registrado')
    res.redirect("/links/productos/lista_productos")
}); 
router.get('/productos/lista_productos', async (req,res) =>{
    const productos = await pool.query('SELECT * FROM lista_productos');
        res.render('links/productos/lista_productos',{productos});
});
// delete producto 
router.get('/productos/delete/:id', async (req,res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM lista_productos WHERE  ID= ?',[id]);
    req.flash('success','producto borrado')

        res.redirect('/links/productos/lista_productos');
});
// editproduct
router.get('/productos/editproduct/:id', async (req,res) => {
    const {id} = req.params;
     const productos = await pool.query('SELECT * FROM lista_productos WHERE  ID= ?',[id]);
    res.render ('links/productos/editproduct', {product:productos[0]});
});
router.post('/productos/editproduct/:id', async (req, res)=>{
    const {id}= req.params;
    const {
        producto,cantidad, precio_por_lote,precio_unitario,codificacion,peso } = req.body;
    const newproduct ={
        producto,
        cantidad,
        precio_por_lote,  
        precio_unitario, 
        codificacion,
        peso
    };
    await pool.query('UPDATE  lista_productos set ? WHERE  ID= ?',[newproduct, id]);
    req.flash('success','producto editado')

    res.redirect("/links/productos/lista_productos")
}); 
module.exports = router;