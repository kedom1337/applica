use serde::Serialize;
use sqlx::prelude::*;

#[derive(FromRow, Serialize, Debug)]
pub struct Field {
    id: i32,
    name: String
}
