/*RELATORIO 1: COMIDA COM MAIOR QUANTIDADE DE PEDIDOS*/
SELECT DISTINCT id_dish, name_dish
               ,COUNT(*) AS quantidade
  FROM buy_dish 
INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy 
INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish 
INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment
WHERE id_establishment = 1

 GROUP BY id_dish
 ORDER BY quantidade DESC

/*RELATORIO 2: EXTRATO DE PEDIDOS*/
SELECT * FROM buy_dish 
INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy 
INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish 
INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment
WHERE id_establishment = 1
AND date >= NOW() - interval '7 day'
ORDER BY date DESC;


/*RELATORIO 3: preço médio de cada comida*/
SELECT DISTINCT id_dish, name_dish, value_dish
               ,AVG(value_dish) AS average
  FROM buy_dish 
INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy 
INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish 
INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment
WHERE id_establishment = 1

 GROUP BY id_dish
 ORDER BY id_dish