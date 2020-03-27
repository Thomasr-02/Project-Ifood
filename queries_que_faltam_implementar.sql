/*RELATORIO 1: COMIDA COM MAIOR QUANTIDADE DE PEDIDOS*/
SELECT id_dish FROM buy_dish 
INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy 
INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish 
INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment
WHERE id_establishment = 1

GROUP BY id_dish
ORDER BY COUNT(*) DESC
LIMIT 1;

/*RELATORIO 2: EXTRATO DE PEDIDOS*/
SELECT * FROM buy_dish 
INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy 
INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish 
INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment
WHERE id_establishment = 2
AND date BETWEEN '2017-03-27 17:25:45' AND '2020-03-27 17:25:46'
ORDER BY date DESC;