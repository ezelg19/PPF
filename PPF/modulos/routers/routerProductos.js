import { Router } from 'express'
const Productos = require('../class/productos.js')

const router = Router()

const producto = Productos
const admin = false

router.get('/:id?',(req,res)=>{
    const {id} = req.params
    if(id !== 0){
        res.send(producto.getById(id))
    }else{
        res.send(producto.getAll())
    }
})

router.post('/',(req, res)=>{
    if(admin){
        const {nombre, descripcion, codigo, img, precio, stock} = req.body
        timestamp = new Date().toLocaleString()
        res.send(producto.save({timestamp:timestamp, nombre:nombre, descripcion:descripcion, codigo:codigo, img:img, precio:'$'+precio, stock:stock}))
    }else{res.send({error:-1, descripcion:'ruta "/appi/productos" metodo POST no autorizado'})}
})

router.put('/:id',(req,res)=>{
    if(admin){
        const {id,nombre, descripcion, codigo, img, precio, stock} = req.body
        timestamp = new Date().toLocaleString()
        const producto = new Productos(__dirname+'../fileSistem/productos.json')
        producto.actualizar({id, timestamp, nombre, descripcion, codigo, img, precio, stock})
    }else{res.send({error:-1, descripcion:'ruta "/appi/productos/:id" metodo PUT no autorizado'})}
})

router.delete('/:id',(req,res)=>{
    if(admin){
    
    }else{res.send({error:-1, descripcion:'ruta "/appi/productos/:id" metodo DELETE no autorizado'})}
})

module.exports = router
