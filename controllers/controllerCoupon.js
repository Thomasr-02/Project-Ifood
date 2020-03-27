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

class couponController {
    async findCoupons(req, res) {       
        try {
            var Coupon = await pool.query('SELECT * FROM public.coupon;');
            return res.status(200).json(Coupon["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async findOneCoupon(req,res){
        try{
            var id = parseInt(req.params.id)
            var Coupon = await pool.query('SELECT * FROM coupon WHERE id_coupon = $1 ', [id])
            return res.status(200).json(Coupon["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async delCoupon(req,res){
        try{
            var id = parseInt(req.params.id)
            var Coupon = await pool.query('DELETE FROM coupon WHERE id_coupon = $1 RETURNING *', [id])
            return res.status(200).json(Coupon.rows);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async addCoupon(req,res){
        try{
            const {description, discount} = req.body 
            var Coupon = await pool.query('INSERT INTO coupon(description, discount) VALUES ($1, $2) RETURNING *',[description, discount]);
            return res.status(200).json(Coupon["rows"]);

        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    

    async updCoupon(req,res){
        try{
            const { id_coupon, description, discount } = req.body            
            var Coupon = await pool.query('UPDATE coupon SET description = $2, discount = $3 WHERE id_coupon = $1 RETURNING *',
                [id_coupon, description, discount]);
            return res.status(200).json(Coupon.rows);
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    
}


module.exports = new couponController();