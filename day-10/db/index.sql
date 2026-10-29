-- SELECT
--     *
-- FROM
--     booking
-- WHERE
--     employee_id = 1;
-- this is indexed because it is frequently used
CREATE INDEX idx_bookings_employee_id ON bookings (employee_id);

-- SELECT
--     *
-- FROM
--     booking
-- WHERE
--     equipment_id = 1;
-- this is another frequently used query to find the number of bookings of an equipment
CREATE INDEX idx_bookings_equipment_id ON bookings (equipment_id);