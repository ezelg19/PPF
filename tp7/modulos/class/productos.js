const knex = require('knex')
const { option } = require('./configKnex/config.js')

class Productos {
    constructor(config, tabla) {
        this.knex = knex(config)
        this.table = tabla
    }

    async save(obj) {
        try {
            return await this.knex(this.table).insert(obj)
        } catch (error) {
            console.log(error)
        }
    }
    async actualizar(obj) {
        try {
            return await this.knex.from(this.table).where('id', '=', obj.id).update(obj)
        } catch (error) {
            console.log('error?',error)
        }
    }
    async getById(id) {
        try {
            return await this.knex.from(this.table).select('*').where('id', '=', parseInt(id))
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            return await this.knex.from(this.table).select('*')
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteById(id) {
        try {
            return await this.knex.from(this.table).where('id', '=', parseInt(id)).del()
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }

    async deleteAll() {
        try {
            return await this.knex.from(this.table).select('*').del()
        } catch (error) {
            console.error('Error leer archivo: ' + error)
        }
    }
}
const productos = new Productos(option.mysql,'productos')

module.exports = productos