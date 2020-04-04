const pool = require('../pool');

class controllerFindProdOrRest {

    async findRestauranteByName (req,res){
        try{
            var  name_estab =  req.params.rest 
            name_estab = '%'+name_estab + '%'
            
            var find = await pool.query('SELECT * FROM establishment WHERE establishment.name_estab LIKE $1', [name_estab])
            console.log(find)
            return res.status(200).json(find["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }   
    }
    async ListOrProductRestaurante(req, res) {       
        try {
            
            var find = await pool.query('SELECT * FROM public.establishment INNER JOIN adress_est ON establishment.fk_adress_est_id_adress_est=adress_est.id_adress_est;');
            return res.status(200).json(find["rows"]);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
    async findDishByName (req, res) {       
        var  name_dish   = req.params.dish

        name_dish = '%' + name_dish + '%'
        console.log(name_dish)
        try {
            var find = await pool.query('SELECT * FROM establishment join dish on establishment.id_establishment=dish.fk_establishment_id_establishment WHERE dish.name_dish LIKE $1', [name_dish]);
            return res.status(200).json(find["rows"]);
            console.log(find)
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

}

module.exports = new controllerFindProdOrRest();