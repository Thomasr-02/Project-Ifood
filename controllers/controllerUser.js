const { Pool } = require('pg')

const { Router } = require('express');

const { check, validationResult } = require('express-validator');
const express = require('express');

const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: '123456',
    database: 'postgres2'
})

class userController {
    async findUsers(req, res) {       
        try {
            var User = await pool.query('SELECT *FROM person');
            return res.status(200).json(User["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findOneUser(req,res){
        try{
            var id = parseInt(req.params.id)
            var User = await pool.query('SELECT * FROM person WHERE id_person = $1 ', [id])
            return res.status(200).json(User["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }
    async Authenticate(req,res){
        

            var email = (req.email);
            var password = (req.password);
            console.log(email);
            console.log(password);
            var Login = await pool.query('SELECT * FROM person WHERE email=$1 and password=$2',[email,password]).then((res)=>{
                console.log(res)
                if(res["rowCount"]!=0){
                    return true;
                }else {
                    return false;
                }
                }
            )
    }
    

    async delUser(req,res){
        try{
            var id = parseInt(req.params.id)
            var User = await pool.query('DELETE FROM person WHERE id_person = $1 RETURNING *', [id])
            return res.status(200).json(User.rows);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async addUser(req,res){
        try{
            const { first_name, last_name , email, password } = req.body //ja q adress é uma enteidade, precisa fazer uma query para cadastrar separado
            var User = await pool.query('INSERT INTO person(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',[first_name, last_name, email, password]);
            return res.status(200).json(User["rows"]);

        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    

    async updUser(req,res){
        try{
            const { id_person,first_name, last_name , email, password } = req.body            
            var User = await pool.query('UPDATE person SET first_name = $2, last_name = $3, email = $4, password = $5 WHERE id_person = $1 RETURNING *',
                [id_person, first_name, last_name, email, password]);
            return res.status(200).json(User.rows);
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    
}



module.exports = new userController();