CREATE TABLE applications_fields (
    application_id INT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
    field_id INT NOT NULL REFERENCES fields(id) ON DELETE CASCADE,
    PRIMARY KEY (application_id, field_id)
);
