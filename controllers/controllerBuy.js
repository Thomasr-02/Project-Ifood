
const pool = require('../pool');

class buyController {
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

    async findBuyDishes(req,res){
        try{
            var id = parseInt(req.params.id)
            var Buy = await pool.query('SELECT dish.id_dish, dish.name_dish, dish.value_dish, dish.description_dish, dish.type_dish FROM buy_dish INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish WHERE fk_buy_id_buy = $1;', [id])
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

    async addDishOnBuy(req,res){
        try{
            var id_buy = parseInt(req.params.id)
            const {id_dish, date} = req.body
            var Buy = await pool.query('INSERT INTO buy_dish(fk_buy_id_buy, fk_dish_id_dish, date) VALUES ($1, $2, $3) RETURNING *;',[id_buy, id_dish, date]);
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

module.exports = new buyController();