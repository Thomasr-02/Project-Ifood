const { Pool } = require('pg')
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const express = require('express');

const pool = require('../pool');

class dishController {
    async findDishes(req, res) {       
        try {
            var Dish = await pool.query('SELECT * FROM dish INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment;');
            return res.status(200).json(Dish["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findOneDish(req,res){
        try{
            var id = parseInt(req.params.id)
            var Dish = await pool.query('SELECT * FROM dish INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment WHERE id_dish = $1 ', [id])
            return res.status(200).json(Dish["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async listAllDishOneRestaurante(req,res){
        try {

        }catch(err) {
            
        }
    }

    async delDish(req,res){
        try{
            var id = parseInt(req.params.id)
            var Dish = await pool.query('DELETE FROM dish WHERE id_dish = $1 RETURNING *', [id])
            //var Adress = await pool.query('DELETE FROM adress_dish WHERE id_adress = $1', [id])
            return res.status(200).json(Dish.rows);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async addDish(req,res){
        try{
            const { type_dish, 
                    name_dish, 
                    value_dish, 
                    description_dish, 
                    fk_establishment_id_establishment } = req.body
            var Dish = await pool.query('INSERT INTO dish(type_dish, name_dish, value_dish, description_dish, fk_establishment_id_establishment) VALUES ($1, $2, $3, $4, $5) RETURNING *', [type_dish, name_dish, value_dish, description_dish, fk_establishment_id_establishment]);
            return res.status(200).json(Dish["rows"]);

        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    

    async updDish(req,res){
        try{
            const { type_dish, name_dish, value_dish, description_dish } = req.body            
            var Dish = await pool.query('UPDATE dish SET type_dish = $2, name_dish = $3, value_dish = $4, description_dish = $5 WHERE id_dish = $1 RETURNING *',
                [type_dish, name_dish, value_dish, description_dish]);
            return res.status(200).json(Dish.rows);
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    
}

module.exports = new dishController();