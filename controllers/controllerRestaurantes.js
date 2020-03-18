const { Pool } = require('pg')
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const express = require('express');


const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '12345678',
    database: 'postgres2'
})

class restauranteController {
    async findRestaurante(req, res) {       
        try {
            var Restaurante = await pool.query('SELECT id_estabilishment, name_estab, email, password, delivery_free, category, balance FROM public.establishment');
            return res.status(200).json(Restaurante["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async Authenticate(req,res){
        var email = (req.email);
        var password = (req.password);
        console.log(email);
        console.log(password);
        var Login = await pool.query('SELECT * FROM establishment WHERE email=$1 and password=$2',[email,password])
        return Login;
            
    }

    async findOneRestaurante(req,res){
        try{
            var id = parseInt(req.params.id)
            var Restaurante = await pool.query('SELECT * FROM estabilishment WHERE id_estabilishment = $1 ', [id])
            return res.status(200).json(Restaurante["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async delRestaurante(req,res){
        try{
            var id = parseInt(req.params.id)
            var Restaurante = await pool.query('DELETE FROM establishment WHERE id_estabilishment = $1 RETURNING *', [id])
            return res.status(200).json(Restaurante.rows);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async addRestaurante(req,res){
        try{
            const { name_estab, email, password, delivery_free, category, balance } = req.body 
            var Restaurante = await pool.query('INSERT INTO public.establishment (name_estab, email, password, delivery_free, category, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[name_estab, email, password, delivery_free, category, balance]);
            return res.status(200).json(Restaurante["rows"]);

        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    

    async updRestaurante(req,res){
        try{
            const { id_person,name_estab, delivery_free, category, balance } = req.body            
            var Restaurante = await pool.query('UPDATE person SET first_name = $2, last_name = $3, email = $4, password = $5 WHERE id_person = $1 RETURNING *',
                [id_person, first_name, last_name, email, password]);
            return res.status(200).json(Restaurante.rows);
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    
}


module.exports = new restauranteController();