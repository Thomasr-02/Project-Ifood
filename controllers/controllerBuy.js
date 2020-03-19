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
    async findBuys(req, res) {       
        try {
            var Buy = await pool.query('SELECT * FROM public.buy;');
            return res.status(200).json(Buy["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async findOneBuy(req,res){
        try{
            var id = parseInt(req.params.id)
            var Buy = await pool.query('SELECT * FROM buy WHERE id_buy = $1 ', [id])
            return res.status(200).json(Buy["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async delBuy(req,res){
        try{
            var id = parseInt(req.params.id)
            var Buy = await pool.query('DELETE FROM buy WHERE id_buy = $1 RETURNING *', [id])
            return res.status(200).json(Buy.rows);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async addBuy(req,res){
        try{
            const {rating, value} = req.body 
            var Buy = await pool.query('INSERT INTO buy(rating, value) VALUES ($1, $2) RETURNING *',[rating, value]);
            return res.status(200).json(Buy["rows"]);

        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    

    async updBuy(req,res){
        try{
            const { id_buy, rating, value } = req.body            
            var Buy = await pool.query('UPDATE buy SET rating = $2, value = $3 WHERE id_buy = $1 RETURNING *',
                [id_buy, rating, value]);
            return res.status(200).json(Buy.rows);
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    
}


module.exports = new restauranteController();