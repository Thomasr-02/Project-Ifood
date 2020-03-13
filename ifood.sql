/* Lógico_1: */


CREATE TABLE adress_person (
    id_adress SERIAL PRIMARY KEY,
    city VARCHAR(30),
    neighborhood VARCHAR(30),
    street VARCHAR(30),
    number INT
);

CREATE TABLE Person (
    id_person SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(30),
	id_idAdress int,
	FOREIGN KEY (id_idAdress) REFERENCES adress_person(id_adress)
);


CREATE TABLE establishment (
    id_estabilishment SERIAL PRIMARY KEY,
    name_estab VARCHAR (30),
    email VARCHAR(30),
    password VARCHAR(30),
    delivery_free BOOLEAN,
    category CHAR(30),
    balance float(20)
);

CREATE TABLE dish (
    id_dish SERIAL PRIMARY KEY,
    type_dish VARCHAR (30),
    name_dish VARCHAR (30),
    value_dish float(20),
    description_dish VARCHAR (300)
);

CREATE TABLE Coupon (
    id_coupon SERIAL PRIMARY KEY
);

CREATE TABLE buy (
    id_buy SERIAL PRIMARY KEY,
    rate INTEGER,
    value INT
);



CREATE TABLE adress_est (
    street CHAR,
    city CHAR,
    neighborhood CHAR,
    number INT
);

CREATE TABLE contain (
    fk_establishment_id_estabilishment SERIAL,
    fk_dish_id_dish SERIAL
);

CREATE TABLE send (
    fk_Coupon_id_coupon SERIAL,
    fk_establishment_id_estabilishment SERIAL
);

CREATE TABLE recv (
    fk_Coupon_id_coupon SERIAL,
    fk_Person_id_person SERIAL
);

CREATE TABLE realize (
    fk_Person_id_person SERIAL,
    fk_buy_id_buy SERIAL,
    date DATE
);

CREATE TABLE contain_buy_dish_establishment (
    fk_buy_id_buy SERIAL,
    fk_dish_id_dish SERIAL,
    fk_establishment_id_estabilishment SERIAL
);

CREATE TABLE Relacionamento_2 (
    fk_establishment_id_estabilishment SERIAL
);
 

ALTER TABLE contain ADD CONSTRAINT FK_contain_1
    FOREIGN KEY (fk_establishment_id_estabilishment)
    REFERENCES establishment (id_estabilishment)
    ON DELETE RESTRICT;
 
ALTER TABLE contain ADD CONSTRAINT FK_contain_2
    FOREIGN KEY (fk_dish_id_dish)
    REFERENCES dish (id_dish)
    ON DELETE SET NULL;
 
ALTER TABLE send ADD CONSTRAINT FK_send_1
    FOREIGN KEY (fk_Coupon_id_coupon)
    REFERENCES Coupon (id_coupon)
    ON DELETE SET NULL;
 
ALTER TABLE send ADD CONSTRAINT FK_send_2
    FOREIGN KEY (fk_establishment_id_estabilishment)
    REFERENCES establishment (id_estabilishment)
    ON DELETE SET NULL;
 
ALTER TABLE recv ADD CONSTRAINT FK_recv_1
    FOREIGN KEY (fk_Coupon_id_coupon)
    REFERENCES Coupon (id_coupon)
    ON DELETE SET NULL;
 
ALTER TABLE recv ADD CONSTRAINT FK_recv_2
    FOREIGN KEY (fk_Person_id_person)
    REFERENCES Person (id_person)
    ON DELETE SET NULL;
 
ALTER TABLE realize ADD CONSTRAINT FK_realize_1
    FOREIGN KEY (fk_Person_id_person)
    REFERENCES Person (id_person)
    ON DELETE SET NULL;
 
ALTER TABLE realize ADD CONSTRAINT FK_realize_2
    FOREIGN KEY (fk_buy_id_buy)
    REFERENCES buy (id_buy)
    ON DELETE SET NULL;
 
ALTER TABLE contain_buy_dish_establishment ADD CONSTRAINT FK_contain_buy_dish_establishment_1
    FOREIGN KEY (fk_buy_id_buy)
    REFERENCES buy (id_buy)
    ON DELETE NO ACTION;
 
ALTER TABLE contain_buy_dish_establishment ADD CONSTRAINT FK_contain_buy_dish_establishment_2
    FOREIGN KEY (fk_dish_id_dish)
    REFERENCES dish (id_dish)
    ON DELETE NO ACTION;
 
ALTER TABLE contain_buy_dish_establishment ADD CONSTRAINT FK_contain_buy_dish_establishment_3
    FOREIGN KEY (fk_establishment_id_estabilishment)
    REFERENCES establishment (id_estabilishment)
    ON DELETE NO ACTION;
 
ALTER TABLE Relacionamento_2 ADD CONSTRAINT FK_Relacionamento_2_1
    FOREIGN KEY (fk_establishment_id_estabilishment)
    REFERENCES establishment (id_estabilishment)
    ON DELETE SET NULL;