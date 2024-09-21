use diesel::prelude::*;
use serde::{Deserialize, Serialize};

use crate::{models::course::Course, schema::applications};

#[derive(Debug, Serialize, Deserialize, diesel_derive_enum::DbEnum)]
#[serde(rename_all = "camelCase")]
#[ExistingTypePath = "crate::schema::sql_types::Status"]
pub enum ApplicationStatus {
    Pending,
    Accepted,
    Declined,
}

#[derive(Queryable, Selectable, Serialize)]
#[serde(rename_all = "camelCase")]
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
    pub status: ApplicationStatus,
    pub messaged: Option<bool>,
    pub talked: Option<bool>,
    pub club_briefed: Option<bool>,
    pub security_briefed: Option<bool>,
    pub information: Option<String>,
    pub created: chrono::NaiveDateTime,
    pub updated_at: chrono::NaiveDateTime,
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

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DeleteApplication {
    pub delete: usize,
}

#[derive(Deserialize)]
pub struct UpdateApplicationStatus {
    pub id: i32,
    pub status: ApplicationStatus,
}

#[derive(Serialize)]
#[serde(rename_all = "camelCase")]
pub struct ApplicationWithCourse {
    #[serde(flatten)]
    application: Application,
    course: Course,
}

impl From<(Application, Course)> for ApplicationWithCourse {
    fn from(value: (Application, Course)) -> Self {
        Self {
            application: value.0,
            course: value.1,
        }
    }
}
