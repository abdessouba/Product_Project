
 drop database if exists ez_shop_v2;
 CREATE DATABASE ez_shop_v2;
 use ez_shop_v2;
    
CREATE TABLE `category`(
    `id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `famille` VARCHAR(255) NOT NULL
);

CREATE TABLE `tags`(
    `id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `tag` VARCHAR(255) NOT NULL,
    `category_id` BIGINT UNSIGNED NOT NULL
);

CREATE TABLE `product`(
    `id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `designation` VARCHAR(255) NOT NULL,
    `prix_ht` DOUBLE(8, 2) NOT NULL,
    `tva` DOUBLE(8, 2) NOT NULL,
    `stock` DOUBLE(8, 2) NOT NULL,
    `image` MEDIUMBLOB DEFAULT null,
    `description` LONGTEXT not null,
    `user_id` BIGINT UNSIGNED NOT NULL DEFAULT 1,
    `category_id` BIGINT UNSIGNED NOT NULL,
    `tag_id` BIGINT UNSIGNED NOT NULL
);

CREATE TABLE `user`(
    `id` BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `nom` VARCHAR(255) NOT NULL,
    `prenom` VARCHAR(255) NOT NULL,
    `adresse` longtext DEFAULT "",
    `ville` VARCHAR(255) DEFAULT "",
    `email` VARCHAR(255) NOT NULL,
    `password` varchar(255) not null,
    `image` MEDIUMBLOB DEFAULT null
);

create table shopCart(
id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
product_id BIGINT UNSIGNED NOT NULL,
user_id BIGINT UNSIGNED NOT NULL,
qte INT,
prix FLOAT,
foreign key(product_id) REFERENCES product(id),
foreign key(user_id) REFERENCES user(id)
);

CREATE TABLE `BonLivraison`(
    `id` BIGINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `date` DATE default curdate(),
    `reglé` TINYINT(1) NOT NULL,
    `user_id` BIGINT UNSIGNED NULL
);

CREATE TABLE `detail_bl`(
    `id` BIGINT UNSIGNED PRIMARY KEY NOT NULL AUTO_INCREMENT,
    `product_id` BIGINT UNSIGNED NOT NULL,
    `bl_id` BIGINT UNSIGNED NOT NULL,
    `qte` DOUBLE(8, 2) NOT NULL
);

ALTER TABLE
    `BonLivraison` ADD CONSTRAINT `bonlivraison_client_id_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
ALTER TABLE
    `detail_bl` ADD CONSTRAINT `detail_bl_bl_id_foreign` FOREIGN KEY(`bl_id`) REFERENCES `BonLivraison`(`id`);
ALTER TABLE
    `detail_bl` ADD CONSTRAINT `detail_bl_product_id_foreign` FOREIGN KEY(`product_id`) REFERENCES `product`(`id`);

ALTER TABLE
    `product` ADD CONSTRAINT `product_tag_id_foreign` FOREIGN KEY(`tag_id`) REFERENCES `tags`(`id`);
        
ALTER TABLE
    `product` ADD CONSTRAINT `product_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `category`(`id`);
    
ALTER TABLE
    `product` ADD CONSTRAINT `user_foreign` FOREIGN KEY(`user_id`) REFERENCES `user`(`id`);
    
ALTER TABLE
    `tags` ADD CONSTRAINT `tags_category_id_foreign` FOREIGN KEY(`category_id`) REFERENCES `category`(`id`);

DELIMITER //
CREATE FUNCTION calc_ttc(ph FLOAT, tva INT)
RETURNS FLOAT
BEGIN
    RETURN (ph + (tva / 100 * ph));
END //
DELIMITER ;

select * from tags;
insert into category values(null, "clothes"), (null, "electronics"), (null, "accessories");
insert into tags values(null, "t-shirt", 1), (null, "jacket", 1), (null, "cap", 1);
insert into tags values(null, "monitor", 2), (null, "laptop", 2), (null, "desktop", 2), (null, "gadgets", 2);
insert into tags values(null, "jewelery", 3);

insert into user values(null, "abde", "ouba", "addr1", "fes", "test@gmail.com", "1212", null);

insert into product values(null, "Mens Casual Premium Slim Fit T-Shirts", 22.3, 20, 20, "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg", "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.", 1, 1, 1);
insert into product values(null, "Mens Cotton Jacket", 55.99, 20,20, "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg", "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.", 1,1, 2);
insert into product values(null, "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet", 695, 15, 10, "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg", "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.", 1,3, 8);
insert into product values(null, "Solid Gold Petite Micropave ", 168, 15, 5,  "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg", "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.", 1, 3,8);
insert into product values(null, "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s", 109, 20, 40, "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg", "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",1,2, 7);
insert into user(nom, prenom, email, password, image) values('hamada', "hamada", "abd#", "12", null);
select * from detail_bl where bl_id = 4;
select * from user;


SELECT bonlivraison.id , bonlivraison.date, user.adresse, user.ville, user.email, CONCAT(user.nom, ' ', user.prenom) AS user, designation, qte, famille, calc_ttc(prix_ht, tva) as ttc
			FROM bonlivraison 
			JOIN detail_bl ON detail_bl.bl_id = bonlivraison.id 
			JOIN product on detail_bl.product_id = product.id
			JOIN category on category.id = product.category_id
			JOIN user ON user.id = bonlivraison.user_id 
			WHERE user.id = 3;




select * from product, user where user.id = product.user_id and user.id = 2;


DELIMITER //
CREATE TRIGGER reduce_stock AFTER INSERT ON detail_bl  
FOR EACH ROW
BEGIN
    IF NEW.qte <= (SELECT stock FROM product WHERE id = NEW.product_id) THEN
        UPDATE product SET stock = stock - NEW.qte WHERE id = NEW.product_id;
    END IF;
END //
DELIMITER ;
SELECT bonlivraison.id as bl, bonlivraison.date, user.adresse, user.ville, user.email, CONCAT(user.nom, ' ', user.prenom) AS user, designation, qte, famille, calc_ttc(prix_ht, tva) as ttc
        FROM bonlivraison 
        JOIN detail_bl ON detail_bl.bl_id = bonlivraison.id 
        JOIN product on detail_bl.product_id = product.id
        JOIN category on category.id = product.category_id
        JOIN user ON user.id = bonlivraison.user_id 
        WHERE user.id = 1 order by bl;
select * from user;