BEGIN;

UPDATE bookings
SET
    status = 'approved'
WHERE
    id = 1;

UPDATE equiments
SET
    status = 'booked'
WHERE
    id = (
        SELECT
            equipment_id
        FROM
            bookings
        WHERE
            id = 1
    );

INSERT INTO
    approvals (employee_id, booking_id, status, approved_at)
VALUES
    (
        (
            SELECT
                employee_id
            FROM
                bookings
            WHERE
                id = 1
        ),
        1,
        "approved",
        "2026-09-12 09:00:00"
    );

COMMIT;