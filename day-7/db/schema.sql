CREATE TABLE
    users (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    customers (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    categories (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    tickets (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        customer_id INT NOT NULL,
        category_id INT NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        status VARCHAR(50) NOT NULL DEFAULT 'open' CHECK (
            status IN ('open', 'in-progress', 'resolved', 'closed')
        ),
        priority VARCHAR(50) NOT NULL CHECK (priority IN ('low', 'medium', 'high')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP,
        CONSTRAINT fk_ticket_customer FOREIGN KEY (customer_id) REFERENCES customers (id) ON DELETE RESTRICT,
        CONSTRAINT fk_ticket_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT
    );

CREATE TABLE
    comments (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_id INT NOT NULL,
        ticket_id INT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_comment_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
        CONSTRAINT fk_comment_ticket FOREIGN KEY (ticket_id) REFERENCES tickets (id) ON DELETE CASCADE
    );

CREATE TABLE
    assignments (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_id INT NOT NULL,
        ticket_id INT NOT NULL,
        assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_assignment_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
        CONSTRAINT fk_assignment_ticket FOREIGN KEY (ticket_id) REFERENCES tickets (id) ON DELETE CASCADE
    );

CREATE TABLE
    status_history (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        user_id INT NOT NULL,
        ticket_id INT NOT NULL,
        status VARCHAR(50) NOT NULL CHECK (
            status IN ('open', 'in-progress', 'resolved', 'closed')
        ),
        changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_status_history_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE RESTRICT,
        CONSTRAINT fk_status_history_ticket FOREIGN KEY (ticket_id) REFERENCES tickets (id) ON DELETE CASCADE
    );