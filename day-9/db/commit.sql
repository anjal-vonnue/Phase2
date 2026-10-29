-- COMMIT SUCCESS
BEGIN;

DELETE FROM assignments
WHERE
    ticket_id = 1;

INSERT INTO
    assignments (user_id, ticket_id)
VALUES
    (2, 1);

INSERT INTO
    status_history (user_id, ticket_id, status)
VALUES
    (
        2,
        1,
        (
            SELECT
                status
            FROM
                tickets
            WHERE
                id = 1
        )
    );

INSERT INTO
    comments (user_id, ticket_id, content)
VALUES
    (2, 1, "ticket assigned to new user");

COMMIT;

-- ROLLBACK
BEGIN;

DELETE FROM assignments
WHERE
    ticket_id = 1;

INSERT INTO
    assignments (user_id, ticket_id)
VALUES
    (2, 1);

-- user with id 20000 doesn't exist
INSERT INTO
    status_history (user_id, ticket_id, status)
VALUES
    (
        20000,
        1,
        (
            SELECT
                status
            FROM
                tickets
            WHERE
                id = 1
        )
    );

INSERT INTO
    comments (user_id, ticket_id, content)
VALUES
    (2, 1, "ticket assigned to new user");

ROLLBACK;