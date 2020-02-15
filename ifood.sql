CREATE TABLE Person (
    id_person SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    email VARCHAR(30),
    password VARCHAR(50),
    adress VARCHAR(100)
);

CREATE TABLE Establishment (
    id_estabilishiment SERIAL PRIMARY KEY,
    name_estab VARCHAR (30),
    delivery_fee float(20)
);

CREATE TABLE Dish (
    id_dish SERIAL PRIMARY KEY,
    type_dish VARCHAR (30),
    name_dish VARCHAR (30),
    value_dish float(20),
    description_dish VARCHAR (300)
);

CREATE TABLE Notification_center (
    id_notification SERIAL PRIMARY KEY,
    fk_id_person INTEGER REFERENCES Person(id_person),
    fk_id_estabilishiment INTEGER REFERENCES Establishment(id_estabilishiment)
);

CREATE TABLE Coupon (
    id_coupon SERIAL PRIMARY KEY,
    fk_id_person INTEGER REFERENCES Person(id_person),
    fk_id_estabilishiment INTEGER REFERENCES Establishment(id_estabilishiment)
);

CREATE TABLE buy (
    id_buy SERIAL PRIMARY KEY,
    fk_id_dish INTEGER REFERENCES Dish(id_dish),
    fk_id_person INTEGER REFERENCES Person(id_person),
    fk_id_estabilishiment INTEGER REFERENCES Establishment(id_estabilishiment),
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    rate INTEGER
);

