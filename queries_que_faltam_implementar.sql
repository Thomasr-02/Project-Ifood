/*critérios dinâmicos*/

/*Mais pedidos*/
SELECT DISTINCT id_dish, name_dish, establishment.name_estab
               ,COUNT(*) AS quantidade
  FROM buy_dish 
INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy 
INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish 
INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment

 GROUP BY id_dish, establishment.name_estab
 ORDER BY quantidade DESC
 LIMIT 5;

/* Restaurante popular */
SELECT MAX(dish.value_dish)
FROM dish INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment 
WHERE id_establishment = 1;

/*Promoções : 
um restaurante é listado no critério promoção se o 
preço de pelo menos uma comida está com desconto de pelo menos 50%
com relação ao preço médio dos 7 dias anteriores.*/

/*seleciona o preço medio dos ultimos 7 dias (falta fazer uma comparação se esta com 50%)*/

SELECT id_dish, AVG(value_dish) AS average_price FROM buy_dish
INNER JOIN buy ON buy_dish.fk_buy_id_buy=buy.id_buy 
INNER JOIN dish ON buy_dish.fk_dish_id_dish=dish.id_dish 
INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment
WHERE id_establishment = 2
AND date >= NOW() - interval '7 day'

GROUP BY id_dish