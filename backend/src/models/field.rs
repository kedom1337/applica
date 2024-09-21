use diesel::prelude::*;
use serde::Serialize;

use crate::schema::fields;

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = fields)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Field {
    id: i32,
    name: String,
}
