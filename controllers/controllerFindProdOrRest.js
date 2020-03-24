const { Pool } = require('pg')
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const express = require('express');

const pool = require('../pool');

class controllerFindProdOrRest {

    async findProductOrRestaurante(req,res){
        try{
            var nome = parseInt(req.params.nome)
            var find = await pool.query('SELECT establishment from establishment join dish on establishment.id_establishment=dish.fk_establishment_id_establishment  WHERE dish.name_dish=$1 or establishment.name_estab=$1 RETURNING * ', [nome])
            return res.status(200).json(find["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }
   

}

module.exports = new controllerFindProdOrRest();


    
    
       
