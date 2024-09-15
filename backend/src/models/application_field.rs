use diesel::prelude::*;

use crate::schema::applications_fields;

#[derive(Queryable, Selectable, Insertable)]
#[diesel(table_name = applications_fields)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct ApplicationField {
    pub application_id: i32,
    pub field_id: i32,
}
