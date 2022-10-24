const { Router } = require('express')
const mensajes = require('../class/mensajes.js')
const router = Router()

router.post('/',(req,res)=>{
    fyh= new Date().toLocaleString()
    const email = req.body.email; const mensaje = req.body.mensaje
    mensajes.save({ email: email, time: fyh, mensaje: mensaje })
    res.status(200).redirect('./')
})