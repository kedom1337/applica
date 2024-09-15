use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::schema::applications;

#[derive(Debug, Serialize, Deserialize, diesel_derive_enum::DbEnum)]
#[ExistingTypePath = "crate::schema::sql_types::Status"]
#[serde(rename_all = "lowercase")]
pub enum Status {
    Pending,
    Accepted,
    Declined,
}

#[derive(Queryable, Selectable, Serialize)]
#[diesel(table_name = applications)]
#[diesel(check_for_backend(diesel::pg::Pg))]
pub struct Application {
    pub id: i32,
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone: Option<String>,
    pub course_id: i32,
    pub semester: Option<i32>,
    pub degree: Option<String>,
    pub experience: Option<String>,
    pub status: Status,
    pub messaged: Option<bool>,
    pub talked: Option<bool>,
    pub club_briefed: Option<bool>,
    pub security_briefed: Option<bool>,
    pub information: Option<String>,
    pub created: std::time::SystemTime,
    pub updated_at: std::time::SystemTime,
}

#[derive(Deserialize, Insertable)]
#[diesel(table_name = applications)]
pub struct NewApplication {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone: Option<String>,
    pub course_id: i32,
    pub semester: Option<i32>,
    pub degree: Option<String>,
    pub experience: Option<String>,
    pub information: Option<String>,
    #[diesel(skip_insertion)]
    pub fields: Vec<i32>,
}

#[derive(Deserialize)]
pub struct UpdateStatus {
    pub id: i32,
    pub status: Status,
}
