use serde::Serialize;

#[derive(sqlx::FromRow, Serialize)]
pub struct Course {
    id: i32,
    name: String
}
