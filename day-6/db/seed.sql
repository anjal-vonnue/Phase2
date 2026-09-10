INSERT INTO
    users (name, email)
VALUES
    ('Anjal', 'anjal@vonnue.com'),
    ('Yasin', 'yasin@vonnue.com'),
    ('Christo', 'christo@vonnue.com');

INSERT INTO
    customers (name, email)
VALUES
    ('Gauresh', 'gauresh@vonnue.com'),
    ('Akshay', 'askshay@vonnue.com'),
    ('Hawas', 'hawas@vonnue.com');

INSERT INTO
    categories (name)
VALUES
    ('Support'),
    ('Technical'),
    ('Documentation');

INSERT INTO
    tickets (
        customer_id,
        category_id,
        title,
        description,
        status,
        priority
    )
VALUES
    ()