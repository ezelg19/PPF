// import { Productos } from "../class/productos.js"
const Productos = require('../class/productos')
const Carritos = require('../class/carritos')
const carrito = Carritos
const produc = Productos
time = new Date().toLocaleString()
// async function mostrar(){
    // const idProd = await producto.save({timestamp:time , nombre:"algo" ,descripcion:"lalalalal", codigo:3157328, img: null, precio:'$'+132, stock: 100})
    // await producto.actualizar({id:15,timestamp:time , nombre:"act" ,descripcion:"lalalalal", codigo:3157328, img: null, precio:'$'+132, stock: 100})
    // console.log('id:',idProd)
    // const a = await producto.getById(15)
    // console.log('index',a)
// }
// mostrar()
async function mostrar(){
    // let producto = await produc.getById(2)
    // await carrito.save({timestamp: time, producto})
    // const producto = await produc.getById(10)
    // await carrito.newProducto(producto, 15)
    // const carrito1 = await carrito.getById(4)
    // const productos = carrito1[0].productos
    // const filtrado = productos.filter(item => item.id !== 10)
    // carrito1[0].productos = filtrado
    // carrito.deleteProductoById(4,10)

}
mostrar()