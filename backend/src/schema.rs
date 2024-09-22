use sea_query::Iden;

#[derive(Iden)]
pub enum Applications {
    Table,
    Id,
    FirstName,
    LastName,
    Email,
    Phone,
    CourseId,
    Semester,
    Degree,
    Experience,
    Status,
    UpdatedAt,
}

#[derive(Iden)]
pub enum Courses {
    Table,
    Id,
}

#[derive(Iden)]
pub enum Fields {
    Table,
    Id,
}

#[derive(Iden)]
pub enum ApplicationsFields {
    Table,
    ApplicationId,
    FieldId,
}
