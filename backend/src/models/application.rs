use serde::{Deserialize, Serialize};
use sqlx::{
    postgres::{PgHasArrayType, PgTypeInfo},
    prelude::*,
};

use super::{course::Course, field::Field};

#[derive(Type, Serialize, Deserialize, Debug)]
#[sqlx(type_name = "applicationstatus", rename_all = "lowercase")]
pub enum ApplicationStatus {
    Pending,
    Accepted,
    Declined,
}

impl PgHasArrayType for ApplicationStatus {
    fn array_type_info() -> sqlx::postgres::PgTypeInfo {
        PgTypeInfo::with_name("_applicationstatus")
    }
}

#[derive(FromRow, Serialize, Deserialize, Debug)]
#[allow(dead_code)]
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
    pub status: ApplicationStatus,
    pub messaged: Option<bool>,
    pub talked: Option<bool>,
    pub club_briefed: Option<bool>,
    pub security_briefed: Option<bool>,
    pub information: Option<String>,
    pub created: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
}

#[derive(Serialize)]
pub struct GetApplicationsRes {
    #[serde(flatten)]
    pub application: Application,
    pub course: Course,
    pub fields: Vec<Field>,
}

#[derive(Deserialize)]
pub struct DeleteApplicationReq {
    pub id: i32,
}

#[derive(Serialize)]
pub struct DeleteApplicationRes {
    pub deleted: i32,
}

#[derive(Deserialize)]
pub struct SetApplicationStatusReq {
    pub id: i32,
    pub status: ApplicationStatus,
}

#[derive(Deserialize)]
#[allow(dead_code)]
pub struct AddApplicationReq {
    pub first_name: String,
    pub last_name: String,
    pub email: String,
    pub phone: Option<String>,
    pub course_id: i32,
    pub semester: Option<i32>,
    pub degree: Option<String>,
    pub experience: Option<String>,
    pub fields: Vec<i32>,
}
