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
            const  id_establishment = parseInt(req.params.id)
            const { delivery_fee, status } = req.body            
            var Restaurante = await pool.query('UPDATE establishment SET delivery_fee=$1, status=$2 WHERE id_establishment = $3 RETURNING *',
                [ delivery_fee, status, id_establishment]);
            return res.status(200).json(Restaurante.rows);
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: err.message });
        }   
    }


    async findReportOne(req,res){
        try{
            var id = parseInt(req.params.id)
            var Report = await pool.query(
                'SELECT DISTINCT id_dish, name_dish, COUNT(id_dish) AS quantidade FROM buy_dish INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment WHERE id_establishment = $1 GROUP BY id_dish ORDER BY quantidade DESC;'
                , [id])
            return res.status(200).json(Report["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async findReportTwo(req,res){
        try{
            var id = parseInt(req.params.id)
            var days = parseInt(req.params.days)

            var query = ("SELECT * FROM buy_dish INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment WHERE id_establishment = " + id + " AND date >= NOW() - interval \'" + days +  " day\' ORDER BY date DESC;")
            
            var Report = await pool.query(query)
            return res.status(200).json(Report["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async findReportThree(req,res){
        try{
            var id = parseInt(req.params.id)
            var Report = await pool.query(
                'SELECT id_dish, name_dish, value_dish, AVG(value) as average FROM dish INNER JOIN buy_dish ON buy_dish.fk_dish_id_dish=dish.id_dish INNER JOIN buy ON buy.id_buy=buy_dish.fk_buy_id_buy INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment WHERE id_establishment = $1 group by 1'
                , [id])
            return res.status(200).json(Report["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }

    async findMostPopular(req, res) {       
        try {
            var limit = parseInt(req.params.limit)
            var Restaurante = await pool.query("SELECT DISTINCT id_dish, name_dish, establishment.name_estab, COUNT(*) AS quantidade FROM buy_dish INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment GROUP BY id_dish, establishment.name_estab ORDER BY quantidade DESC LIMIT $1", [limit]) ;
            console.log(Restaurante)
            return res.status(200).json(Restaurante["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async findCheapRestaurants(req, res) {       
        try {
            var id = parseInt(req.params.id)
            var Restaurante = await pool.query('SELECT MAX(dish.value_dish) FROM dish INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment WHERE id_establishment = $1;', [id])
            return res.status(200).json(Restaurante["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    async findDeliveryFree(req, res) {
        try {
            var Restaurantes = await pool.query('SELECT id_establishment, name_estab, delivery_fee, status, category, balance, email, password, fk_adress_est_id_adress_est FROM public.establishment where delivery_fee=true;')
            
            return res.status(200).json(Restaurantes["rows"])
        }catch(err) {
            return res.status(400).json({ error: err.message })
        }

    }

    async findDelivery(req, res) {
        var delivery_fee = req.params.delivery_fee        
        try {
            var Restaurantes = await pool.query("SELECT * FROM establishment WHERE delivery_fee = $1", [delivery_fee])
            
            return res.status(200).json(Restaurantes["rows"])
        }catch(err) {
            return res.status(400).json({ error: err.message })
        }

    }
}


module.exports = new restauranteController();