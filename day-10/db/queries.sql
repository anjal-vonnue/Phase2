-- 1 (all approved bookings)
SELECT
    *
FROM
    bookings
WHERE
    status = 'approved';

-- 2 (equipment and their category)
SELECT
    e.name AS Equipment,
    c.name AS Category
FROM
    equipments AS e
    JOIN categories AS c ON c.id = e.category_id;

-- 3  (employee bookin history)
SELECT
    e.name,
    eq.name,
    b.start_time,
    b.end_time,
    b.status
FROM
    bookings
    JOIN employees AS e ON e.id = b.employee_id
    JOIN equipments AS eq ON eq.id = b.equipment_id
ORDER BY
    b.start_time DESC;

-- 4 (employee with count of booking)
SELECT
    e.name as employee,
    COUNT(b.id) AS booking_count
FROM
    employees as e
    LEFT JOIN bookings as b ON b.employee_id = e.id
GROUP BY
    e.id,
    e.name;

-- 5 (employee with zero booking)
SELECT
    e.id,
    e.name as employee,
    e.email,
FROM
    employees as e
    LEFT JOIN bookings as b ON b.employee_id = e.id
WHERE
    b.id = NULL;

-- 6 (booked equiments count)
SELECT
    eq.name,
    COUNT(b.id) as booking_count
FROM
    bookings as b
    JOIN equipments as eq ON eq.id = b.equipment_id
GROUP BY
    eq.id,
    eq.name;

-- 7 (booking count by status)
SELECT
    status,
    COUNT(*) AS booking_count
FROM
    bookings
GROUP BY
    status;

-- 8 (most booked equipment)
SELECT
    eq.name,
    COUNT(b.id) as booking_count
FROM
    bookings as b
    JOIN equipments as eq ON eq.id = b.equipment_id
GROUP BY
    eq.id,
    eq.name
ORDER BY
    booking_coutn DESC
LIMIT
    1;

-- 9 (pending booking)
SELECT
    *
FROM
    bookings
WHERE
    status = 'pending';

-- 10 (equipement in maintenace)
SELECT
    *
FROM
    maintenace_records
WHERE
    status 'in-progress';