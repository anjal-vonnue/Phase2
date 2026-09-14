INSERT INTO
    employees (name, email, department)
VALUES
    ('anjal', 'anjal@vonnue.com', 'cse'),
    ('yasin', 'yasin@vonnue.com', 'ece'),
    ('christo', 'christo@vonnue.com', 'mech');

INSERT INTO
    categories (name)
VALUES
    ('laptop'),
    ('camera'),
    ('phones');

INSERT INTO
    equipments (category_id, name, status)
VALUES
    (1, 'macbook', 'available'),
    (2, 'canon', 'maintenance'),
    (3, 'iphone', 'booked'),
    (1, 'dell', 'available');

INSERT INTO
    bookings (
        employee_id,
        equipment_id,
        start_time,
        end_time,
        status
    )
VALUES
    (
        1,
        1,
        '2026-09-15 09:00:00',
        '2026-09-15 17:00:00',
        'approved'
    ),
    (
        2,
        2,
        '2026-09-16 10:00:00',
        '2026-09-16 15:00:00',
        'pending'
    ),
    (
        3,
        3,
        '2026-09-18 09:00:00',
        '2026-09-18 17:00:00',
        'rejected'
    );

INSERT INTO
    approvals (employee_id, booking_id, status, approved_at)
VALUES
    (1, 1, 'approved', '2026-09-14 10:00:00'),
    (2, 2, 'pending', NULL),
    (3, 3, 'rejected', '2026-09-14 11:30:00');

INSERT INTO
    maintenace_records (equipment_id, details, status, maintenace_date)
VALUES
    (1, 'basic checkup', 'in-progress', '2026-09-12');