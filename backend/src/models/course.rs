use diesel::prelude::*;
use serde::Serialize;

use crate::schema::courses;

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = courses)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Course {
    id: i32,
    name: String,
}
