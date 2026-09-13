-- selecting all tickets
SELECT
    *
FROM
    tickets;

-- selecting tickets with low priority
SELECT
    *
FROM
    tickets
WHERE
    priority = 'low';

-- selecting tickets with high priority and status open
SELECT
    *
FROM
    tickets
WHERE
    priority = 'high'
    AND status = 'open';

-- using ORDER BY to select the newly created tickets
SELECT
    *
FROM
    tickets
ORDER BY
    created_at DESC;

-- selecting only the first newly created ticketSELECT
SELECT
    *
FROM
    tickets
ORDER BY
    created_at DESC
LIMIT
    1;

-- updating a ticket
UPDATE tickets
SET
    status = 'in-progress'
WHERE
    title = 'discount button disabled';

-- therfore we need to upadate the status history
INSERT INTO
    status_history (user_id, ticket_id, status)
VALUES
    (
        (
            SELECT
                id
            FROM
                users
            WHERE
                email = 'anjal@vonnue.com'
        ),
        (
            SELECT
                id
            FROM
                tickets
            WHERE
                title = 'discount button disabled'
        ),
        'in-progress'
    );

-- delete from table
DELETE FROM tickets
WHERE
    id = 1;