-- ticket count by status and assignee
SELECT
    t.status,
    u.name AS assignee,
    COUNT(t.id) AS ticket_count
FROM
    tickets AS T
    JOIN assignments AS a ON a.ticket_id = t.id
    JOIN users AS u ON u.id = a.user_id
GROUP BY
    t.status,
    u.name;

-- customers with more than five open tickets
SELECT
    c.id AS customer_id,
    c.name AS customer_name,
    c.email,
    COUNT(t.id) AS open_ticket_count
FROM
    customers AS c
    JOIN tickets AS t ON t.customer_id = c.id
WHERE
    t.status = 'open'
GROUP BY
    c.id,
    c.name,
    c.email
HAVING
    COUNT(t.id) > 5;

-- users with no assigned tickets
SELECT
    u.id,
    u.name,
    u.email
FROM
    users AS u
    LEFT JOIN assignments as a ON a.user_id = u.id
WHERE
    a.user_id IS NULL;

-- oldest unresolved ticket
SELECT
    t.id AS ticket_id,
    t.title,
    t.description,
    t.status,
    t.priority,
    t.created_at
FROM
    tickets as t
WHERE
    t.status IN ('open', 'in-progress')
ORDER BY
    t.created_at ASC
LIMIT
    1;

-- tickets count by category and priority
SELECT
    c.id AS category_id,
    c.name AS category,
    t.priority,
    COUNT(t.id) AS ticket_count
FROM
    tickets AS t
    JOIN categories AS c ON c.id = t.category_id
GROUP BY
    c.id,
    c.name,
    t.priority;