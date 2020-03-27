const pool = require('../pool');

class restauranteController {
    async findRestaurante(req, res) {       
        try {
            var Restaurante = await pool.query('SELECT * FROM public.establishment INNER JOIN adress_est ON establishment.fk_adress_est_id_adress_est=adress_est.id_adress_est;');
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
            var Restaurante = await pool.query('SELECT * FROM establishment WHERE id_establishment = $1 ', [id])
            return res.status(200).json(Restaurante["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async findRestauranteDishes(req,res){
        try{
            var id = parseInt(req.params.id)
            var Restaurante = await pool.query('SELECT dish.id_dish, dish.name_dish, dish.value_dish, dish.description_dish, dish.type_dish FROM dish INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment WHERE id_establishment = $1; ', [id])
            return res.status(200).json(Restaurante["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async delRestaurante(req,res){
        try{
            var id = parseInt(req.params.id)
            var Restaurante = await pool.query('DELETE FROM establishment WHERE id_establishment = $1 RETURNING *', [id])
            return res.status(200).json(Restaurante.rows);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async addRestaurante(req,res){
        try{
            const {city, neighborhood, street, number, name_estab, email, password, delivery_fee, category, balance } = req.body 
            var Adress = await pool.query('INSERT INTO adress_est(city, neighborhood, street, number) VALUES ($1, $2, $3, $4);',[city, neighborhood, street, number]);
            var Restaurante = await pool.query('INSERT INTO public.establishment (name_estab, email, password, delivery_fee, category, balance) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',[name_estab, email, password, delivery_fee, category, balance]);
            return res.status(200).json(Restaurante["rows"]);

        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }    

    async updRestaurante(req,res){
        try{
            const { id_person,name_estab, delivery_fee, category, balance } = req.body            
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