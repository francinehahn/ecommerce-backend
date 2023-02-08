import { connection } from "./connection"


const createTables = () => connection.raw(`
    CREATE TABLE IF NOT EXISTS Labecommerce_users (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(80) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Labecommerce_products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(200) NOT NULL,
        price FLOAT NOT NULL,
        image_url VARCHAR(255) NOT NULL,
        fk_user_id CHAR(36) NOT NULL,
        FOREIGN KEY(fk_user_id) REFERENCES Labecommerce_users(id)
    );

    CREATE TABLE IF NOT EXISTS Labecommerce_purchases (
        id CHAR(36) PRIMARY KEY,
        fk_user_id CHAR(36) NOT NULL,
        fk_product_id INT NOT NULL,
        quantity INT NOT NULL,
        total_price FLOAT NOT NULL,
        created_at DATE NOT NULL,
        FOREIGN KEY (fk_user_id) REFERENCES Labecommerce_users(id),
        FOREIGN KEY (fk_product_id) REFERENCES Labecommerce_products(id)
    );
`).then(() => console.log("Tabelas criadas.")).catch(err => console.log(err.message || err.sqlMessage))

const insertIntoTable = () => connection.raw(`
    INSERT INTO Labecommerce_users
    VALUES ('1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a', 'Laura Muller', 'lmuller@terra.com.br', 'muller45863gdhal'),
    ('0s0dg5-dsfsd-6513-tx7v3al-45df3-dfgj', 'Pedro Soares', 'pedrosoares@gmail.com', 'soares456321123');

    INSERT INTO Labecommerce_products
    VALUES (1 , 'McBook Pro', 6250.8, 'https://i.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU', '1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a'),
    (2, 'Sapato de salto bege tamanho 37', 259.9, 'https://i.picsum.photos/id/21/3008/2008.jpg?hmac=T8DSVNvP-QldCew7WD4jj_S3mWwxZPqdF0CNPksSko4', '1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a'),
    (3, 'Chícara de Cuba', 49.9, 'https://i.picsum.photos/id/30/1280/901.jpg?hmac=A_hpFyEavMBB7Dsmmp53kPXKmatwM05MUDatlWSgATE', '1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a'),
    (4, 'Máquina fotográfica Argo Flex', 1390, 'https://i.picsum.photos/id/91/3504/2336.jpg?hmac=tK6z7RReLgUlCuf4flDKeg57o6CUAbgklgLsGL0UowU', '1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a'),
    (5, 'Relógio de cabeceira', 89.8, 'https://i.picsum.photos/id/175/2896/1944.jpg?hmac=djMSfAvFgWLJ2J3cBulHUAb4yvsQk0d4m4xBJFKzZrs', '1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a'),
    (6, 'Livro razões para acreditar', 49.9, 'https://i.picsum.photos/id/24/4855/1803.jpg?hmac=ICVhP1pUXDLXaTkgwDJinSUS59UWalMxf4SOIWb9Ui4', '1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a'),
    (7, 'PlayStation 5.0', 4499.9, 'https://i.picsum.photos/id/96/4752/3168.jpg?hmac=KNXudB1q84CHl2opIFEY4ph12da5JD5GzKzH5SeuRVM', '1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a'),
    (8, 'Kindle Paperwhite 16GB', 499.8, 'https://i.picsum.photos/id/367/4928/3264.jpg?hmac=H-2OwMlcYm0a--Jd2qaZkXgFZFRxYyGrkrYjupP8Sro', '1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a'),
    (9, 'Kit de cozinha', 328.7, 'https://i.picsum.photos/id/490/5000/3306.jpg?hmac=3oE07HbI9nD9GkJ50fLHDdQXuSJjbBEK7K9n7ScL-2s', '1fg65-f3s45-s5s4s-jhasd2-hjba-85gh3a'),
    (10, 'Kit de chícaras de fazenda', 129.9, 'https://i.picsum.photos/id/635/2509/1673.jpg?hmac=O3P1jEnFp0FqGswH9gRKIuKI-inphuJBkZZ1-enTKEw', '0s0dg5-dsfsd-6513-tx7v3al-45df3-dfgj'),
    (11, 'Prancha de surf', 1287, 'https://i.picsum.photos/id/643/2365/1774.jpg?hmac=CBdDz5JMPEdMYAvfQLBLytKXeI5BotRy4DdBonedbIQ', '0s0dg5-dsfsd-6513-tx7v3al-45df3-dfgj'),
    (12, 'Bicicleta retrô branca', 1429.9, 'https://i.picsum.photos/id/839/5000/3333.jpg?hmac=_PxHrKqc67W-G7R3chcUT98WkjjUSFycGON2GI5MSA8', '0s0dg5-dsfsd-6513-tx7v3al-45df3-dfgj'),
    (13, 'Bíblia Sagrada', 59.9, 'https://i.picsum.photos/id/1010/5000/3333.jpg?hmac=CuwA5P9jjX0HXsLl6IzkF6a7YHmXujB7zLwbtdRPEyM', '0s0dg5-dsfsd-6513-tx7v3al-45df3-dfgj'),
    (14, 'Piano Auberger & Gloss', 11870, 'https://i.picsum.photos/id/1082/5000/3334.jpg?hmac=44XgU_oubiefk4FmdomL506on7YDW51TgGUmsau8PRE', '0s0dg5-dsfsd-6513-tx7v3al-45df3-dfgj'),
    (15, 'Vitrola Retro Bluetooth Pulse Morrison', 599, 'https://i.picsum.photos/id/39/3456/2304.jpg?hmac=cc_VPxzydwTUbGEtpsDeo2NxCkeYQrhTLqw4TFo-dIg', '0s0dg5-dsfsd-6513-tx7v3al-45df3-dfgj');
`).then(() => {
    console.log("Valores inseridos.")
    connection.destroy()
}).catch(err => console.log(err.message || err.sqlMessage))

createTables().then(insertIntoTable)
