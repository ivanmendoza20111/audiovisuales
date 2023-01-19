-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: cinema
-- Source Schemata: cinema
-- Created: Fri Oct 28 22:42:54 2022
-- Workbench Version: 8.0.31
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema cinema
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `cinema` ;
CREATE SCHEMA IF NOT EXISTS `cinema` ;

create table evaluation (
    id varchar(15) not null primary key,
    evaluation text not null,
    active tinyint(1) default 1 not null
);

create table product_brand (
    id varchar(15) not null primary key,
    brand varchar(45) not null
);

create table product_type (
    id varchar(15) not null primary key,
    type varchar(45) not null
);

create table product (
    id varchar(15) not null primary key,
    name varchar(45) not null,
    product_type_id varchar(15) not null,
    product_brand_id varchar(15) not null,
    stock int not null,
    active tinyint(1) default 1 not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null,
    constraint `fk_product_product type` foreign key (product_type_id) references product_type (id) on update cascade on delete cascade,
    constraint fk_product_product_brand1 foreign key (product_brand_id) references product_brand (id) on update cascade on delete cascade
);

create index `fk_product_product type_idx` on product (product_type_id);

create index fk_product_product_brand1_idx on product (product_brand_id);

create table role (
    id varchar(15) not null primary key,
    role varchar(15) not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP null,
    constraint role_UNIQUE unique (role)
);

create table schedule (
    id varchar(15) not null primary key,
    name varchar(25) not null
);

create table user (
    id varchar(15) not null primary key,
    username varchar(20) not null,
    password varchar(100) not null,
    role_id varchar(15) not null,
    name varchar(20) not null,
    surname varchar(30) not null,
    birthday date not null,
    email varchar(80) not null,
    phone varchar(20) not null,
    schedule_id varchar(15) null,
    active tinyint(1) default 1 not null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null,
    constraint email_UNIQUE unique (email),
    constraint username_UNIQUE unique (username),
    constraint fk_user_role1 foreign key (role_id) references role (id) on update cascade on delete cascade,
    constraint schedule_id foreign key (schedule_id) references schedule (id) on update cascade on delete cascade
);

create table reservation (
    id varchar(30) not null primary key,
    from_date datetime(2) not null,
    to_date datetime(2) not null,
    user_type varchar(10) not null,
    user_name varchar(50) not null,
    user_email varchar(80) not null,
    user_phone varchar(20) not null,
    user_code varchar(7) not null,
    user_classroom varchar(4) not null,
    user_course varchar(50) not null,
    user_career varchar(50) not null,
    prof_name varchar(50) null,
    prof_code varchar(6) null,
    active tinyint(1) default 1 not null,
    evaluation_id varchar(15) null,
    created_at timestamp default CURRENT_TIMESTAMP not null,
    updated_at timestamp default CURRENT_TIMESTAMP not null,
    assistant_id varchar(15) null,
    constraint assistant_id foreign key (assistant_id) references user (id) on update cascade on delete cascade,
    constraint fk_reservation_evaluation1 foreign key (evaluation_id) references evaluation (id) on update cascade on delete cascade
);

create table prod_vs_res (
    id varchar(15) not null primary key,
    product_id varchar(15) not null,
    reservation_id varchar(30) not null,
    constraint fk_prod_vs_res_product1 foreign key (product_id) references product (id) on update cascade on delete cascade,
    constraint fk_prod_vs_res_reservation1 foreign key (reservation_id) references reservation (id) on update cascade on delete cascade
);

create index fk_prod_vs_res_product1_idx on prod_vs_res (product_id);

create index fk_prod_vs_res_reservation1_idx on prod_vs_res (reservation_id);

create index fk_reservation_evaluation1_idx on reservation (evaluation_id);

create index fk_user_role1_idx on user (role_id);

create definer = admin @`%` view view_product_full_data as
select
    `p`.`id` AS `id`,
    `p`.`name` AS `name`,
    `p`.`product_type_id` AS `typeId`,
    `pt`.`type` AS `type`,
    `p`.`product_brand_id` AS `brandId`,
    `pb`.`brand` AS `brand`,
    `p`.`stock` AS `stock`,
    `p`.`active` AS `isActive`,
    `p`.`created_at` AS `createdAt`
from
    (
        (
            `audiovisual-utesa`.`product` `p`
            join `audiovisual-utesa`.`product_brand` `pb` on ((`p`.`product_brand_id` = `pb`.`id`))
        )
        join `audiovisual-utesa`.`product_type` `pt` on ((`p`.`product_type_id` = `pt`.`id`))
    )
order by
    `p`.`created_at` desc;

create definer = admin @`%` view view_product_stock_sum as
select
    `audiovisual-utesa`.`view_product_full_data`.`type` AS `type`,
    sum(
        `audiovisual-utesa`.`view_product_full_data`.`stock`
    ) AS `stock`
from
    `audiovisual-utesa`.`view_product_full_data`
where
    (
        `audiovisual-utesa`.`view_product_full_data`.`isActive` = 1
    )
group by
    `audiovisual-utesa`.`view_product_full_data`.`type`;

create definer = admin @`%` view view_reservation_full_data as
select
    `r`.`id` AS `id`,
    `r`.`from_date` AS `fromDate`,
    `r`.`to_date` AS `toDate`,
    `r`.`user_type` AS `userType`,
    `r`.`user_name` AS `userName`,
    `r`.`user_email` AS `userEmail`,
    `r`.`user_phone` AS `userPhone`,
    `r`.`user_code` AS `userCode`,
    `r`.`user_classroom` AS `userClassroom`,
    `r`.`user_course` AS `userCourse`,
    `r`.`user_career` AS `userCareer`,
    `r`.`prof_name` AS `profName`,
    `r`.`prof_code` AS `profCode`,
    `r`.`active` AS `isActive`,
    `r`.`assistant_id` AS `assistantId`,
    `r`.`created_at` AS `CreatedAt`,
    `r`.`updated_at` AS `UpdatedAt`,
    `p`.`id` AS `productId`,
    `p`.`name` AS `productName`,
    `t`.`type` AS `productType`,
    `b`.`brand` AS `productBrand`,
    `p`.`stock` AS `productStock`,
    `p`.`active` AS `productIsActive`
from
    (
        (
            (
                (
                    `audiovisual-utesa`.`reservation` `r`
                    join `audiovisual-utesa`.`prod_vs_res` `pvsr` on ((`pvsr`.`reservation_id` = `r`.`id`))
                )
                join `audiovisual-utesa`.`product` `p` on ((`p`.`id` = `pvsr`.`product_id`))
            )
            join `audiovisual-utesa`.`product_type` `t` on ((`t`.`id` = `p`.`product_type_id`))
        )
        join `audiovisual-utesa`.`product_brand` `b` on ((`b`.`id` = `p`.`product_brand_id`))
    )
order by
    `r`.`created_at` desc;

create definer = admin @`%` view view_reservation_v2 as
select
    `r`.`id` AS `id`,
    `r`.`from_date` AS `fromDate`,
    `r`.`to_date` AS `toDate`,
    `r`.`user_type` AS `userType`,
    `r`.`user_name` AS `userName`,
    `r`.`user_email` AS `userEmail`,
    `r`.`user_phone` AS `userPhone`,
    `r`.`user_code` AS `userCode`,
    `r`.`user_classroom` AS `userClassroom`,
    `r`.`user_course` AS `userCourse`,
    `r`.`user_career` AS `userCareer`,
    `r`.`prof_name` AS `profName`,
    `r`.`prof_code` AS `profCode`,
    `r`.`active` AS `isActive`,
    `r`.`assistant_id` AS `assistantId`,
    `r`.`created_at` AS `CreatedAt`,
    `r`.`updated_at` AS `UpdatedAt`,
    `p`.`name` AS `productName`,
    `t`.`type` AS `productType`,
    `b`.`brand` AS `productBrand`,
    `p`.`stock` AS `productStock`,
    `p`.`active` AS `productIsActive`
from
    (
        (
            (
                (
                    `audiovisual-utesa`.`reservation` `r`
                    join `audiovisual-utesa`.`prod_vs_res` `pvsr` on ((`pvsr`.`reservation_id` = `r`.`id`))
                )
                join `audiovisual-utesa`.`product` `p` on ((`p`.`id` = `pvsr`.`product_id`))
            )
            join `audiovisual-utesa`.`product_type` `t` on ((`t`.`id` = `p`.`product_type_id`))
        )
        join `audiovisual-utesa`.`product_brand` `b` on ((`b`.`id` = `p`.`product_brand_id`))
    )
order by
    `r`.`created_at` desc;

create definer = admin @`%` view view_users_full_data as
select
    `u`.`id` AS `userId`,
    `u`.`username` AS `username`,
    `u`.`role_id` AS `roleId`,
    `r`.`role` AS `role`,
    `u`.`name` AS `name`,
    `u`.`surname` AS `surname`,
    `u`.`birthday` AS `birthday`,
    `u`.`email` AS `email`,
    `u`.`phone` AS `phone`,
    `u`.`schedule_id` AS `scheduleId`,
    `s`.`name` AS `schedule`,
    `u`.`active` AS `isActive`,
    `u`.`created_at` AS `createdAt`
from
    (
        (
            `audiovisual-utesa`.`user` `u`
            join `audiovisual-utesa`.`role` `r` on ((`u`.`role_id` = `r`.`id`))
        )
        left join `audiovisual-utesa`.`schedule` `s` on ((`u`.`schedule_id` = `s`.`id`))
    )
order by
    `u`.`created_at` desc;

create definer = admin @`%` procedure sp_available_product_by_name(IN startDate datetime, IN endDate datetime) BEGIN DECLARE counter INT;

DECLARE product_id INT;

DROP TABLE IF EXISTS product_full_data_123534643787595;

CREATE TEMPORARY TABLE product_full_data_123534643787595 AS
SELECT
    id,
    name,
    type,
    stock AS stockTotal,
    stock AS stockAvailable
FROM
    view_product_full_data
WHERE
    isActive = 1;

SET
    counter = (
        SELECT
            COUNT(*)
        FROM
            view_reservation_full_data
        WHERE
            fromDate < endDate
            AND toDate > startDate
            AND isActive = 1
    ) - 1;

WHILE counter >= 0 DO
SET
    product_id = (
        SELECT
            productId
        FROM
            view_reservation_full_data
        WHERE
            fromDate < endDate
            AND toDate > startDate
            AND isActive = 1
        LIMIT
            1 OFFSET counter
    );

UPDATE
    product_full_data_123534643787595
SET
    stockAvailable = (
        SELECT
            stockAvailable
        FROM
            view_product_full_data
        WHERE
            id = product_id
    ) - 1
WHERE
    id = product_id;

SET
    counter = counter - 1;

END WHILE;

SELECT
    *
FROM
    product_full_data_123534643787595;

DROP TABLE IF EXISTS product_full_data_123534643787595;

END;

create definer = admin @`%` procedure sp_occupied_schedules(IN startDate datetime, IN endDate datetime) BEGIN
SELECT
    *
FROM
    `view_reservation_full_data`
WHERE
    fromDate < endDate
    AND toDate > startDate
    AND isActive = 1
ORDER BY
    createdAt DESC;

END;

create definer = admin @`%` procedure sp_occupied_stock_report(IN startDate datetime, IN endDate datetime) BEGIN DECLARE counter INT;

DECLARE prodType VARCHAR(45);

DECLARE stockInUseValue INT;

DECLARE currentStock INT;

DECLARE stockDifference INT;

DROP TABLE IF EXISTS sp_temp_table123534643787595;

CREATE TEMPORARY TABLE sp_temp_table123534643787595 (
    productType VARCHAR(45),
    stockInUse INT,
    stockAvailable INT,
    stockTotal INT
);

SET
    counter = (
        SELECT
            COUNT(*)
        FROM
            view_product_stock_sum
    ) - 1;

WHILE counter >= 0 DO
SET
    prodType = (
        SELECT
            type
        FROM
            view_product_stock_sum
        ORDER BY
            type ASC
        LIMIT
            1 OFFSET counter
    );

SET
    currentStock = (
        SELECT
            stock
        FROM
            view_product_stock_sum
        ORDER BY
            type ASC
        LIMIT
            1 OFFSET counter
    );

SET
    stockInUseValue = (
        SELECT
            COUNT(*)
        FROM
            view_reservation_v2
        WHERE
            fromDate < endDate
            AND toDate > startDate
            AND productType = prodType
            and isActive = 1
    );

SET
    stockDifference = currentStock - stockInUseValue;

INSERT INTO
    sp_temp_table123534643787595 (
        productType,
        stockInUse,
        stockAvailable,
        stockTotal
    )
VALUES
    (
        prodType,
        stockInUseValue,
        stockDifference,
        currentStock
    );

SET
    counter = counter - 1;

END WHILE;

SELECT
    *
FROM
    sp_temp_table123534643787595;

DROP TABLE IF EXISTS sp_temp_table123534643787595;

END;
