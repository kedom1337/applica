use diesel::{deserialize::Queryable, Selectable};
use serde::Serialize;

#[derive(Queryable, Selectable, Debug, Serialize)]
#[diesel(table_name = crate::schema::applications)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Application {
    id: i32,
    first_name: String,
    last_name: String,
    email: String,
    phone: Option<String>,
    course_id: i32,
    semester: Option<i32>,
    degree: Option<String>,
    experience: Option<String>,
    status: String,
    messaged: Option<bool>,
    talked: Option<bool>,
    club_briefed: Option<bool>,
    security_briefed: Option<bool>,
    information: Option<String>,
    created: std::time::SystemTime,
    updated_at: std::time::SystemTime,
}
