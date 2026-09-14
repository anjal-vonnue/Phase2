CREATE TABLE
    employees (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        department VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    categories (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    equipments (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        category_id INT NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(255) NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'booked', 'maintenance')),
        CONSTRAINT fk_equipment_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT,
    );

CREATE TABLE
    bookings (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        employee_id INT NOT NULL,
        equipment_id INT NOT NULL,
        start_time NOT NULL TIMESTAMP,
        end_time NOT NULL TIMESTAMP,
        status VARCHAR(100) NOT NULL DEFAULT 'pending' CHECK (
            status IN ('pending', 'rejected', 'approved', 'canceled')
        ),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_booking_employee FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE RESTRICT,
        CONSTRAINT fk_booking_equipment FOREIGN KEY (equipment_id) REFERENCES equipments (id) ON DELETE RESTRICT,
    );

CREATE TABLE
    approvals (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        employee_id INT NOT NULL,
        booking_id INT NOT NULL,
        status VARCHAR(100) NOT NULL CHECK (status IN ('pending', 'rejected', approved)),
        approved_at TIMESTAMP,
        CONSTRAINT fk_apporval_employee FOREIGN KEY (employee_id) REFERENCES employees (id) ON DELETE RESTRICT,
        CONSTRAINT fk_apporval_booking FOREIGN KEY (booking_id) REFERENCES bookings (id) ON DELETE CASCADE
    );

CREATE TABLE
    maintenace_records (
        id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        equipment_id INT NOT NULL,
        details TEXT NOT NULL,
        status VARCHAR(100) NOT NULL CHECK (status IN ('pending', 'in-progress', 'completed')),
        maintenace_date DATE NOT NULL,
        CONSTRAINT fk_maintenace_equipment FOREIGN KEY equipment_id REFERENCES equipments (id) ON DELETE CASCADE
    );