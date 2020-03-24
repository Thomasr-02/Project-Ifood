var mergeJSON = require("merge-json") ;
const pool = require('../pool');

class userController {
    async findUsers(req, res) {       
        try {
            var User = await pool.query('SELECT * FROM person INNER JOIN adress_person ON person.fk_adress_person_id_adress=adress_person.id_adress;');
            return res.status(200).json(User["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findOneUser(req,res){
        try{
            var id = parseInt(req.params.id)
            var User = await pool.query('SELECT * FROM person INNER JOIN adress_person ON person.fk_adress_person_id_adress=adress_person.id_adress WHERE id_person = $1 ', [id])
            return res.status(200).json(User["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async findUserBuys(req, res) { 
        try{
            var id = parseInt(req.params.id)
            var User = await pool.query('SELECT * FROM person')
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
        var Login = await pool.query('SELECT * FROM person WHERE email=$1 and password=$2',[email,password])
        return Login;
            
    }
    
    async delUser(req,res){
        try{
            var id = parseInt(req.params.id)
            var User = await pool.query('DELETE FROM person WHERE id_person = $1 RETURNING *', [id])
            //var Adress = await pool.query('DELETE FROM adress_person WHERE id_adress = $1', [id])
            return res.status(200).json(User.rows);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async addUser(req,res){
        try{
            const {city, neighborhood, street, number, first_name, last_name , email, password } = req.body
            var Adress = await pool.query('INSERT INTO adress_person(city, neighborhood, street, number) VALUES ($1, $2, $3, $4) RETURNING *;',[city, neighborhood, street, number]);
            var User = await pool.query('INSERT INTO person(first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',[first_name, last_name, email, password]);
            var result = mergeJSON.merge(User["rows"], Adress["rows"]) ;

            return res.status(200).json(result);
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