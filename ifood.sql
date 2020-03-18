/* Lógico_1: */

CREATE TABLE person (
    id_person SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(30),
    fk_adress_person_id_adress SERIAL
);

CREATE TABLE establishment (
    id_establishment SERIAL PRIMARY KEY,
    name_estab VARCHAR(30),
    delivery_fee FLOAT(20),
    category VARCHAR(30),
    balance FLOAT(20),
    email VARCHAR(30),
    password VARCHAR(30),
    fk_adress_est_id_adress_est SERIAL
);

CREATE TABLE dish (
    id_dish SERIAL PRIMARY KEY,
    type_dish VARCHAR(30),
    name_dish VARCHAR(30),
    value_dish FLOAT(20),
    description_dish VARCHAR(300),
    fk_establishment_id_establishment SERIAL
);

CREATE TABLE coupon (
    id_coupon SERIAL PRIMARY KEY,
    description VARCHAR(300),
    discount INTEGER
);

CREATE TABLE buy (
    id_buy SERIAL PRIMARY KEY,
    rating INTEGER,
    value FLOAT(20)
);

CREATE TABLE adress_person (
    city VARCHAR(30),
    neighborhood VARCHAR(30),
    street VARCHAR(30),
    number INTEGER,
    id_adress SERIAL PRIMARY KEY
);

CREATE TABLE adress_est (
    street VARCHAR(30),
    city VARCHAR(30),
    neighborhood VARCHAR(30),
    number INTEGER,
    id_adress_est SERIAL PRIMARY KEY
);

CREATE TABLE establishment_coupon (
    fk_coupon_id_coupon SERIAL,
    fk_establishment_id_establishment SERIAL
);

CREATE TABLE person_coupon (
    fk_coupon_id_coupon SERIAL,
    fk_person_id_person SERIAL
);

CREATE TABLE person_buy (
    fk_person_id_person SERIAL,
    fk_buy_id_buy SERIAL,
    date TIMESTAMP
);

CREATE TABLE buy_dish (
    fk_dish_id_dish SERIAL,
    fk_buy_id_buy SERIAL,
    date TIMESTAMP
);
 
ALTER TABLE person ADD CONSTRAINT FK_person_2
    FOREIGN KEY (fk_adress_person_id_adress)
    REFERENCES adress_person (id_adress)
    ON DELETE CASCADE;
 
ALTER TABLE establishment ADD CONSTRAINT FK_establishment_2
    FOREIGN KEY (fk_adress_est_id_adress_est)
    REFERENCES adress_est (id_adress_est)
    ON DELETE SET NULL;
 
ALTER TABLE dish ADD CONSTRAINT FK_dish_2
    FOREIGN KEY (fk_establishment_id_establishment)
    REFERENCES establishment (id_establishment)
    ON DELETE CASCADE;
 
ALTER TABLE establishment_coupon ADD CONSTRAINT FK_establishment_coupon_1
    FOREIGN KEY (fk_coupon_id_coupon)
    REFERENCES coupon (id_coupon)
    ON DELETE SET NULL;
 
ALTER TABLE establishment_coupon ADD CONSTRAINT FK_establishment_coupon_2
    FOREIGN KEY (fk_establishment_id_establishment)
    REFERENCES establishment (id_establishment)
    ON DELETE SET NULL;
 
ALTER TABLE person_coupon ADD CONSTRAINT FK_person_coupon_1
    FOREIGN KEY (fk_coupon_id_coupon)
    REFERENCES coupon (id_coupon)
    ON DELETE SET NULL;
 
ALTER TABLE person_coupon ADD CONSTRAINT FK_person_coupon_2
    FOREIGN KEY (fk_person_id_person)
    REFERENCES person (id_person)
    ON DELETE SET NULL;
 
ALTER TABLE person_buy ADD CONSTRAINT FK_person_buy_1
    FOREIGN KEY (fk_person_id_person)
    REFERENCES person (id_person)
    ON DELETE SET NULL;
 
ALTER TABLE person_buy ADD CONSTRAINT FK_person_buy_2
    FOREIGN KEY (fk_buy_id_buy)
    REFERENCES buy (id_buy)
    ON DELETE SET NULL;
 
ALTER TABLE buy_dish ADD CONSTRAINT FK_buy_dish_1
    FOREIGN KEY (fk_dish_id_dish)
    REFERENCES dish (id_dish)
    ON DELETE RESTRICT;
 
ALTER TABLE buy_dish ADD CONSTRAINT FK_buy_dish_2
    FOREIGN KEY (fk_buy_id_buy)
    REFERENCES buy (id_buy)
    ON DELETE SET NULL;