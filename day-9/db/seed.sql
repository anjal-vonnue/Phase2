-- USER INSERTION
INSERT INTO
    users (name, email)
VALUES
    ('Anjal', 'anjal@vonnue.com'),
    ('Yasin', 'yasin@vonnue.com'),
    ('Christo', 'christo@vonnue.com');

-- CUSTOMERS INSERTION
INSERT INTO
    customers (name, email)
VALUES
    ('Gauresh', 'gauresh@vonnue.com'),
    ('Akshay', 'askshay@vonnue.com'),
    ('Hawas', 'hawas@vonnue.com');

-- CATEGORIES INSERTION
INSERT INTO
    categories (name)
VALUES
    ('Support'),
    ('Technical'),
    ('Documentation');

-- TICKET  INSERTION
INSERT INTO
    tickets (
        customer_id,
        category_id,
        title,
        description,
        priority
    )
VALUES
    (
        (
            SELECT
                id
            FROM
                customers
            WHERE
                email = 'gauresh@vonnue.com'
        ),
        (
            SELECT
                id
            FROM
                categories
            WHERE
                name = 'Support'
        ),
        'customer care is unavalilable',
        'called several times but they do not pick up the call',
        'high'
    ),
    (
        (
            SELECT
                id
            FROM
                customers
            WHERE
                email = 'askshay@vonnue.com'
        ),
        (
            SELECT
                id
            FROM
                categories
            WHERE
                name = 'Technical'
        ),
        'discount button disabled',
        'cannot apply coupon code for discount button',
        'high'
    ),
    (
        (
            SELECT
                id
            FROM
                customers
            WHERE
                email = 'hawas@vonnue.com'
        ),
        (
            SELECT
                id
            FROM
                categories
            WHERE
                name = 'Documentation'
        ),
        'missing content',
        'readme does not contain how to contribute section',
        'low'
    );

-- ASSIGNMENT INSERSION
INSERT INTO
    assignments (user_id, ticket_id)
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
        )
    ),
    (
        (
            SELECT
                id
            FROM
                users
            WHERE
                email = 'christo@vonnue.com'
        ),
        (
            SELECT
                id
            FROM
                tickets
            WHERE
                title = 'missing content'
        )
    );

-- COMMENTS
INSERT INTO
    comments (user_id, ticket_id, content)
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
        'i am working on it'
    );

--- checking contrains, can't add because urgent is not in priority list
INSERT INTO
    tickets (
        customer_id,
        category_id,
        title,
        description,
        priority
    )
VALUES
    (
        (
            SELECT
                id
            FROM
                customers
            WHERE
                email = 'gauresh@vonnue.com'
        ),
        (
            SELECT
                id
            FROM
                categories
            WHERE
                name = 'Support'
        ),
        'recharge plan is not reflecting',
        'paid 399 on sundirect but the channels are not available',
        'urgent'
    );