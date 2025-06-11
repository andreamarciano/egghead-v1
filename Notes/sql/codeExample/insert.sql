-- # OFFICE
INSERT INTO
    office (office_name)
VALUES
    ("Administration"),
    ("Customer Service"),
    ("Human Resources"),
    ("Sales");

-- # EMPLOYEE
INSERT INTO
    employee (
        first_name,
        last_name,
        hiring_date,
        salary,
        phone,
        office_id
    )
VALUES
    (
        "Luke",
        "Red",
        "2018-02-22",
        "1500",
        "2499856100",
        1
    ),
    (
        "Mark",
        "Grenn",
        "2018-05-30",
        "1300",
        "0085834210",
        2
    ),
    (
        "Anne",
        "Black",
        "2019-07-13",
        "1700",
        "2944101834",
        2
    ),
    (
        "Jack",
        "Purple",
        "2019-08-01",
        "1400",
        "9854339500",
        4
    ),
    (
        "Marie",
        "Orange",
        "2020-11-23",
        "1350",
        "5892033098",
        4
    ),
    (
        "Leonard",
        "Yellow",
        "2020-12-11",
        "1250",
        "0092884712",
        NULL
    );

-- # CUSTOMER
INSERT INTO
    customer (company_name, vat_number, address, city, phone)
VALUES
    (
        "Sweet Candies",
        "1234",
        "First Road",
        "First City",
        "3334445556"
    ),
    (
        "Salty Candies",
        "2345",
        "Second Road",
        "Second City",
        "3332225556"
    ),
    (
        "Small Candies",
        "3456",
        "Third Road",
        "Third City",
        "3338885556"
    ),
    (
        "Brown Chocolate",
        "4567",
        "Fourth Road",
        "Fourth City",
        "2228885556"
    ),
    (
        "Licorice Factory",
        "5678",
        "Fifth Road",
        "Fifth City",
        "3312225116"
    );

-- # TIME TEST
INSERT INTO
    time_test (name, birth_date, created_at)
VALUES
    ("Luke", "1995-06-06", NOW ());

UPDATE time_test
SET
    name = "Mario"
WHERE
    id = 1;