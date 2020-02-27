/* Logico: */

CREATE TABLE Person (
    id_person SERIAL INTEGER PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(50),
    adress INTEGER
);


CREATE TABLE adress(
    id_adress SERIAL PRIMARY KEY INTEGER,
    city VARCHAR(30),
    neighborhood VARCHAR(30),
    street VARCHAR(30),
    number INTEGER
);

CREATE TABLE Establishment (
    id_estabilishiment SERIAL INTEGER PRIMARY KEY,
    name_estab VARCHAR (30),
    delivery_fee float(20)
);

CREATE TABLE Dish (
    id_dish SERIAL INTEGER PRIMARY KEY,
    type_dish VARCHAR (30),
    name_dish VARCHAR (30),
    value_dish float(20),
    description_dish VARCHAR (300)
);

CREATE TABLE Notification_center (
    id_notification SERIAL INTEGER PRIMARY KEY
);

CREATE TABLE Coupon (
    id_coupon SERIAL INTEGER PRIMARY KEY
);

CREATE TABLE buy (
    id_buy SERIAL INTEGER PRIMARY KEY,
    order_date TIMESTAMP,
    rate INTEGER
);

CREATE TABLE Dish_Establishment (
    fk_Dish_id_dish INTEGER,
    fk_Establishment_id_estabilishiment INTEGER,
    id SERIAL PRIMARY KEY
);

CREATE TABLE Coupon_Establishment (
    fk_Coupon_id_coupon INTEGER,
    fk_Establishment_id_estabilishiment INTEGER,
    id SERIAL PRIMARY KEY
);

CREATE TABLE Coupon_Person (
    fk_Coupon_id_coupon INTEGER,
    fk_Person_id_person INTEGER,
    id SERIAL PRIMARY KEY
);

CREATE TABLE Person_Notification (
    fk_Person_id_person INTEGER,
    fk_Notification_center_id_notification INTEGER,
    id SERIAL PRIMARY KEY
);

CREATE TABLE Establishment_Notification (
    fk_Establishment_id_estabilishiment INTEGER,
    fk_Notification_center_id_notification INTEGER,
    id SERIAL PRIMARY KEY
);

CREATE TABLE Person_Buy (
    fk_Person_id_person INTEGER,
    fk_buy_id_buy INTEGER,
    id SERIAL PRIMARY KEY
);

CREATE TABLE Dish_Buy (
    fk_Dish_id_dish INTEGER,
    fk_buy_id_buy INTEGER,
    id SERIAL PRIMARY KEY
);
 
ALTER TABLE Dish_Establishment ADD CONSTRAINT FK_Dish_Establishment_1
    FOREIGN KEY (fk_Dish_id_dish)
    REFERENCES Dish (id_dish)
    ON DELETE SET NULL;
 
ALTER TABLE Dish_Establishment ADD CONSTRAINT FK_Dish_Establishment_2
    FOREIGN KEY (fk_Establishment_id_estabilishiment)
    REFERENCES Establishment (id_estabilishiment)
    ON DELETE SET NULL;
 
ALTER TABLE Coupon_Establishment ADD CONSTRAINT FK_Coupon_Establishment_1
    FOREIGN KEY (fk_Coupon_id_coupon)
    REFERENCES Coupon (id_coupon)
    ON DELETE SET NULL;
 
ALTER TABLE Coupon_Establishment ADD CONSTRAINT FK_Coupon_Establishment_2
    FOREIGN KEY (fk_Establishment_id_estabilishiment)
    REFERENCES Establishment (id_estabilishiment)
    ON DELETE SET NULL;
 
ALTER TABLE Coupon_Person ADD CONSTRAINT FK_Coupon_Person_1
    FOREIGN KEY (fk_Coupon_id_coupon)
    REFERENCES Coupon (id_coupon)
    ON DELETE SET NULL;
 
ALTER TABLE Coupon_Person ADD CONSTRAINT FK_Coupon_Person_2
    FOREIGN KEY (fk_Person_id_person)
    REFERENCES Person (id_person)
    ON DELETE SET NULL;
 
ALTER TABLE Person_Notification ADD CONSTRAINT FK_Person_Notification_1
    FOREIGN KEY (fk_Person_id_person)
    REFERENCES Person (id_person)
    ON DELETE RESTRICT;
 
ALTER TABLE Person_Notification ADD CONSTRAINT FK_Person_Notification_2
    FOREIGN KEY (fk_Notification_center_id_notification)
    REFERENCES Notification_center (id_notification)
    ON DELETE SET NULL;
 
ALTER TABLE Establishment_Notification ADD CONSTRAINT FK_Establishment_Notification_1
    FOREIGN KEY (fk_Establishment_id_estabilishiment)
    REFERENCES Establishment (id_estabilishiment)
    ON DELETE RESTRICT;
 
ALTER TABLE Establishment_Notification ADD CONSTRAINT FK_Establishment_Notification_2
    FOREIGN KEY (fk_Notification_center_id_notification)
    REFERENCES Notification_center (id_notification)
    ON DELETE SET NULL;
 
ALTER TABLE Person_Buy ADD CONSTRAINT FK_Person_Buy_1
    FOREIGN KEY (fk_Person_id_person)
    REFERENCES Person (id_person)
    ON DELETE SET NULL;
 
ALTER TABLE Person_Buy ADD CONSTRAINT FK_Person_Buy_2
    FOREIGN KEY (fk_buy_id_buy)
    REFERENCES buy (id_buy)
    ON DELETE SET NULL;
 
ALTER TABLE Dish_Buy ADD CONSTRAINT FK_Dish_Buy_1
    FOREIGN KEY (fk_Dish_id_dish)
    REFERENCES Dish (id_dish)
    ON DELETE RESTRICT;
 
ALTER TABLE Dish_Buy ADD CONSTRAINT FK_Dish_Buy_2
    FOREIGN KEY (fk_buy_id_buy)
    REFERENCES buy (id_buy)
    ON DELETE SET NULL;
