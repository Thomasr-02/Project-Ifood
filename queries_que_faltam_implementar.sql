/*SELECIONAR TODOS OS PRATOS DE UM RESTAURANTE ESPECIFICO*/
SELECT * FROM dish INNER JOIN establishment ON dish.fk_establishment_id_establishment=establishment.id_establishment WHERE name_estab = 'gendai';

/*ADICIONAR PRATOS EM COMPRAS*/
INSERT INTO person_buy(fk_person_id_person, fk_buy_id_buy) VALUES (1, 2) RETURNING *;
INSERT INTO person_buy(fk_person_id_person, fk_buy_id_buy) VALUES (1, 3) RETURNING *;
INSERT INTO person_buy(fk_person_id_person, fk_buy_id_buy) VALUES (1, 4) RETURNING *;
INSERT INTO person_buy(fk_person_id_person, fk_buy_id_buy) VALUES (2, 5) RETURNING *;
INSERT INTO person_buy(fk_person_id_person, fk_buy_id_buy) VALUES (2, 6) RETURNING *;
INSERT INTO person_buy(fk_person_id_person, fk_buy_id_buy) VALUES (3, 7) RETURNING *;

/*MOSTRAR TODAS AS COMPRAS QUE UM USUARIO FEZ*/
SELECT * FROM person_buy 
INNER JOIN person 
ON person_buy.fk_person_id_person=person.id_person 
INNER JOIN buy 
ON person_buy.fk_buy_id_buy=buy.id_buy
WHERE fk_person_id_person = 1;
